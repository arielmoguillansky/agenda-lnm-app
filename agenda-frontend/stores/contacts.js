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
    async createContact(payload) {
      try {
        const token = useCookie("token");
        const config = useRuntimeConfig();
        const { data, pending } = await useFetch(
          `${config.public.apiUrl}/contact`,
          {
            method: "post",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.value}`,
            },
            body: payload,
          }
        );

        this.loading = pending;
        if (data.value) {
          console.log("SUCCESS");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async updateContact(id, payload) {
      try {
        const token = useCookie("token");
        const config = useRuntimeConfig();
        const { data, pending } = await useFetch(
          `${config.public.apiUrl}/contact/${id}`,
          {
            method: "post",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.value}`,
            },
            body: payload,
          }
        );

        this.loading = pending;
        if (data.value) {
          this.contactInfo = { ...data.value };
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getContactInfo(id) {
      try {
        const token = useCookie("token");
        const config = useRuntimeConfig();
        const { data, pending } = await useFetch(
          `${config.public.apiUrl}/contact/${id}`,
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
    async getContacts(user_id) {
      try {
        const token = useCookie("token");
        const config = useRuntimeConfig();
        const { data, pending } = await useFetch(
          `${config.public.apiUrl}/contacts`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token.value}`,
            },
            body: {
              user_id,
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
