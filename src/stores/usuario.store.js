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

  async function createUser(userPayload) {
    isLoading.value = true;
    try {
      const { data } = await api.post(URLS.users, userPayload);

      let last_name = "";

      data.name.split(" ").forEach((v, index) => {
        if (index === 0) {
          data.first_name = v;
        } else {
          last_name += last_name ? ` ${v}` : v;
        }
      });

      data.last_name = last_name;

      setNewUser(data);
      return data;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function updateUser(userPayload) {
    isLoading.value = true;
    try {
      const { data } = await api.patch(URLS.user + userPayload.id, userPayload);

      let last_name = "";

      data.name.split(" ").forEach((v, index) => {
        if (index === 0) {
          data.first_name = v;
        } else {
          last_name += last_name ? ` ${v}` : v;
        }
      });

      data.last_name = last_name;

      updateActualUser(data);
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

  const setNewUser = (value) => {
    users.value.unshift(value);
  };

  const updateActualUser = (value) => {
    users.value.forEach((v, index) => {
      if (v.id === value.id) {
        users.value[index] = value;
      }
    });
  };

  function clearUsuarios() {
    users.value = [];
  }

  // make sure to pass the right store definition, `useAuth` in this case.

  return {
    users,
    clearUsuarios,
    getUsers,
    createUser,
    updateUser,
    isLoading,
  };
});
