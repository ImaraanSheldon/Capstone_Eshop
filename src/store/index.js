import { createStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2";
import { useCookies } from "vue3-cookies";
import { applyToken } from "@/service/Authenticate";

const { cookies } = useCookies();

const portURL = "https://capstone-eshop.onrender.com/";

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
    product: null,
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
    // logout
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setCart(state, value){
      state.value = value
    }
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
        
        const response = await axios.post(`${portURL}users/login`, payload);
        const { message, result, token } = response.data;
        cookies.set('LegitUser',{ message, result, token })
        if (result) {
          console.log(result);
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
          // if(result.userType == 'admin'){
          //   router.push({name : 'admin'})
          // }else{
          //   router.push({ name: 'pfp' });
          // }
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
    

    async fetchProductById(context, id) {
      let { result } = await (await axios.get(`${portURL}games/${id}`)).data;
      console.log(result);
      context.commit("setProduct", result);
    
    },

    async addProduct(context, payload) {
      try {
        const { msg } = await (await axios.post(`${portURL}games/register`, payload)).data;
        if (msg) {
          context.dispatch('fetchGames');
          Swal.fire({
            icon: 'success',
            title: 'Yayy',
            text: msg,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        }
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
          timer: 2000,
          timerProgressBar: true,
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false
        });
      }
    },
    async addUser(context, payload) {
      try {
        const { token, msg, error } = await (await axios.post(`${portURL}users/register`, payload)).data;
        if (token) {
          context.dispatch('fetchUsers');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: error,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        }
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
          timer: 2000,
          timerProgressBar: true,
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false
        });
      }
    },
    async deleteUser(context, id) {
      try {
        const { msg, err } = await (await axios.delete(`${portURL}users/${id}`)).data;
        if (msg) {
          context.dispatch('fetchUsers');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        }
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
          timer: 2000,
          timerProgressBar: true,
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false
        });
      }
    },
    async deleteProduct(context, id) {
      try {
        const { msg, err } = await (await axios.delete(`${portURL}games/${id}`)).data;
        if (msg) {
          context.dispatch('fetchGames');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        }
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
          timer: 2000,
          timerProgressBar: true,
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false
        });
      }
    },
    async editUser(context, id) {
      try {
        console.log(id);
        let user = JSON.parse(JSON.stringify(id))
        delete user.id
        const { msg } = await (await axios.patch(`${portURL}users/${id.id}}`,user)).data;
        if (msg) {
          context.dispatch('fetchUsers');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
            timer: 2000,
            timerProgressBar: true,
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false
          });
        }
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
          timer: 2000,
          timerProgressBar: true,
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false
        });
      }
    },
    async editProduct(context, product) {
      try {
        await (axios.patch(`${portURL}games/${product.id}`, product)).data;
        context.dispatch('fetchGames');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully updated product',
          timer: 2000,
          timerProgressBar: true,
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false
        });
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
          timer: 2000,
          timerProgressBar: true,
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false
        });
      }
    }
  },
  modules: {},
});
