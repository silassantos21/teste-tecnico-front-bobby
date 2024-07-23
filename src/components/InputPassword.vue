<template>
  <q-input
    :model-value="modelValue"
    :rules="[(val) => !!val || 'Campo Obrigatorio']"
    label="Senha"
    label-color="bobby"
    :type="type"
    class="mt-24 md:mt-16"
    @update:model-value="(v) => $emit('update:model-value', v)"
  >
    <template #append>
      <q-btn
        flat
        class="!w-32 !h-32 !p-0 !min-h-0 md:!w-[1.375rem] md:!h-[1.375rem]"
        tertiary
        :icon="type === 'password' ? 'visibility' : 'visibility_off'"
        color="bobby"
        @click="type === 'password' ? (type = 'text') : (type = 'password')"
      >
      </q-btn>
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:model-value"]);
const type = ref("password");
</script>

<style lang="scss" scoped></style>
