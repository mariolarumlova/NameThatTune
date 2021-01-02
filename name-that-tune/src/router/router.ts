import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/LoginPage";
import ChooseGameMode from "@/views/HomePage";
import PageNotFound from "@/views/PageNotFound";
import Tournament from "@/views/TournamentPage";
import Training from "@/views/TrainingPage";
import Settings from "@/views/SettingsPage";

Vue.use(Router);

const baseRoutes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Log in",
    component: Login
  },
  {
    path: "/choosemode",
    name: "Choose game mode",
    component: ChooseGameMode
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
  const loggedIn = localStorage.getItem("session");

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router;
