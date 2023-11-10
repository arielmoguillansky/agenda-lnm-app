<template>
  <header class="bg-white">
    <div class="container flex items-center px-4 py-8 mx-auto">
      <div
        class="items-center hidden w-full max-w-xs bg-gray-100 rounded-md xl:max-w-lg 2xl:max-w-2xl xl:flex"
        v-if="isLoggedIn"
      >
        <input
          class="pl-4 text-sm font-semibold bg-transparent border-l border-gray-300"
          type="text"
          placeholder="Search contact ..."
        />
      </div>
      <nav class="contents">
        <ul class="flex items-center justify-end ml-4 xl:w-48">
          <li class="relative inline-block ml-2 lg:ml-4">
            <LazyNuxtLink v-if="isLoggedIn" to="/user/profile"> </LazyNuxtLink>
            <LazyNuxtLink v-else to="/login"> </LazyNuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="px-2.5 w-full z-0">
    <slot />
  </div>
</template>

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
</script>
