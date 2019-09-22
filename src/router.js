import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/Login.vue';
import Forgot from './components/Forgot.vue';
import Register from './components/Register.vue';
import Confirm from './components/Confirm.vue';
import Dashboard from './components/Dashboard.vue';
import ChangePassword from './components/ChangePassword.vue';

Vue.use(Router);

function requireAuth(to, from, next) {
  const jwt = sessionStorage.getItem('sessionJwt');
  if (!jwt) {
    next({
      path: '/',
    });
  } else {
    next();
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: requireAuth,
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot,
    },
    {
      path: '/confirm/:type/:email',
      name: 'confirm',
      component: Confirm,
    },
    {
      path: '/changePassword/:email',
      name: 'changePassword',
      component: ChangePassword,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
