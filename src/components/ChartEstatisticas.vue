<template>
  <div id="chart-estatisticas" class="min-w-full"></div>
</template>

<script setup>
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
} from "vue";

import ApexCharts from "apexcharts";

const props = defineProps({
  datasFiltro: {
    type: Array,
    default: () => [],
  },
  dadosFiltro: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["click"]);

const options = ref({
  series: props.dadosFiltro,
  chart: {
    width: 500,
    type: "pie",
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],

  colors: ["#fc963d", "#e75959"],
  labels: props.datasFiltro,
});

const chart = ref({
  resumo: {},
});

function handleRenderChart() {
  chart.value.resumo = new ApexCharts(
    document.querySelector("#chart-estatisticas"),
    options.value
  );

  chart.value.resumo.render();
}

watch(
  () => props.datasFiltro,
  (val) => {
    if (!val) return;

    let showLabel = true;
    if (val.length > 12) {
      showLabel = false;
    }

    chart.value.resumo.updateSeries(props.dadosFiltro);
    chart.value.resumo.updateOptions({
      dataLabels: {
        enabled: showLabel,
      },
      xaxis: {
        type: "datetime",
        // tickAmount: max,
        // min: new Date(props.datasFiltro[0]).getTime(),
        // max: new Date(props.datasFiltro[max]).getTime(),
        categories: props.datasFiltro,
      },
    });
  }
);

onMounted(async () => {
  handleRenderChart();
});

onUnmounted(() => {
  chart.value.resumo?.destroy();
});
</script>

<style lang="sass" scoped>
.apexcharts-tooltip.apexcharts-theme-light
  border: none !important
</style>
