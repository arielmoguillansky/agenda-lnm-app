<template>
  <div class="px-2.5 w-full z-0">
    <slot />
  </div>
</template>
<!-- 
<script setup>
import { useUserStore } from "~~/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
computed(async () => {
  try {
    await userStore.getUser();
  } catch (error) {}
});
</script> -->
