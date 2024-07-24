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
          @click="abrirModalUsuario('Adicionar')"
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
        rows-per-page-label="Dados por página"
        :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
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
            <CardUsuario
              :propsRow="props"
              class="cursor-pointer"
              @click="abrirModalUsuario('Editar', props.row)"
            />
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
  <q-dialog v-model="dialogUser">
    <q-card class="q-px-md q-py-sm min-w-[50vw] min-h-[40vh]">
      <q-form @submit.prevent="onActionUser">
        <q-card-section>
          <div class="text-h6">{{ labelModalAction }} Usuário</div>
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
          <q-btn
            outline
            label="Cancelar"
            color="bobby"
            @click="clearCreateUserForm"
            v-close-popup
          />
          <q-btn
            :loading="isLoadingButton"
            :label="labelModalAction"
            color="bobby"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import TextIcon from "../components/TextIcon.vue";
import CardUsuario from "../components/CardUsuario.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/usuario.store";
import { NotifyError, NotifySucess } from "boot/Notify";

const { users } = storeToRefs(useUserStore());

const { getUsers, createUser, updateUser } = useUserStore();

const router = useRouter();

const filter = ref("");

const dialogUser = ref(false);

const labelModalAction = ref("Adicionar");

const isLoadingButton = ref(false);

const $q = useQuasar();

const formUser = ref({
  id: null,
  name: null,
  email: null,
  first_name: null,
  last_name: null,
  job: null,
  avatar: null,
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

const onActionUser = async () => {
  isLoadingButton.value = true;
  formUser.value.job = !formUser.value.job ? "Sem emprego" : formUser.value.job;
  labelModalAction.value === "Adicionar"
    ? await createUser(formUser.value)
    : await updateUser(formUser.value);
  NotifySucess(
    `Usuário ${
      labelModalAction.value === "Adicionar" ? "adicionado" : "alterado"
    } com sucesso!`
  );
  setRows();
  dialogUser.value = false;
};

const clearCreateUserForm = async () => {
  formUser.value = {
    name: null,
    email: null,
    first_name: null,
    last_name: null,
    job: null,
    avatar: null,
  };
};

const setRows = () => {
  rows.value = users.value;
};

const abrirModalUsuario = (tipoModal, dadosUsuario = null) => {
  labelModalAction.value = tipoModal;
  if (tipoModal === "Editar") {
    formUser.value = {
      id: dadosUsuario.id,
      name: `${dadosUsuario.first_name} ${dadosUsuario.last_name}`,
      email: dadosUsuario.email,
      first_name: dadosUsuario.first_name,
      last_name: dadosUsuario.last_name,
      job: dadosUsuario.job,
      avatar: dadosUsuario.avatar,
    };
  }
  dialogUser.value = true;
};

onMounted(async () => {
  $q.loading.show({ message: "Carregando os dados de usuários. Aguarde..." });
  if (users.value.length === 0) await getUsers();
  setRows();
  setTimeout(() => {
    $q.loading.hide();
  }, 3000);
});
</script>
