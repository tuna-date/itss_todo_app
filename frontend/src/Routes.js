import Login from './components/Login/index';
import Register from './components/Register';
import Home from './components/Home';
import NotFound from './components/NotFound';

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    exact: true,
  },
  {
    name: 'Not Found',
    path: '*',
    component: NotFound,
    exact: true
  }
];

export default routes;
