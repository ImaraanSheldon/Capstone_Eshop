import { createStore } from "vuex";
import axios from "axios";
// import Swal from "sweetalert2/dist/sweetalert2";

const portURL = "http://localhost:4324/";

export default createStore({
  state: {
    users: null,
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
  },
  actions: {
    // Home or Landing Page
    async fetchUsers(context) {
      let { results } = await (await axios.get(`${portURL}users`)).data;
      context.commit("setUsers", results);
    },
  },
  modules: {},
});
