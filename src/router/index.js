import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { nextTick } from "vue";
import { route } from "quasar/wrappers";
import { useAuthStore } from "../stores/auth.store";
import routes from "./routes";

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === "history"
  ? createWebHistory
  : createWebHashHistory;

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

export default route(function (/* { store, ssrContext } */) {
  Router.beforeEach(async (to, from) => {
    const authStore = useAuthStore();

    const haveUser = () => authStore.loggedUser?.email;

    // // // Login redirect
    const isLogin = to.name === "login";
    const goToLogin = { name: "login", query: { redirect: to.fullPath } };

    if (isLogin && haveUser()) {
      return { name: "home" };
    }
    // // se tem usuario
    else if (haveUser()) {
      return true;
    }
    // // se nao tem usuario e nao ta no login
    else if (!haveUser() && !isLogin) {
      return goToLogin;
    }
    // // no fim das contas volta pro login
    // else return goToLogin;
    return true;
  });

  return Router;
});
export { Router };
