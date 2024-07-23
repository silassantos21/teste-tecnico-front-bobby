<template>
  <div class="q-pa-md">
    <q-card class="p-10 border-gray-80 bg-gray-70 rounded" flat bordered>
      <div class="flex items-center justify-between">
        <TextIcon
          iconSize="40px"
          iconClass="fa-solid fa-users"
          text="Usuários"
        />
        <q-btn
          outline
          rounded
          color="bobby"
          icon="add_circle"
          label="Novo cadastro"
          @click="dialogUser = true"
        />
        <!-- @click="router.push({ name: 'home' })" -->
      </div>
      <q-table
        flat
        bordered
        grid
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
      >
        <template v-slot:top-left>
          <q-input
            dense
            debounce="300"
            v-model="filter"
            placeholder="Pesquisar por usuário"
            class="min-w-[350px]"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <CardUsuario :propsRow="props" />
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
  <q-dialog v-model="dialogUser">
    <q-card class="q-px-md q-py-sm min-w-[50vw] min-h-[40vh]">
      <q-form @submit.prevent="onCreateUser">
        <q-card-section>
          <div class="text-h6">Adicionar Usuário</div>
        </q-card-section>
        <q-card-section class="flex flex-col items-center q-gutter-y-md">
          <q-input
            outlined
            v-model="formUser.name"
            class="w-full"
            label="Nome"
            :rules="[(val) => !!val || 'Campo Obrigatorio']"
          />
          <q-input
            outlined
            v-model="formUser.email"
            class="w-full"
            label="E-mail"
            :rules="[(val) => !!val || 'Campo Obrigatorio']"
          />
          <q-input
            outlined
            v-model="formUser.job"
            class="w-full"
            label="Emprego"
            hint="Campo vazio será considerado como sem emprego"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn outline label="Cancelar" color="bobby" v-close-popup />
          <q-btn label="Adicionar" color="bobby" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRouter } from "vue-router";
import TextIcon from "../components/TextIcon.vue";
import CardUsuario from "../components/CardUsuario.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/usuario.store";

const { users } = storeToRefs(useUserStore());

const { getUsers } = useUserStore();

const router = useRouter();

const filter = ref("");

const dialogUser = ref(false);

const formUser = ref({
  name: null,
  email: null,
  job: null,
});

const columns = ref([
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "E-mail",
    field: "email",
    sortable: true,
  },
  { name: "job", label: "Cargo", field: "job", sortable: true },
]);

const rows = ref([]);

const onCreateUser = () => {
  console.log("oie");
  dialogUser.value = false;
};

const setRows = () => {
  console.log(users.value);
  rows.value = users.value;
};

onMounted(async () => {
  await getUsers();
  setRows();
});
</script>
