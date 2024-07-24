<template>
  <q-card bordered flat class="q-pa-md text-center">
    <q-card-section>
      <q-avatar size="72px">
        <img :src="propsRow.row.avatar || bobbyzinho" />
      </q-avatar>
      <p class="mt-4 text-lg">
        {{ `${propsRow.row.first_name} ${propsRow.row.last_name}` }}
      </p>
    </q-card-section>
    <q-separator />
    <q-list dense>
      <q-item
        v-for="col in propsRow.cols.filter((col) => col.name !== 'desc')"
        :key="col.name"
      >
        <q-item-section v-if="col.name === 'name'">
          <p class="mt-4 text-lg">Informações</p>
        </q-item-section>
        <q-item-section v-else>
          <p class="mt-4 text-md">{{ col.value }}</p>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import bobbyzinho from "/image/bobbyzinho.jpeg";
const props = defineProps({
  propsRow: {
    type: Object,
    default: () => null,
  },
});
</script>

<style></style>
