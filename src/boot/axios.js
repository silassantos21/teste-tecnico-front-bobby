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
    users: `${API_URL}users/?per_page=100`,
    user: `${API_URL}users/`,
    unknown: `${API_URL}unknown/`,
    register: `${API_URL}register`,
    login: `${API_URL}login`,
  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$API_URL = API_URL;
});

export { api, API_URL, _url_method };
