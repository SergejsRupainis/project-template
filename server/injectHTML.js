export default (
  data,
  { html, title, meta, body, styleTags, prefetchScriptTags, scriptTags, state }
) => {
  data = data.replace('<html>', `<html ${html}>`);
  data = data.replace(/<title>.*?<\/title>/g, title);
  data = data.replace(
    '</head>',
    `${meta}${styleTags}${prefetchScriptTags}</head>`
  );
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
  );
  data = data.replace('</body>', scriptTags + '</body>');

  return data;
};
