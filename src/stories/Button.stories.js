import MyButton from './Button.vue';

export default {
  title: 'Example/Button',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export const Primary = {
  render: args => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: '<my-button v-bind="args" />',
  }),
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  render: args => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: '<my-button v-bind="args" />',
  }),
  args: {
    label: 'Button',
  },
};

export const Large = {
  render: args => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: '<my-button v-bind="args" />',
  }),
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  render: args => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: '<my-button v-bind="args" />',
  }),
  args: {
    size: 'small',
    label: 'Button',
  },
};
