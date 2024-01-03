import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Public views
const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");

// Authenticated views
const Search = () => import("@/views/Search.vue");
const BookDetail = () => import("@/views/BookDetail.vue");
const Cart = () => import("@/views/Cart.vue");

const routes: RouteRecordRaw[] = [
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/home", name: "Home", component: Search },
  { path: "/search", name: "Search", component: Search },
  { path: "/my-library", name: "My Library", component: Search },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/settings", name: "Settings", component: Search },
  { path: "/book-detail/:id", name: "Book Detail", component: BookDetail }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});
