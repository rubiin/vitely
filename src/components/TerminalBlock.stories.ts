import type { Meta, StoryObj } from '@storybook/vue3';
import TerminalBlock from './TerminalBlock.vue';

const meta = {
  title: 'Landing/TerminalBlock',
  component: TerminalBlock,
  argTypes: {
    commands: { control: 'object' },
    readyText: { control: 'text' },
  },
} satisfies Meta<typeof TerminalBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    commands: [
      'git clone github.com/rubiin/vitely',
      'cd vitely',
      'pnpm install',
      'pnpm dev',
    ],
    readyText: 'ready in 342ms',
  },
};
