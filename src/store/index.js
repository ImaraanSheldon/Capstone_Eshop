import { createStore } from "vuex";
import axios from "axios";
// import Swal from "sweetalert2/dist/sweetalert2";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const portURL = "http://localhost:4324/";

export default createStore({
  state: {
    users: null,
    games: null,
    published: null,
    developed: null,
    recent: null,
    discounts: null,
    charts: null,
    filteredGames: [],
    cart: JSON.parse(cookies.get("cart")) || [],
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setPublished(state, value) {
      state.published = value;
    },
    setDeveloped(state, value) {
      state.developed = value;
    },
    setRecent(state, value) {
      state.recent = value;
    },
    setDiscount(state, value) {
      state.discounts = value;
    },
    setCharts(state, value) {
      state.charts = value;
    },

    // search
    setGames(state, games) {
      state.games = games;
      state.filteredGames = games;
    },
    setFilteredGames(state, games) {
      state.filteredGames = games;
    },

    // cart
    addToCart(state, cart) {
      state.cart.push(cart); // Or do other updates if needed
    },
    removeFromCart(state, itemId) {
      state.cart = state.cart.filter(item => item.id !== itemId);
    },
  },
  actions: {
    // All Users
    async fetchUsers(context) {
      let { results } = await (await axios.get(`${portURL}users`)).data;
      context.commit("setUsers", results);
    },

    // 4 recent Games published by Nintendo
    async fetchPublished(context) {
      let { results } = await (
        await axios.get(`${portURL}games/Nintendo_Published`)
      ).data;
      context.commit("setPublished", results);
    },

    // ALL Games developed by Nintendo
    async fetchDeveloped(context) {
      let { results } = await (
        await axios.get(`${portURL}games/Nintendo_Developed`)
      ).data;
      context.commit("setDeveloped", results);
    },

    // ALL Games developed by Nintendo
    async fetchRecent(context) {
      let { results } = await (await axios.get(`${portURL}games/recent`)).data;
      context.commit("setRecent", results);
    },

    // ALL Discounts
    async fetchDiscount(context) {
      let { results } = await (
        await axios.get(`${portURL}games/Discounts`)
      ).data;
      context.commit("setDiscount", results);
    },

    // top 20 most sold Games
    async fetchCharts(context) {
      let { results } = await (await axios.get(`${portURL}games/Charts`)).data;
      context.commit("setCharts", results);
    },

    // search & sort functions
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

      if (sortBy === "priceAsc") {
        sortedGames.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceDesc") {
        sortedGames.sort((a, b) => b.price - a.price);
      } else if (sortBy === "releaseDateAsc") {
        sortedGames.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      } else if (sortBy === "releaseDateDesc") {
        sortedGames.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      }
      commit("setFilteredGames", sortedGames);
    },

    // cart
    toCart({ commit }, game) {
      commit("addToCart", game);
      cookies.set("cart", JSON.stringify(this.state.cart));
    },
  },
  modules: {},
});
