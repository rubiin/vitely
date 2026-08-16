import type { Meta, StoryObj } from '@storybook/vue3';
import SailDivider from './SailDivider.vue';

const meta = {
  title: 'Landing/SailDivider',
  component: SailDivider,
} satisfies Meta<typeof SailDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
