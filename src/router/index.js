import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import UsersView from '../views/users/view.vue';
import CreateUserView from '../views/users/create.vue';
import EditUserView from '../views/users/edit.vue';
import UserDetailsView from '../views/users/details.vue';
import login from '../views/auth/login.vue'; // Agrega la importación para la vista de login

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
      path: '/login', // Ruta para la vista de login
      name: 'login',
      component: login
    }
  ]
});

// Middleware para verificar si el usuario está autenticado
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkIfUserIsAuthenticated(); // Replace this with your authentication logic
  console.log(isAuthenticated);
  if (to.name !== 'login' && !isAuthenticated) {
    // Redirigir a la vista de login si no está autenticado y la ruta no es la de login
    next({ name: 'login' });
  } else {
    next(); // Continuar con la navegación normal
  }
});

// Function to check if the user is authenticated
function checkIfUserIsAuthenticated() {
  // Add your authentication logic here, for example, check if the user has a valid access token
  // You can use Vuex, localStorage, or any other method to store and check the authentication status
  const accessToken = localStorage.getItem('access_token');
  return !!accessToken; // Returns true if there is an access token, indicating the user is authenticated
}

export default router;
