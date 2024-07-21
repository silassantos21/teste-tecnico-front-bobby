<template>
  <q-page class="flex flex-center">
    <img
      class="rounded-lg"
      alt="Quasar logo"
      :src="imageBobby"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script setup>
import imageBobby from "../../public/image/bobby.png";
defineOptions({
  name: "IndexPage",
});
</script>
