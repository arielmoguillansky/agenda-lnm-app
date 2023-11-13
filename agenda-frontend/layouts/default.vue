<template>
  <div class="px-2.5 w-full z-0">
    <header>
      <li v-if="authenticated" class="loginBtn" style="float: right">
        <nuxt-link @click="logout">Logout</nuxt-link>
      </li>
    </header>
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

<script setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/stores/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>
