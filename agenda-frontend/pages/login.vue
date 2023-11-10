<script setup>
import { storeToRefs } from "pinia";

const auth = useAuth();
// `name` and `doubleCount` are reactive refs
// This will also extract refs for properties added by plugins
// but skip any action or non reactive (non ref/reactive) property
const { token } = storeToRefs(auth);
console.log(token);
</script>
<template>
  <div>
    <h1>Login</h1>
    <form action="">
      <div>
        <label for="email">Email</label>
        <input type="email" placeholder="johndoe@mail.com" />
        <label for="password">Password</label>
        <input type="password" />
      </div>
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAuth } from "../store/index";
export default {
  name: "LoginPage",
  methods: {
    ...mapActions(useAuth, ["userLogin"]),
  },
};
</script>