import { acceptHMRUpdate, defineStore } from "pinia";
import { api } from "../boot/axios";
import { ref } from "vue";

export const useUserStore = defineStore("usuarioStore", () => {
  const { URLS } = api.defaults;

  const isLoading = ref(false);

  const users = ref([]);

  async function getUsers() {
    isLoading.value = true;
    try {
      const { data } = await api.get(URLS.users);

      setUsers(data);
      return data;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      isLoading.value = false;
    }
  }

  const setUsers = (value) => {
    users.value = value.data.map((v) => {
      if (!v.job) {
        v.job = "Sem emprego";
      }
      return { ...v };
    });
  };

  function $reset() {
    users.value = {};
  }

  // make sure to pass the right store definition, `useAuth` in this case.

  return {
    users,
    $reset,
    getUsers,
    isLoading,
  };
});
