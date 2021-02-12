import Vue from "nativescript-vue";
import Home from "./components/Home";
import store from "./store";

Vue.registerElement(
  "CardView",
  () => require("@nstudio/nativescript-cardview").CardView
);

Vue.config.silent = false;

new Vue({
  store,
  render: (h) => h("frame", [h(Home)]),
}).$start();
