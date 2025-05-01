import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import StudentLogin from "@/views/StudentLogin.vue";
import TeacherLogin from "@/views/TeacherLogin.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
  {
    path: "/student-login",
    name: "StudentLogin",
    component: StudentLogin,
  },
  {
    path: "/teacher-login",
    name: "TeacherLogin",
    component: TeacherLogin,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;