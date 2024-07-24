import { api } from "boot/axios";
import { computed, nextTick, ref } from "vue";
import { Cookies, LoadingBar } from "quasar";
import { defineStore } from "pinia";
import { NotifyError } from "boot/Notify";
import { useUserStore } from "../stores/usuario.store";
import { Router } from "../router/index";

export const useAuthStore = defineStore("authStore", () => {
  const loggedUser = ref(null);

  const { clearUsuarios } = useUserStore();

  function saveToken(token) {
    Cookies.set("BOBBY_TOKEN", token);
  }

  async function login(email, password) {
    try {
      const { URLS } = api.defaults;
      const payloadLogin = {
        email,
        password,
      };
      const { data } = await api.post(URLS.login, payloadLogin);
      saveToken(data.token);
      loggedUser.value = payloadLogin;
      loggedUser.value.name = loggedUser.value.email.substr(
        0,
        loggedUser.value.email.indexOf("@")
      );
      Router.push({ name: "home" });
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
    loggedUser.value = null;
    Cookies.remove("BOBBY_TOKEN");
    clearUsuarios();
    await nextTick();
    Router.push({ name: "login" });
  }

  return {
    loggedUser,
    login,
    logout,
  };
});
