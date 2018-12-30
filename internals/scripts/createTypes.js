const fs = require('fs');
const Handlebars = require('handlebars');

const source = `
export const ACTION_PREPEND = '{{typeName}}';

export const FETCH_INVALIDATE = \` \${ACTION_PREPEND}/fetch-invalidate\`;
export const FETCH_REQUESTED = \`\${ACTION_PREPEND}/fetch-requested\`;
export const FETCH_RESPONSE = \`\${ACTION_PREPEND}/fetch-response\`;
`;
const template = Handlebars.compile(source);

const contents = template({ typeName: 'locale' });

fs.writeFile('contents.js', contents, err => {
  if (err) {
    return console.error(`Autsch! Failed to store template: ${err.message}.`);
  }

  console.log('Saved template!');
});
