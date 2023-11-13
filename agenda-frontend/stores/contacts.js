import { defineStore } from "pinia";

export const useContactStore = defineStore("contacts", {
  state: () => ({
    contacts: [],
  }),
  actions: {
    async getContacts() {
      console.log("22222222222");

      const token = useCookie("token");
      const config = useRuntimeConfig();
      const { data, pending } = await useFetch(
        `${config.public.apiUrl}/users`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      this.loading = pending;
      if (data.value) {
        this.contacts = data.value;
        // token.value = data?.value?.token; // set token to cookie
        // this.authenticated = true; // set authenticated  state value to true
      }
    },
  },
});
