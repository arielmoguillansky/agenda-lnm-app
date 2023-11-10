<script setup>
import { useAuth } from "~/store";
const auth = useAuth();
console.log(auth.token);
</script>
<template>
  <div>
    <nuxt-link to="/login"> Login </nuxt-link>
    <nuxt-link to="/register"> Sign up </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>