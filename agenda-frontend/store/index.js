import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: {},
  }),
  actions: {
    async userLogin(data) {
      const res = await this.$axios.post(API_URL, data);
      console.log(res);
    },
  },
});
