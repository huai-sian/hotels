import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/room/:id',
    name: 'Room',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Room.vue'),
  },
  {
    path: '/reservation/:id',
    name: 'Reservation',
    component: () => import('../views/Reservation.vue'),
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/Analysis.vue'),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
