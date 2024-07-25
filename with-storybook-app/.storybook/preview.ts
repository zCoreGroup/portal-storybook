import type { Preview } from "@storybook/react";
import { withZeplin } from '@zeplin/storybook-addon';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withZeplin],
};

export default preview;
