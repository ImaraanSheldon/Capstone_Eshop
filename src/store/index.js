import { createStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2";
import { useCookies } from "vue3-cookies";
import { applyToken } from "@/service/Authenticate";
import router from "@/router";

const { cookies } = useCookies();

const portURL = "http://localhost:4324/";

export default createStore({
  state: {
    users: null,
    user:null,
    games: null,
    published: null,
    developed: null,
    recent: null,
    discounts: null,
    charts: null,
    filteredGames: [],
    cart: JSON.parse(cookies.get("cart")) || [],
    token:null,
    role:null,
    product: null
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setUser(state, value) {
      state.user = value;
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
    setProduct(state, product) {
      state.product = product
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

    // login
    async login({ commit }, payload) {
      try {
        console.log(payload);
        
        const response = await axios.post(`${portURL}users/login`, payload);
        const { message, result, token } = response.data;
  
        if (result) {
          // Show success message with SweetAlert2
          await Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay'
          });
  
          commit('setUser', { message, result, token });
          cookies.set('LegitUser', { token, message, result });
          applyToken(token);
          router.push({ name: 'home' });
        } else {
          // Show error message with SweetAlert2
          await Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Okay'
          });
        }
      } catch (e) {
        // Show error message with SweetAlert2
        await Swal.fire({
          title: 'Error!',
          text: e.message,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Okay'
        });
      }
    },

    async fetchProductById(context) {
      let { results } = await (await axios.get(`${portURL}games/:id`)).data;
      context.commit("setProduct", results);
    },
  },
  modules: {},
});
