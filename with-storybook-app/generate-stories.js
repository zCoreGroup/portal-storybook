const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

// Define your Zeplin API details
const ZEPLIN_API_URL = process.env.ZEPLIN_API_URL;
const ZEPLIN_API_TOKEN = `Bearer ${process.env.ZEPLIN_API_TOKEN}`;

console.log("ZEPLIN_API_URL:", ZEPLIN_API_URL);
console.log("ZEPLIN_API_TOKEN:", ZEPLIN_API_TOKEN);

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
        console.log("Raw response data:", data);
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          reject(new Error('Failed to parse JSON response from Zeplin API.'));
        }
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
  const outputDir = path.join(__dirname, 'stories');
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
    if (!Array.isArray(components)) {
      throw new Error('Invalid response format from Zeplin API.');
    }
    components.forEach(component => {
      generateStory(component.name);
    });
  } catch (error) {
    console.error('Error fetching components:', error);
  }
};

main();
