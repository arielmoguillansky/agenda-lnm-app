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
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const config = useRuntimeConfig();
const { handleSubmit, values } = useForm({
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  }),
});

const onSubmit = handleSubmit((values, { resetForm }) => {
  login(values);
  resetForm();
});

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const login = async (values) => {
  await authenticateUser(values); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/");
  }
};
</script>
