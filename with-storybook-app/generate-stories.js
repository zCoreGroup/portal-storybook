 const fs = require('fs');
const path = require('path');
const https = require('https');

// Define your Zeplin API details
const ZEPLIN_API_URL = 'https://api.zeplin.dev/v1/projects/669aa99836c7f2ad93ce967a/components?sort=section&include_latest_version=false&include_linked_styleguides=false&limit=30&offset=0';
const ZEPLIN_API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicGVyc29uYWxfYWNjZXNzX3Rva2VuIiwiY2xpZW50X2lkIjoiNjZhMDRjYzJhNDE3MjhkNDA4ODMzNmY5Iiwic2NvcGUiOiJhZG1pbiIsImlhdCI6MTcyMTc4MTQ0MiwiZXhwIjoyMDM3MzUwNzAyLCJpc3MiOiJ6ZXBsaW46YXBpLnplcGxpbi5pbyIsInN1YiI6IjY2MTZjZGI1NTViMTNmOGRmMjRhODNhNSIsImp0aSI6IjI4NTRkNTVjLTFlN2EtNGI5NC1iOTY3LTllMTY1MmEyMWJiNyJ9.UinGWjRed_6Nyc2aThNmPjCpjV0V6a8HN_BZ52BMyQo';

// Function to fetch components from Zeplin
const fetchComponents = () => {
  return new Promise((resolve, reject) => {
    https.get(ZEPLIN_API_URL, {
      headers: {
        'accept': 'application/json',
        'authorization': ZEPLIN_API_TOKEN
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
};

// Sanitize the component name to create valid file names and variable names
const sanitizeComponentName = (componentName) => {
  return componentName
    .trim()
    .replace(/\s+/g, '_')           // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9_]/g, '')  // Remove all non-alphanumeric characters except underscores
    .replace(/^[^a-zA-Z_]+/, '');   // Ensure it starts with a letter or underscore
};

// Define your template for the story
const storyTemplate = (componentName) => `
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  component: ${componentName},
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

const ${componentName}WithHooks = () => {
  const [value, setValue] = useState('Secondary');
  const [isPrimary, setIsPrimary] = useState(false);

  const handleOnChange = () => {
    if (!isPrimary) {
      setIsPrimary(true);
      setValue('Primary');
    }
  };

  return <${componentName} primary={isPrimary} onClick={handleOnChange} label={value} />;
};

export const Primary: Story = {
  render: () => <${componentName}WithHooks />,
};
`;

// Function to generate the story file
const generateStory = (componentName) => {
  const sanitizedComponentName = sanitizeComponentName(componentName);
  const storyContent = storyTemplate(sanitizedComponentName);
  const outputDir = path.join(__dirname, 'src', 'stories');
  const outputFile = path.join(outputDir, `${sanitizedComponentName}.stories.ts`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, storyContent, 'utf8');
  console.log(`Generated ${sanitizedComponentName}.stories.ts in ${outputDir}`);
};

// Main function to execute the script
const main = async () => {
  try {
    const components = await fetchComponents();
    components.forEach(component => {
      generateStory(component.name);
    });
  } catch (error) {
    console.error('Error fetching components:', error);
  }
};

main();
