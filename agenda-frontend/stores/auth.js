import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    registered: false,
    loading: false,
    error: "",
    user: {},
  }),
  persist: true,
  getters: {},
  actions: {
    async authenticateUser({ email, password }) {
      const config = useRuntimeConfig();
      const { data, pending, error } = await useFetch(
        `${config.public.apiUrl}/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: {
            email,
            password,
          },
        }
      );
      this.loading = pending;
      if (error.value) {
        this.error = error.value.data.message;
      }
      if (data.value) {
        const token = useCookie("token");
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
        this.user = data.value.user;
      }
    },
    async registerUser({
      email,
      password,
      password_confirmation,
      name,
      lastname,
      phone,
      address,
      title,
    }) {
      const config = useRuntimeConfig();
      const { data, pending } = await useFetch(
        `${config.public.apiUrl}/signup`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: {
            email,
            password,
            password_confirmation,
            name,
            lastname,
            phone,
            address,
            title,
          },
        }
      );
      this.loading = pending;
      if (data.value) {
        this.registered = true; // set registered  state value to true
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});
