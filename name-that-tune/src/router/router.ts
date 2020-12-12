import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import ChooseGameMode from "@/views/ChooseGameMode";
import ChoosePlaylist from "@/views/ChoosePlaylist";
import PageNotFound from "@/components/PageNotFound";
import Tournament from "@/components/Tournament";
import Training from "@/components/Training";
import Settings from "@/components/Settings";

Vue.use(Router);

const baseRoutes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/choosemode",
    name: "ChooseGameMode",
    component: ChooseGameMode
  },
  {
    path: "/chooseplaylist",
    name: "ChoosePlaylist",
    component: ChoosePlaylist
  },
  {
    path: "/tournament",
    name: "Tournament",
    component: Tournament
  },
  {
    path: "/training",
    name: "Training",
    component: Training
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound
  }
];

const router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  base: process.env.BASE_URL,
  routes: baseRoutes
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router;
