<template>
  <q-form
    ref="form"
    class="mx-auto my-auto form-login relative sm:w-full sm:h-full dark:!bg-d-neutral-10 dark:md:border dark:md:border-primary-pure dark:md:rounded-lg dark:sm:border-none sm:overflow-hidden"
  >
    <q-card class="flex flex-col rounded-lg shadow-md">
      <h3 class="text-title-2 !text-32 md:!text-24 text-primary-pure">
        Fazer login
      </h3>

      <p
        class="mt-8 text-paragraph-1 text-neutral-70 mb-48 md:mb-32 md:!text-14 dark:text-white/60"
      >
        Seja bem-vindo(a)!<br />
        Insira seu e-mail e senha para entrar em sua conta.
      </p>

      <q-input
        ref="login"
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
        primary
        class="w-full mt-40 md:mt-32"
        >Entrar na conta
      </q-btn>
    </q-card>
  </q-form>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import InputPassword from "./InputPassword.vue";
const dev = process.env.development;

const props = defineProps({
  load: Boolean,
});
const emit = defineEmits(["update:data", "update:form-type"]);

const permanecerConectado = ref(true);
const type = ref("password");

const data = ref({
  login: dev ? "cleo@gmail.com" : "",
  senha: dev ? "123" : "",
});

watch(
  () => data,
  (v) => emit("update:data", v),
  { deep: true, immediate: true }
);

const form = ref(Element);
defineExpose({ form });
</script>
