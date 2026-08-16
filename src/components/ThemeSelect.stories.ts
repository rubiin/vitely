import type { Meta, StoryObj } from '@storybook/vue3';
import ThemeSelect from './ThemeSelect.vue';

const meta = {
  title: 'Landing/ThemeSelect',
  component: ThemeSelect,
} satisfies Meta<typeof ThemeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
