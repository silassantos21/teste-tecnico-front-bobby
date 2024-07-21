const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        alias: "/",
        name: "home",
        path: "/home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "grafico_usuarios",
        path: "/grafico-usuarios",
        component: () => import("pages/EstatisticasUsuarios.vue"),
      },
      {
        name: "tabela_usuarios",
        path: "/tabela-usuarios",
        component: () => import("pages/TabelaUsuarios.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/login",
    name: "login",
    component: () => import("pages/PageLogin.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
