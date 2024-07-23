<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-lime-9">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Olá, bananinha! </q-toolbar-title>

        <div>
          <q-btn-dropdown split class="bg-bobby" push no-caps icon="person">
            <div class="row justify-center no-wrap q-pa-md">
              <div class="items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
                <q-btn
                  class="text-bobby"
                  outline
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="300"
      :breakpoint="500"
      bordered
    >
      <q-list>
        <q-item-label header> Menu Bobby </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const prefUrl = ref(window.location.origin);

const miniState = ref(true);

const linksList = [
  {
    title: "Home",
    caption: "Home",
    icon: "home",
    link: "/home",
  },
  {
    title: "Usuários",
    caption: "Usuários",
    icon: "fa-solid fa-users",
    link: "/tabela-usuarios",
  },
  {
    title: "Estatísticas",
    caption: "Estatísticas",
    icon: "fa-solid fa-chart-pie",
    link: "/grafico-usuarios",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.text-bobby {
  color: #bccb0f;
}
.bg-bobby {
  background-color: #bccb0f;
}

.q-item.q-router-link--active,
.q-item--active {
  color: #bccb0f !important;
}
</style>
