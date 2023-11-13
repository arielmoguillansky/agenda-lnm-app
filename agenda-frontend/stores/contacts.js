import { defineStore } from "pinia";

export const useContactStore = defineStore("contacts", {
  state: () => ({
    contacts: [],
    filteredContacts: [],
    contactInfo: {},
  }),
  persistence: {
    enable: true,
    mode: "localSession",
  },
  getters: {},
  actions: {
    setId(id) {
      this.contactId = id;
    },
    async getContactInfo(id) {
      try {
        const token = useCookie("token");
        const config = useRuntimeConfig();
        const { data, pending } = await useFetch(
          `${config.public.apiUrl}/users/${id}`,
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
          this.contactInfo = data.value[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getContacts() {
      try {
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
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
