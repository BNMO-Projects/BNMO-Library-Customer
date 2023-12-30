import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Public views
const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");

const routes: RouteRecordRaw[] = [
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});
