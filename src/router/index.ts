import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Signup from '@/pages/Signup.vue';
import Signin from '@/pages/Signin.vue';
import Wrapper from '@/pages/Wrapper.vue';
import Dashboard from '@/pages/Dashboard.vue';
import Users from '@/pages/users/Users.vue';
import UserCreate from '@/pages/users/UserCreate.vue';
import UserEdit from '@/pages/users/UserEdit.vue';
import Roles from '@/pages/roles/Roles.vue';
import RoleCreate from '@/pages/roles/RoleCreate.vue';
import RoleEdit from '@/pages/roles/RoleEdit.vue';
import Products from '@/pages/products/Products.vue';
import ProductCreate from '@/pages/products/ProductCreate.vue';
import ProductEdit from '@/pages/products/ProductEdit.vue';
import Orders from '@/pages/orders/Orders.vue';
import Profile from '@/pages/Profile.vue';
import NotFound from '@/pages/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/signin', name: 'signin', component: Signin },
  {
    path: '',
    component: Wrapper,
    children: [
      { path: '', name: 'dashboard', component: Dashboard },
      { path: '/users', name: 'users', component: Users },
      { path: '/users/create', name: 'usercreate', component: UserCreate },
      { path: '/users/:id/edit', name: 'useredit', component: UserEdit },
      { path: '/roles', name: 'roles', component: Roles },
      { path: '/roles/create', name: 'rolecreate', component: RoleCreate },
      { path: '/roles/:id/edit', name: 'roleedit', component: RoleEdit },
      { path: '/products', name: 'products', component: Products },
      { path: '/products/create', name: 'productcreate', component: ProductCreate },
      { path: '/products/:id/edit', name: 'productedit', component: ProductEdit },
      { path: '/orders', name: 'orders', component: Orders },
      { path: '/profile', name: 'profile', component: Profile },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
