const fs = require('fs');
require('dotenv').config();

console.log('ZEPLIN_PROJECT_ID:', process.env.ZEPLIN_PROJECT_ID);
console.log('ZEPLIN_STYLEGUIDE_ID:', process.env.ZEPLIN_STYLEGUIDE_ID);

const zeplinConfig = {
  projects: [process.env.ZEPLIN_PROJECT_ID],
  styleguides: [process.env.ZEPLIN_STYLEGUIDE_ID],
  plugins: ["zeplin-cli-connect-storybook-plugin"]
};

fs.writeFileSync('zeplin.json', JSON.stringify(zeplinConfig, null, 2));
console.log('zeplin.json has been created successfully.');
