const fs = require('fs');
require('dotenv').config();

const zeplinConfig = {
  projects: [process.env.ZEPLIN_PROJECT_ID],
  styleguides: [process.env.ZEPLIN_STYLEGUIDE_ID],
  plugins: ["zeplin-cli-connect-storybook-plugin"]
};

fs.writeFileSync('zeplin.json', JSON.stringify(zeplinConfig, null, 2));
