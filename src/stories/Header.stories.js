import MyHeader from './Header.vue';

export default {
  title: 'Example/Header',
  component: MyHeader,
};

export const LoggedIn = {
  render: args => ({
    components: { MyHeader },
    setup() {
      // Story args can be spread into the returned object
      return { ...args };
    },
    template: '<my-header :user="user" />',
  }),
  args: {
    user: {},
  },
};

export const LoggedOut = {
  render: args => ({
    components: { MyHeader },
    setup() {
      return { ...args };
    },
    template: '<my-header :user="user" />',
  }),
  args: {
    user: null,
  },
};
