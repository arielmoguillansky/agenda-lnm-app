<template>
  <div class="flex justify-center w-full h-screen">
    <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <div class="mt-10">
            <h1 class="text-3xl font-extrabold text-center lg:text-5xl">
              Log in
            </h1>
            <form class="mt-12" @submit="onSubmit">
              <div>
                <TextInput
                  name="email"
                  type="email"
                  label="E-mail"
                  placeholder="Your email address"
                />
              </div>
              <div class="mt-4">
                <TextInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Your password"
                />
              </div>
              <div class="mt-10">
                <button
                  type="submit"
                  class="w-full p-3 font-bold rounded-full"
                  :disabled="!values.email || !values.password"
                  :class="
                    values.email && values.password
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
import { ref } from "vue";
import * as Yup from "yup";
const router = useRouter();
const config = useRuntimeConfig();
const { handleSubmit, values } = useForm({
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  }),
});

const login = async (values) => {
  const { data: responseData } = await useFetch(
    `${config.public.apiUrl}/login`,
    {
      headers: {
        cookie: "cookie",
      },
      method: "post",
      body: {
        email: values.email,
        password: values.password,
      },
    }
  );

  if (responseData.value.token) {
    localStorage.setItem("token", responseData.value.token);
    router.push("/");
  }
};

const onSubmit = handleSubmit((values, { resetForm }) => {
  login(values);
  resetForm();
});

// import axios from "axios";
// import { useUserStore } from "~~/stores/user";
// import AdminLayout from "~/layouts/AdminLayout.vue";

// const userStore = useUserStore();
// const router = useRouter();

// let email = ref(null);
// let password = ref(null);
// let errors = ref(null);

// const refreshState = () => {
//   userStore.resetState();
// };

// const login = async () => {
//   errors.value = null;
//   try {
//     await userStore.login(email.value, password.value);
//     const token = window.localStorage.getItem("token");
//     console.log("11111");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] =
//         "Bearer " + userStore.token;
//     }
//     router.push("/");
//   } catch (error) {
//     errors.value = error.response.data.errors;
//   }
// };
</script>
