import { boot } from "quasar/wrappers";
import { Notify } from "quasar";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

Notify.registerType("error", {
  icon: "warning",
  progress: true,
  classes: "orange",
  timeout: 2500,
  position: "top",
});

Notify.registerType("sucess", {
  icon: "check_circle",
  progress: true,
  color: "green",
  timeout: 2500,
  position: "top",
});

Notify.registerType("alert", {
  icon: "warning",
  progress: true,
  classes: "red",
  timeout: 2500,
  position: "top",
});

const NotifyError = (text, opts) =>
  Notify.create({ type: "error", message: text, ...opts });

const NotifySucess = (text, opts) =>
  Notify.create({ type: "sucess", message: text, ...opts });

const NotifyAlert = (text, opts) =>
  Notify.create({ type: "alert", message: text, ...opts });

export default boot(({ app }) => {
  app.config.globalProperties.$NotifyError = NotifyError;
  app.config.globalProperties.$NotifySucess = NotifySucess;
  app.config.globalProperties.$NotifyAlert = NotifyAlert;
});

export { NotifyError, NotifySucess, NotifyAlert };
