import type { Meta, StoryObj } from '@storybook/vue3';
import BoatMark from './BoatMark.vue';

const meta = {
  title: 'Landing/BoatMark',
  component: BoatMark,
} satisfies Meta<typeof BoatMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { BoatMark },
    template: '<div style="width: 32px; color: var(--ink)"><BoatMark /></div>',
  }),
};
