<template>
  <div class="inline-flex items-center gap-8 text-title-3 md:!text-16">
    <q-icon
      class="text-primary-pure p-4"
      :class="iconClass"
      :name="icon"
      icon-class="true"
      :size="iconSize"
    >
    </q-icon>
    <div>
      <p class="font-semibold text-xl font-sans">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: "" },
  text: { type: String, default: "" },
  iconClass: { type: String, default: "" },
  iconSize: { type: String, default: "24px" },
});
</script>
