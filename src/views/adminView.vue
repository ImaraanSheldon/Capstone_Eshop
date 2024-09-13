<template>
  <div class="container-fluid section">
    <div class="container">
      <h2 class="text-center text-decoration-underline pt-2">Admin</h2>

      <div class="row table-responsive">
        <div class="row justify-content-between">
          <h2><span>
              <button type="button" class="addbtn rounded-1" data-bs-toggle="modal"
                data-bs-target="#products">+</button>
            </span>
            Products
          </h2>

          <div class="modal fade" id="products" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="productsLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="productsLabel">Create product</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <input type="text" v-model="newProduct.title" placeholder="Title..." required>
                    <input type="text" v-model="newProduct.description" placeholder="Description..." required>
                    <input type="text" v-model="newProduct.genre" placeholder="Genre..." required>
                    <input type="date" v-model="newProduct.release_date" placeholder="Release Date..." required>
                    <input type="text" v-model="newProduct.price" placeholder="Price..." required>
                    <input type="text" v-model="newProduct.developer" placeholder="Developer..." required>
                    <input type="text" v-model="newProduct.publisher" placeholder="Publisher..." required>
                    <input type="text" v-model="newProduct.platform" placeholder="Platform..." required>
                    <input type="text" v-model="newProduct.cover_image" placeholder="Cover Image..." required>
                    <input type="text" v-model="newProduct.gameplay_imageOne" placeholder="Image One..." required>
                    <input type="text" v-model="newProduct.gameplay_imageTwo" placeholder="Image Two..." required>
                    <input type="text" v-model="newProduct.rating" placeholder="Rating..." required>
                    <input type="text" v-model="newProduct.stock_quantity" placeholder="Quantity..." required>
                    <input type="text" v-model="newProduct.amount_sold" placeholder="Amount Sold..." required>
                    <div class="modal-footer">
                      <button type="button" class="closeModal" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="closeModal" @click="createProduct">Create Product</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
        <table class="table table-sm table-hover text-center">
          <!-- HEAD FOR GAMES -->
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Genre</td>
              <td>Release Date</td>
              <td>Price</td>
              <td>Developer</td>
              <td>Publisher</td>
              <td>Platform</td>
              <td>Cover Image</td>
              <td>Image One</td>
              <td>Image Two</td>
              <td>Rating</td>
              <td>Stock Quantity</td>
              <td>Amount Sold</td>
              <td>Actions</td>
            </tr>
          </thead>
          <!-- DISPLAY GAMES -->
          <tbody>
            <tr v-for="product in games" :key="product.id">

              <td>{{ product.title }}</td>

              <td name="description">
                <p class="d-inline-flex gap-1">
                  <a class="btn" data-bs-toggle="collapse" :href="`#${product.id}des`" role="button"
                    aria-expanded="false" :aria-controls="`${product.id}des`">Show</a>
                </p>
                <div class="collapse" :id="`${product.productID}des`">
                  <div class="card card-body floatingDisplay extraPadding">
                    <a class="btn my-2 closeOverlay" data-bs-toggle="collapse" :href="`#${product.id}des`" role="button"
                      aria-expanded="false" :aria-controls="`${product.id}des`">Close</a>
                    <p>{{ product.description }}</p>
                  </div>
                </div>
              </td>
              <td>{{ product.genre }}</td>
              <td>{{ product.release_date }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.developer }}</td>
              <td>{{ product.publisher }}</td>
              <td>{{ product.platform }}</td>
              <td name="img1">
                <p class="d-inline-flex gap-1">
                  <a class="btn" data-bs-toggle="collapse" :href="`#${product.id}1`" role="button" aria-expanded="false"
                    :aria-controls="`${product.id}1`">Show</a>
                </p>
                <div class="collapse" :id="`${product.id}1`">
                  <div class="card card-body floatingDisplay">
                    <a class="btn my-2 closeOverlay" data-bs-toggle="collapse" :href="`#${product.id}1`" role="button"
                      aria-expanded="false" :aria-controls="`${product.id}1`">Close</a>
                    <img :src="product.cover_image" :alt="product.title" />
                    <p>{{ product.cover_image }}</p>
                  </div>
                </div>
              </td>
              <td name="img2">
                <p class="d-inline-flex gap-1">
                  <a class="btn" data-bs-toggle="collapse" :href="`#${product.id}2`" role="button" aria-expanded="false"
                    :aria-controls="`${product.id}2`">Show</a>
                </p>
                <div class="collapse" :id="`${product.id}2`">
                  <div class="card card-body floatingDisplay">
                    <a class="btn my-2 closeOverlay" data-bs-toggle="collapse" :href="`#${product.id}2`" role="button"
                      aria-expanded="false" :aria-controls="product.id">Close</a>
                    <img :src="product.gameplay_imageOne" :alt="product.title" />
                    <p>{{ product.gameplay_imageOne }}</p>
                  </div>
                </div>
              </td>
              <td name="img3">
                <p class="d-inline-flex gap-1">
                  <a class="btn" data-bs-toggle="collapse" :href="`#${product.id}3`" role="button" aria-expanded="false"
                    :aria-controls="`${product.id}3`">Show</a>
                </p>
                <div class="collapse" :id="`${product.id}3`">
                  <div class="card card-body floatingDisplay">
                    <a class="btn my-2 closeOverlay" data-bs-toggle="collapse" :href="`#${product.id}3`" role="button"
                      aria-expanded="false" :aria-controls="product.id">Close</a>
                    <img :src="product.gameplay_imageTwo" :alt="product.title" />
                    <p>{{ product.gameplay_imageTwo }}</p>
                  </div>
                </div>
              </td>
              <td>{{ product.rating }}</td>
              <td>{{ product.stock_quantity }}</td>
              <td>{{ product.amount_sold }}</td>
              <td>
                <!-- DELETE -->
                <button type="button" class="functionbtn bi bi-trash rounded-1"
                  @click="deleteProduct(product.id)">DELETE</button>
                <!-- EDIT -->
                <button type="button" class="functionbtn bi bi-pen rounded-1" data-bs-toggle="modal"
                  :data-bs-target="`#editP${product.id}`">EDIT
                </button>

                <!-- Modal -->
                <div class="modal fade" :id="`editP${product.id}`" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" :aria-labelledby="`editP${product.id}`" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="`editP${product.id}`">Edit: {{ product.title }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">

                        <form>
                          <input type="text" v-model="product.title" placeholder="Title..." required>
                          <input type="text" v-model="product.description" placeholder="Description..." required>
                          <input type="text" v-model="product.genre" placeholder="Genre..." required>
                          <input type="text" v-model="product.release_date" placeholder="Release Date..." required>
                          <input type="text" v-model="product.price" placeholder="Price..." required>
                          <input type="text" v-model="product.developer" placeholder="Developer..." required>
                          <input type="text" v-model="product.publisher" placeholder="Publisher..." required>
                          <input type="text" v-model="product.platform" placeholder="Platform..." required>
                          <input type="text" v-model="product.cover_image" placeholder="Cover Image..." required>
                          <input type="text" v-model="product.gameplay_imageOne" placeholder="Image One..." required>
                          <input type="text" v-model="product.gameplay_imageTwo" placeholder="Image Two..." required>
                          <input type="text" v-model="product.rating" placeholder="Rating..." required>
                          <input type="text" v-model="product.stock_quantity" placeholder="Quantity..." required>
                          <input type="text" v-model="product.amount_sold" placeholder="Amount Sold..." required>
                          <div class="modal-footer">
                            <button type="button" class="closeModal" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="closeModal" @click="editProduct(product)">Edit Product</button>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row table-responsive">
        <div class="row justify-content-between">
          <h2><span>
              <button type="button" class="addbtn rounded-1" data-bs-toggle="modal" data-bs-target="#users">+</button>
            </span>
            Users
          </h2>

          <div class="modal fade" id="users" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="usersLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="usersLabel">Create user</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <input type="text" v-model="newUser.username" placeholder="Username..." required>
                    <input type="password" v-model="newUser.userPass" placeholder="Password..." required>
                    <input type="email" v-model="newUser.email" placeholder="Email..." required>
                    <input type="text" v-model="newUser.full_name" placeholder="Full Name..." required>
                    <select v-model="newUser.account_status" required>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="deleted">Deleted</option>
                    </select>
                    <select v-model="newUser.userType" required>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <input type="text" v-model="newUser.profile_picture" placeholder="Profile Image" required>
                    <input type="text" v-model="newUser.date_of_birth" placeholder="Date of Birth" required>
                    <select v-model="newUser.gender" required>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <div class="modal-footer">
                      <button type="button" class="closeModal" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="closeModal" @click="createUser">Create User</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
        <table class="table table-sm table-hover text-center">
          <thead>
            <tr>
              <td>Username</td>
              <td>Password</td>
              <td>Email</td>
              <td>full_name</td>
              <td>Account Status</td>
              <td>Role</td>
              <td>Profile Picture</td>
              <td>Date of Birth</td>
              <td>Gender</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.userPass }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.full_name }}</td>
              <td>{{ user.account_status }}</td>
              <td>{{ user.userType }}</td>
              <td>{{ user.profile_picture }}</td>
              <td>{{ user.date_of_birth }}</td>
              <td>{{ user.gender }}</td>
              <td>
                <button type="button" class="functionbtn bi bi-trash rounded-1"
                  @click="deleteUser(user.id)">DELETE</button>
                <button type="button" class="functionbtn bi bi-pen rounded-1" data-bs-toggle="modal"
                  :data-bs-target="`#edit${user.id}`">EDIT
                </button>

                <!-- Modal -->
                <div class="modal fade" :id="`edit${user.id}`" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" :aria-labelledby="`edit${user.id}`" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="`edit${user.id}`">Edit: {{ user.full_name }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <input type="text" v-model="user.username" placeholder="Username..." required>
                          <input type="password" v-model="user.userPass" placeholder="Password..." required>
                          <input type="email" v-model="user.email" placeholder="Email..." required>
                          <input type="text" v-model="user.full_name" placeholder="Full Name..." required>
                          <select v-model="user.account_status" required>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="deleted">Deleted</option>
                          </select>
                          <select v-model="user.userType" required>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                          <input type="text" v-model="user.profile_picture" placeholder="Profile Image" required>
                          <input type="text" v-model="user.date_of_birth" placeholder="Date of Birth" required>
                          <select v-model="user.gender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          <div class="modal-footer d-flex justify-content-center">
                            <button type="button" class="closeModal" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="closeModal" @click="editUser(user)">Edit User</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import store from '@/store';

