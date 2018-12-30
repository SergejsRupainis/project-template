import path from 'path';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Frontload, frontloadServerRender } from 'react-frontload';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import { translationMessages } from 'utils/i18n';

import App from '../src/App.jsx';
import LanguageProvider from '../src/containers/LanguageProvider';
import { homepage } from '../package.json';
import injectHTML from './injectHTML';

const statsFile = path.resolve('./build/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

export default function generateHtmlPage(res, url, htmlData, store) {
  // If the user has a cookie (i.e. they're signed in) - set them as the current user
  // Otherwise, we want to set the current state to be logged out, just in case this isn't the default
  // if ('mywebsite' in req.cookies) {
  //   store.dispatch(setCurrentUser(req.cookies.mywebsite));
  // } else {
  //   store.dispatch(logoutUser());
  // }

  const context = {};

  // collect all styled-components styles
  const sheet = new ServerStyleSheet();

  /*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          4. Inside of the store provider
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all of this sexiness
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests
        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
    */

  const Application = extractor.collectChunks(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        <StaticRouter
          location={url}
          context={context}
          basename={homepage.slice(0, -1)}
        >
          <Frontload isServer>
            <LanguageProvider messages={translationMessages}>
              <App />
            </LanguageProvider>
          </Frontload>
        </StaticRouter>
      </Provider>
    </StyleSheetManager>
  );

  frontloadServerRender(() => renderToString(Application)).then(routeMarkup => {
    if (context.url) {
      // If context has a url property, then we need to handle a redirection in Redux Router
      res.writeHead(302, {
        Location: context.url,
      });

      res.end();
      return;
    } else {
      // We need to tell Helmet to compute the right meta tags, title, and such
      const helmet = Helmet.renderStatic();

      // Pass all this nonsense into our HTML formatting function above
      const html = injectHTML(htmlData, {
        html: helmet.htmlAttributes.toString(),
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        body: routeMarkup,
        styleTags: ``,
        prefetchScriptTags: '',
        scriptTags: '',
        state: JSON.stringify(store.getState()).replace(/</g, '\\u003c'),
      });

      /* old version - not sure, need to try preloading and check how it would work */
      // const scriptTags = extractor.getScriptTags();
      // const prefetchScriptTags = extractor.getLinkTags();
      // const styleTags = extractor.getStyleTags();
      // const styledStyleTags = sheet.getStyleTags();

      // const html = injectHTML(htmlData, {
      //   html: helmet.htmlAttributes.toString(),
      //   title: helmet.title.toString(),
      //   meta: helmet.meta.toString(),
      //   body: routeMarkup,
      //   styleTags: `${styleTags}${styledStyleTags}`,
      //   prefetchScriptTags,
      //   scriptTags,
      //   state: JSON.stringify(store.getState()).replace(/</g, '\\u003c'),
      // });

      // We have all the final HTML, let's send it to the user already!
      res.send(html);
    }
  });
}
