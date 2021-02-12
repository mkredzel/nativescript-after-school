import Vue from "nativescript-vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    items: []
  },
  mutations: {
    FETCH_ITEMS(state, items) {
      state.items = items;
    },
  },
  actions: {
    fetchItems({ commit }) {
      fetch(
        "https://after-school-server.herokuapp.com/collection/lessons"
      ).then((response) => {
        response
          .json()
          .then(function(json) {
            commit("FETCH_ITEMS", json);
          })
          .catch((error) => {
            alert("Error! " + error.message);
          });
      });
    },
  },
  modules: {},
  getters: {
    items: (state) => state.items
  }
});
