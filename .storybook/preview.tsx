import type { Preview } from '@storybook/react-vite'
import '../src/tokens.css'
import '../src/components.css'
import './tailwind-utilities.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
