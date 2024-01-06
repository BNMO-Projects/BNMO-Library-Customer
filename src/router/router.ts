import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Public views
const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");

// Authenticated views
const Search = () => import("@/views/Search.vue");
const BookDetail = () => import("@/views/BookDetail.vue");
const MyLibrary = () => import("@/views/MyLibrary.vue");
const Cart = () => import("@/views/Cart.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Login - BNMO Library" }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register - BNMO Library" }
  },
  {
    path: "/home",
    name: "Home",
    component: Search,
    meta: { title: "Home - BNMO Library" }
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { title: "Search - BNMO Library" }
  },
  {
    path: "/my-library/:tab",
    name: "My Library",
    component: MyLibrary,
    meta: { title: "My Library - BNMO Library" }
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { title: "Cart - BNMO Library" }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Search,
    meta: { title: "Settings - BNMO Library" }
  },
  {
    path: "/book-detail/:id",
    name: "Book Detail",
    component: BookDetail,
    meta: { title: "Book Detail - BNMO Library" }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});
