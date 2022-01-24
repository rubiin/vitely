import { createRouter, createWebHistory } from 'vue-router';

function lazyLoad(view: string) {
  return () => import(`@/views/pages/${view}.vue`);
}

const routes = [
  {
    path: '/',
    component: () => lazyLoad('Index'),
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
