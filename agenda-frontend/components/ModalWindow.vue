<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        class="modal-wrapper"
        @click.self="store.closeModal"
        v-if="store.modalState?.component"
      >
        <component
          :is="store.modalState?.component"
          v-bind="store.modalState?.props"
        />
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
import { useModalStore } from "~/stores/modal";

const store = useModalStore();
</script>
<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: 0.25s ease all;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.25s ease all;
}
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;

  z-index: 500;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);

  display: grid;
  place-items: center;
}
</style>