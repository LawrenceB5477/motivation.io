import Vue from "vue";
import Vuex from "vuex";
import motivationApi from "@/api/motivationApi";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { email: "" },
    loggedIn: false,
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async createAccount({ commit }, createAccountRequest) {
      const res = await motivationApi.createAccount(createAccountRequest);
      console.log(res.data);
      commit("setLoggedIn", true);
      commit("setUser", res.data.user);
    },
    async login({ commit }, loginRequest) {
      const res = await motivationApi.login(loginRequest);
      console.log(res.data);
      commit("setLoggedIn", true);
      commit("setUser", res.data.user);
    },
    async logout({ commit }) {
      await motivationApi.logout();
      commit("setLoggedIn", false);
      commit("setUser", { email: "" });
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
