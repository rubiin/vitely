import MyPage from './Page.vue';
import * as HeaderStories from './Header.stories';

export default {
  title: 'Example/Page',
  component: MyPage,
};

export const LoggedIn = {
  render: args => ({
    components: { MyPage },
    setup() {
      return { user: args.user };
    },
    template: '<my-page :user="user" />',
  }),
  args: {
    // More on composing args: https://storybook.js.org/docs/vue/writing-stories/args#args-composition
    ...HeaderStories.LoggedIn.args,
  },
};

export const LoggedOut = {
  render: args => ({
    components: { MyPage },
    setup() {
      return { user: args.user };
    },
    template: '<my-page :user="user" />',
  }),
  args: {
    ...HeaderStories.LoggedOut.args,
  },
};
