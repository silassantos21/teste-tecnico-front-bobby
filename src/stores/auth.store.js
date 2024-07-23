import { api } from "boot/axios";
import { computed, nextTick, ref } from "vue";
import { Cookies, LoadingBar } from "quasar";
import { defineStore } from "pinia";
import { NotifyError } from "boot/Notify";
import { Router } from "../router/index";

export const useAuthStore = defineStore("authStore", () => {
  const loggedUser = ref(null);

  function saveToken(token) {
    Cookies.set("BOBBY_TOKEN", token, tokenOpt);
  }

  async function login(email, password) {
    try {
      const { URLS } = api.defaults;
      const payloadLogin = {
        email,
        password,
      };
      const request = await api.post(URLS.login, payloadLogin);
      saveToken();
      loggedUser.value = payloadLogin;
      Router.replace(Router.currentRoute.value.query?.redirect || "/");
      return true;
    } catch (e) {
      console.log(e);
      NotifyError(`Usuario ou senha invalidos`);
      return false;
    }
  }

  /**
   * Faz logout e redireciona para o tela de login,
   * com um parametro logout na url
   * remove  token, refresh e usuario
   */
  async function logout() {
    LoadingBar.stop();
    user.value = {};
    Cookies.remove("NDT_REFRESH_TOKEN");
    Cookies.remove("NDT_TOKEN");
    await nextTick();
    Router.replace({ name: "login", query: { logout: true } });
  }

  return {
    loggedUser,
    login,
    logout,
  };
});
