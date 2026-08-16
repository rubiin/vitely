import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import HeroBoat from './HeroBoat.vue';

const meta = {
  title: 'Landing/HeroBoat',
  component: HeroBoat,
} satisfies Meta<typeof HeroBoat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { HeroBoat },
    setup() {
      const message = ref('');
      const onFullSpeed = () => {
        message.value = 'Full speed ahead!';
      };
      return { message, onFullSpeed };
    },
    template:
      '<div><HeroBoat @fullspeed="onFullSpeed" /><p v-if="message" style="margin: 0; font-family: monospace; letter-spacing: .1em; text-transform: uppercase">{{ message }}</p></div>',
  }),
};
