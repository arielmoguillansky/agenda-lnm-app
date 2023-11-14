// @/store/modal.ts

import { markRaw } from "vue";
import { defineStore } from "pinia";
const basicState = { component: null, props: {}, isOpened: false };

export const useModalStore = defineStore("modal", {
  state: () => ({ modalState: basicState }),
  actions: {
    openModal(payload) {
      // Get props and component from payload passed to function
      const { props, component } = payload;
      document.body.classList.add("overflow-hidden");

      // Assign them to our state
      this.modalState = { component, props: props || {}, isOpened: true };
    },

    closeModal() {
      // Reset our state
      document.body.classList.remove("overflow-hidden");
      this.modalState = basicState;
    },
  },
  getters: {},
});
