<template>
  <div class="container mx-auto pt-4">
    <q-card class="border-neutral-80 rounded" flat bordered>
      <div class="flex items-center justify-between">
        <TextIcon
          iconSize="40px"
          iconClass="fa-solid fa-chart-pie"
          text="Estatísticas de Usuários"
        />
      </div>
      <div
        class="m-10"
        v-if="dadosFiltro.length > 0"
        style="text-align: -webkit-center"
      >
        <ChartEstatisticas
          :dadosFiltro="dadosFiltro"
          :datasFiltro="datasFiltro"
        />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/usuario.store";
import ChartEstatisticas from "../components/ChartEstatisticas.vue";
import TextIcon from "../components/TextIcon.vue";

const { users } = storeToRefs(useUserStore());
const { getUsers } = useUserStore();

const dadosFiltro = ref([]);
const datasFiltro = ref([]);

function setGraficoDados() {
  console.log(users.value);
  const result = [
    users.value.filter((v) => v.job.toLowerCase() !== "sem emprego").length,
    users.value.filter((v) => v.job.toLowerCase() === "sem emprego").length,
  ];

  datasFiltro.value = ["Empregado", "Desempregado"];
  dadosFiltro.value = result;
}

const requests = async () => {
  setGraficoDados();
};

onMounted(async () => {
  await getUsers();
  await requests();
});
</script>

<style lang="sass" scoped>

:deep(.q-tab)
  border: 1px solid rgba(var(--neutral-100), 0.10)
  border-radius: .1875rem
  transition: .3s ease
  & .q-tab__content
    flex-wrap: nowrap !important
    padding: .75rem
  & .q-tab__label
    color: rgba(var(--neutral-70), 1)

  &.q-tab--active, &:hover
    background-color: rgba(var(--primary-pure), 0.10)
    border-color: rgba(var(--primary-pure), 1)

    & .q-tab__label
      color: rgba(var(--primary-pure), 1)
    & .q-tab__indicator
      background: transparent !important
</style>
