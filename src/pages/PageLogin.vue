<template>
  <q-layout class="grid place-items-center">
    <div
      class="grid grid-cols-2 content-center h-screen w-screen"
      style="background-color: #bccb0f"
    >
      <div class="col-span-1 relative self-center mx-auto">
        <q-img class="w-24 h-24" :src="imageBobby" />
      </div>

      <div class="col-span-1 mx-auto min-w-[30vw]">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card
            class="my-card flex flex-col rounded-lg shadow-md max-w-[30vw]"
          >
            <q-card-section>
              <div class="text-h6 text-bobby">Login</div>
              <div class="text-subtitle2 font-bold text-bobby">
                Informe seus dados cadastrais
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                ref="login"
                label-color="bobby"
                v-model="data.login"
                :rules="[(val) => !!val || 'Campo Obrigatorio']"
                size="md"
                label="Login"
              />
              <InputPassword
                :model-value="data.senha"
                @update:model-value="(v) => (data.senha = v)"
              />
              <q-btn
                :loading="load"
                size="md"
                type="submit"
                outline
                class="text-bobby w-full mt-40 md:mt-32"
                >Entrar na conta
              </q-btn>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";

import { api } from "../boot/axios";
import { NotifyError } from "../boot/Notify";
import { useAuthStore } from "../stores/auth.store";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/usuario.store";
import axios from "axios";
import FormLogin from "../components/FormLogin.vue";
import InputPassword from "../components/InputPassword.vue";
import imageBobby from "../../public/image/bobby.png";

const { URLS } = api.defaults;

const { getUser } = useUserStore();

const form = ref(null);
const router = useRouter();
const formType = ref("login");
const load = ref(false);
const emailRecipient = ref("");

const data = ref({
  login: "",
  senha: "",
});

onMounted(() => {
  // form.value.form.focus();
});

function handleUpdateData(v) {
  data.value = v.value;
}

async function onSubmit() {
  load.value = true;
  const authStore = useAuthStore();

  const logged = await authStore.login(data.value.login, data.value.senha);

  // if (logged) {
  //   await getUser()
  //   router.push(router.query?.redirect || '/')
  // }

  // // else form.value.isInvalid()
  load.value = false;
}

watch(formType, async () => {
  await nextTick();
  emailRecipient.value = "";
  animationForm();
});
</script>

<style>
.text-bobby {
  color: #bccb0f;
}
</style>
