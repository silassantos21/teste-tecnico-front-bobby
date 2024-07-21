import { boot } from "quasar/wrappers";
import { ref } from "vue";
import axios from "axios";

const API_URL = "https://reqres.in/api/";

/**
 * axios methods mostrados no console
 */
const _url_method = ref(null);

const api = axios.create({
  baseURL: API_URL,

  /**
   * URLS da API
   * const  { URLS } = api.defaults
   */
  URLS: {
    users: "users/",
    unknown: "unknown/",
    register: "register",
    login: "login",
  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$API_URL = API_URL;
});

export { api, API_URL, _url_method };
