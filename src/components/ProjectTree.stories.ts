import type { Meta, StoryObj } from '@storybook/vue3';
import ProjectTree from './ProjectTree.vue';

const meta = {
  title: 'Landing/ProjectTree',
  component: ProjectTree,
  argTypes: {
    lines: { control: 'object' },
  },
} satisfies Meta<typeof ProjectTree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lines: [
      'src/',
      '├── components/',
      '├── composables/',
      '├── layouts/',
      '├── pages/',
      '├── router/',
      '├── stores/',
      '└── main.ts',
    ],
  },
};
