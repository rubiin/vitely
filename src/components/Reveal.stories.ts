import type { Meta, StoryObj } from '@storybook/vue3';
import Reveal from './Reveal.vue';

const meta = {
  title: 'Landing/Reveal',
  component: Reveal,
  argTypes: {
    delay: {
      control: { type: 'number', min: 0, step: 50 },
    },
  },
} satisfies Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { delay: 0 },
  render: args => ({
    components: { Reveal },
    setup() {
      return { args };
    },
    template:
      '<div style="padding: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px"><Reveal :delay="args.delay"><p style="margin: 0">This content fades in when scrolled into view.</p></Reveal></div>',
  }),
};
