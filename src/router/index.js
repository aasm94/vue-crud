import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import UsersView from '../views/users/view.vue';
import CreateUserView from '../views/users/create.vue';
import EditUserView from '../views/users/edit.vue';
import UserDetailsView from '../views/users/details.vue';
import login from '../views/auth/login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/users/view',
      name: 'users',
      component: UsersView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateUserView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditUserView
    },
    {
      path: '/details/:id',
      name: 'details',
      component: UserDetailsView
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkIfUserIsAuthenticated(); 
  console.log(isAuthenticated);
  if ((to.name === 'login' || to.name === 'create') || isAuthenticated) {
    // Allow access to 'login' and 'register' routes or if the user is authenticated
    next();
  } else {
    // Redirect to the login page if not authenticated and trying to access other routes
    next({ name: 'login' });
  }
});

// Function to check if the user is authenticated
function checkIfUserIsAuthenticated() {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken; // Returns true if there is an access token, indicating the user is authenticated
}

export default router;
