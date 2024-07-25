const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

// Define your Zeplin API details
const ZEPLIN_API_URL = process.env.ZEPLIN_API_URL;
const ZEPLIN_API_TOKEN = `Bearer ${process.env.ZEPLIN_API_TOKEN}`;

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

// Define your template for the component
const componentTemplate = (componentName) => `
import React from "react";
import "./${componentName.toLowerCase()}.css";

interface ${componentName}Props {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const ${componentName} = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ${componentName}Props) => {
  const mode = primary
    ? "storybook-${componentName.toLowerCase()}--primary"
    : "storybook-${componentName.toLowerCase()}--secondary";
  return (
    <button
      type="button"
      className={["storybook-${componentName.toLowerCase()}", \`storybook-${componentName.toLowerCase()}--\${size}\`, mode].join(" ")}
      {...props}
    >
      {label}
      <style jsx>{\`
        button {
          background-color: \${backgroundColor};
        }
      \`}</style>
    </button>
  );
};
`;

// Define your template for the CSS
const cssTemplate = (componentName) => `
.storybook-${componentName.toLowerCase()} {
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.storybook-${componentName.toLowerCase()}--primary {
  color: white;
  background-color: #1ea7fd;
}
.storybook-${componentName.toLowerCase()}--secondary {
  color: #333;
  background-color: #e2e2e2;
}
.storybook-${componentName.toLowerCase()}--small {
  font-size: 12px;
  padding: 10px 16px;
}
.storybook-${componentName.toLowerCase()}--medium {
  font-size: 14px;
  padding: 11px 20px;
}
.storybook-${componentName.toLowerCase()}--large {
  font-size: 16px;
  padding: 12px 24px;
}
`;

// Function to generate the component and CSS files
const generateComponentFiles = (componentName) => {
  const sanitizedComponentName = sanitizeComponentName(componentName);
  const componentContent = componentTemplate(sanitizedComponentName);
  const cssContent = cssTemplate(sanitizedComponentName);

  const outputDir = path.join(__dirname, 'stories');
  const componentFile = path.join(outputDir, `${sanitizedComponentName}.tsx`);
  const cssFile = path.join(outputDir, `${sanitizedComponentName.toLowerCase()}.css`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(componentFile, componentContent, 'utf8');
  fs.writeFileSync(cssFile, cssContent, 'utf8');

  console.log(`Generated ${sanitizedComponentName} component and CSS files in ${outputDir}`);
};

// Main function to execute the script
const main = async () => {
  try {
    const components = await fetchComponents();
    if (!Array.isArray(components)) {
      throw new Error('Invalid response format from Zeplin API.');
    }
    components.forEach(component => {
      generateComponentFiles(component.name);
    });
  } catch (error) {
    console.error('Error fetching components:', error);
  }
};

main();
