<template>
  <div class="flex justify-center w-full h-screen">
    <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <div class="mt-10">
            <h1 class="text-3xl font-extrabold text-center lg:text-5xl">
              Log in
            </h1>
            <form class="mt-12" @submit.prevent="login()">
              <div>
                <TextInput
                  placeholder="Email: link@gmail.com"
                  v-model:input="email"
                  inputType="email"
                  :error="errors && errors.email ? errors.email[0] : ''"
                />
              </div>
              <div class="mt-4">
                <TextInput
                  placeholder="Password"
                  v-model:input="password"
                  inputType="password"
                  :error="errors && errors.password ? errors.password[0] : ''"
                />
              </div>
              <div class="mt-10">
                <button
                  type="submit"
                  class="w-full p-3 font-bold rounded-full"
                  :disabled="!email || !password"
                  :class="
                    email && password
                      ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white'
                      : 'bg-[#EFF0EB] text-[#A7AAA2]'
                  "
                >
                  Log in
                </button>
              </div>
            </form>
            <button @click="refreshState()">Refresh</button>

            <div class="text-[14px] text-center pt-12">
              Don't have an account?
              <NuxtLink to="/signup" class="text-[#8228D9] underline">
                Sign up
              </NuxtLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserStore } from "~~/stores/user";
import AdminLayout from "~/layouts/AdminLayout.vue";

const userStore = useUserStore();
const router = useRouter();

let email = ref(null);
let password = ref(null);
let errors = ref(null);

const refreshState = () => {
  userStore.resetState();
};

const login = async () => {
  errors.value = null;
  try {
    await userStore.login(email.value, password.value);
    const token = window.localStorage.getItem("token");
    console.log("11111");
    if (token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + userStore.token;
    }
    router.push("/");
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};
</script>
