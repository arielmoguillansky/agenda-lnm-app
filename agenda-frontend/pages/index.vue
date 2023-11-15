<template>
  <div class="p-4">
    <header class="w-full px-4 py-9 bg-gray">
      <div>
        <h1 class="text-4xl font-bold">{{ route.meta.name }}</h1>
      </div>
    </header>
    <h1 class="text-3xl">Welcome {{ user.name }}</h1>
    <div class="m-auto mt-12">
      <nuxt-link
        to="/contacts"
        class="block w-4/6 p-4 m-auto font-semibold text-center text-white uppercase rounded-full bg-purple hover:bg-purple shadow-cta"
      >
        Contacts list
      </nuxt-link>
    </div>
    <div class="m-auto mt-12">
      <button
        @click="logout"
        class="block w-4/6 p-4 m-auto font-semibold text-white uppercase rounded-full bg-purple hover:bg-purple shadow-cta"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  name: "Home",
});
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/stores/auth"; // import the auth store we just created

const route = useRoute();
const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>