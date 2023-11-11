import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    username: "",
    address: "",
    email: "",
    token: "",
    isLoggedIn: false,
  }),
  actions: {
    async login(email, password) {
      await $axios
        .post("/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(this.$state);
          localStorage.setItem("token", response.data.token);
          this.$state.token = response.data.user.token;
          this.$state.email = response.data.user.email;
          this.$state.id = response.data.user.id;
          this.$state.isLoggedIn = true;
        });
    },

    async register(name, email, password, confirmPassword) {
      await $axios.post("/api/register", {
        full_name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },

    async getUsers() {
      let res = await $axios.get("/api/users");
      this.$state.id = res.data.id;
      this.$state.name = res.data.name;
      this.$state.username = res.data.username;
      this.$state.avatar = res.data.avatar;
      this.$state.address = res.data.address;
      this.$state.phone = res.data.phone;
      this.$state.title = res.data.title;
      this.$state.email = res.data.email;
      this.$state.isLoggedIn = true;
    },

    async logout() {
      await $axios.post("/api/logout");
      localStorage.removeItem("token");
      this.resetState();
    },

    resetState() {
      console.log(this.$state);
      this.$state.id = "";
      this.$state.name = "";
      this.$state.username = "";
      this.$state.address = "";
      this.$state.email = "";
      this.$state.token = "";
      this.$state.isLoggedIn = false;
    },
  },
  persist: true,
});
