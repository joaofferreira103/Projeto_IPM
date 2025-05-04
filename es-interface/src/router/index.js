import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import StudentLoginPage from "@/views/StudentLoginPage.vue";
import DocenteLogin from "@/views/DocenteLogin.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import SchedulePage from "@/views/SchedulePage.vue";
import DcLogadoPage from "@/views/DcLogadoPage.vue"; 
import AlunoLogadoPage from "@/views/AlunoLogadoPage.vue";
import OptionsPage from "@/views/OptionsPage.vue";
import RequestsPage from "@/views/RequestsPage.vue";
import CourseDetailsPage from "@/views/CourseDetailsPage.vue";
import ScheduleHomePage from "@/views/ScheduleHomePage.vue";
import ScheduleStudentPage from "@/views/ScheduleStudentPage.vue";


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
    name: "StudentLoginPage",
    component: StudentLoginPage,
  },
  {
    path: "/teacher-login",
    name: "DocenteLogin",
    component: DocenteLogin,
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
  {
    path: "/perfil",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/opcoes",
    name: "OptionsPage",
    component: OptionsPage,
  },
  {
    path: "/horarios",
    name: "SchedulePage",
    component: SchedulePage,
  },
  {
    path: "/pedidos",
    name: "RequestsPage",
    component: RequestsPage,
  },
  {
    path: "/dc-logado",
    name: "DcLogadoPage",
    component: DcLogadoPage,
  },
  { 
    path: "/aluno-logado",
    name: "AlunoLogadoPage",
    component: AlunoLogadoPage,
  },
  { 
    path: "/detalhesUC/:id",
    name: "CoursesDetailsPage",
    component: CourseDetailsPage,
  },
  { 
    path: "/opcoeshorario",
    name: "ScheduleHomePage",
    component: ScheduleHomePage,
  },
  { 
    path: "/horarioaluno",
    name: "ScheduleStudentPage",
    component: ScheduleStudentPage,
  },
  
  {
    path: "/novo-pedido-troca",
    name: "ShiftRequestPage",
    component: () => import("@/views/ShiftRequestPage.vue"),
    meta: { requiresAuth: true, role: "student" },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;