export default {
  data() {
    return {
      newProduct: {
        title: "",
        description: "",
        genre: "",
        release_date: "",
        price: "",
        developer: "",
        publisher: "",
        platform: "",
        cover_image: "",
        gameplay_imageOne: "",
        gameplay_imageTwo: "",
        rating: "",
        stock_quantity: "",
        amount_sold: ""
      },
      newUser: {
        username: "",
        userPass: "",
        email: "",
        full_name: "",
        account_status: "",
        userType: "",
        profile_picture: "",
        date_of_birth: "",
        gender: ""
      }
    }




  },
  components: {},
  computed: {
    ...mapState(['users', 'games'])
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchGames', 'addUser', 'addProduct', 'editUser', 'editProduct', 'deleteUser', 'deleteProduct']),

    async createProduct() {
      try {
        if (this.newProduct.title == "" || this.newProduct.description == "" || this.newProduct.genre == "" || this.newProduct.release_date == "" || this.newProduct.price == "" || this.newProduct.developer == "" || this.newProduct.publisher == "" || this.newProduct.cover_image == "" || this.newProduct.gameplay_imageOne == "" || this.newProduct.gameplay_imageTwo == "" || this.newProduct.rating == "" || this.newProduct.stock_quantity == "" || this.newProduct.amount_sold == "") {
          console.log('someting empty');
          toast.error(`Empty field! please fill in all fields.`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        } else {
          await this.addProduct(this.newProduct);
          this.newProduct = {
            title: "",
            description: "",
            genre: "",
            release_date: "",
            price: "",
            developer: "",
            publisher: "",
            platform: "",
            cover_image: "",
            gameplay_imageOne: "",
            gameplay_imageTwo: "",
            rating: "",
            stock_quantity: "",
            amount_sold: ""
          };
        }



      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async createUser() {
      try {
        await this.addUser(this.newUser);

        this.newUser = {
          username: "",
          userPass: "",
          email: "",
          full_name: "",
          account_status: "",
          userType: "",
          profile_picture: "",
          date_of_birth: "",
          gender: ""
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async deleteUser(id) {
      try {
        this.$store.dispatch('deleteUser', id).then(() => {
          this.fetchUsers()
        })
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async deleteProduct(productID) {
      try {
        this.$store.dispatch('deleteProduct', productID).then(() => {
          this.fetchGames()
        })
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    editUser(user) {

      try {
        let count = 0

        store.state.users.forEach((value) => {
          if (value.email == user.email) {
            count = count + 1
          }
        });

        if (count > 1) {
          toast.warning(`Email is already in use!`, {
            autoClose: 3000,
            position: 'bottom-center'
          })
        } else {
          
          this.$store.dispatch('editUser', user).then(() => {
            this.fetchUsers()
          })
        }

      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    editProduct(product) {
      try {
        console.log(product);
        this.$store.dispatch('editProduct', product).then(() => {
          this.fetchGames()
        })
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    }

  },
  mounted() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchGames");
  },
};
</script>

<style scoped>
* {
  color: #e9e9e9;
}

h1 {
  color: #181818;
  text-decoration: underline;
}

h2 {
  padding-inline: 0;
}

.floatingDisplay {
  position: fixed;
  top: 4rem;
  left: 0%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  overflow-y: auto;

  & img {
    width: 38rem;
    max-width: 100%;
  }
}

a {
  background: #818181;
  transition: background 0.3s, color 0.3s;

  /*   &:focus {
      border: 2px solid #e9e9e9;
    } */

  &:hover {
    background: #181818;
    color: #e9e9e9;
  }
}

.closeOverlay {
  background: #e9e9e9;
  transition: background 0.3s;

  &:hover {
    background: #818181;
  }
}

.extraPadding {
  padding-inline: 2rem;
}

input,
select {

  height: 1.8rem;
  margin-block: 0.5rem;
  justify-content: center;
  background-color: #181818;
  padding-inline: 1rem;

  &:focus {
    outline: none;
  }
}

.closeModal {

  height: 1.8rem;
  margin-block: 0.5rem;
  margin-inline: 0;
  justify-content: center;
  background-color: #181818;
  width: 100%;
  transition: color 0.3s, background 0.3s;

  &:hover {
    color: #181818;
    background: #e9e9e9
  }

  &:focus {
    outline: none;
  }
}

.modal-footer {
  padding-inline: 0;
}

form,
.modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & * {
    width: 30rem;
    max-width: 90%;
  }
}

.addbtn {
  width: 3rem;
  background: #818181;
  transition: background 0.4s, color 0.3s;

  &:hover {
    background: #e9e9e9;
    color: #818181;
  }
}

.functionbtn {
  background: #818181;
  transition: background 0.4s, color 0.3s;
  margin: 0.2rem;

  &:hover {
    background: #e9e9e9;
    color: #818181;
  }
}

.table,
th {
  background-color: #ff0000;
}
</style>