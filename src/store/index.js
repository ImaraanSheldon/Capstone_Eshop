import { createStore } from "vuex";
import axios from "axios";
// import Swal from "sweetalert2/dist/sweetalert2";

const portURL = "http://localhost:4324/";

export default createStore({
  state: {
    users: null,
    games:null,
    published:null,
    developed:null,
    recent:null,
    discounts:null,
    charts:null,
  filteredGames: []
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setPublished(state, value){
      state.published = value;
    },
    setDeveloped(state, value){
      state.developed = value
    },
    setRecent(state, value){
      state.recent = value
    },
    setDiscount(state, value){
      state.discounts = value
    },
    setCharts(state, value){
      state.charts = value
    },

    // search
    setGames(state, games) {
      state.games = games;
      state.filteredGames = games;
    },
    setFilteredGames(state, games) {
      state.filteredGames = games;
    }
  },
  actions: {
    // All Users
    async fetchUsers(context) {
      let { results } = await (await axios.get(`${portURL}users`)).data;
      context.commit("setUsers", results);
    },
    // ALL Games
    // async fetchGames(context) {
    //   let { results } = await (await axios.get(`${portURL}games`)).data;
    //   context.commit("setGames", results);
    // },
    // 4 recent Games published by Nintendo
    async fetchPublished(context) {
      let { results } = await (await axios.get(`${portURL}games/Nintendo_Published`)).data;
      context.commit("setPublished", results);
    },
    // ALL Games developed by Nintendo
    async fetchDeveloped(context) {
      let { results } = await (await axios.get(`${portURL}games/Nintendo_Developed`)).data;
      context.commit("setDeveloped", results);
    },
    // ALL Games developed by Nintendo
    async fetchRecent(context) {
      let { results } = await (await axios.get(`${portURL}games/recent`)).data;
      context.commit("setRecent", results);
    },
    // ALL Discounts
    async fetchDiscount(context) {
      let { results } = await (await axios.get(`${portURL}games/Discounts`)).data;
      context.commit("setDiscount", results);
    },
    async fetchCharts(context) {
      let { results } = await (await axios.get(`${portURL}games/Charts`)).data;
      context.commit("setCharts", results);
    },

    // search
    async fetchGames({ commit }) {
      try {
        const response = await axios.get(`${portURL}games`);
        const { results } = response.data;
        commit("setGames", results);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
  
    async searchGames({ commit }, { searchTerm, genre, minPrice, maxPrice }) {
      try {
        const response = await axios.get(`${portURL}games/search`, {
          params: {
            searchTerm,
            genre,
            minPrice,
            maxPrice,
          },
        });
        const { results } = response.data;
        commit("setFilteredGames", results);
      } catch (error) {
        console.error("Error searching games:", error);
      }
    },
  
    sortGames({ commit, state }, { sortBy }) {
      let sortedGames = [...state.filteredGames]; // Use filteredGames to sort
  
      if (sortBy === 'priceAsc') {
        sortedGames.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceDesc') {
        sortedGames.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'releaseDateAsc') {
        sortedGames.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      } else if (sortBy === 'releaseDateDesc') {
        sortedGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      }
      commit("setFilteredGames", sortedGames);
    }
  },
  modules: {},
});
