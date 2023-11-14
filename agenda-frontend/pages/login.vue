<template>
  <div class="flex flex-col justify-center h-screen m-auto md:max-w-md">
    <h1 class="text-3xl font-extrabold text-center lg:text-5xl">Welcome</h1>
    <form class="mt-10" @submit="onSubmit">
      <div>
        <TextInput name="email" type="email" placeholder="john@doe.com" />
      </div>
      <div class="mt-4">
        <TextInput name="password" type="password" placeholder="******" />
      </div>
      <div class="h-1 text-red-400">
        {{ error }}
      </div>
      <div class="m-auto mt-12">
        <button
          type="submit"
          class="block w-4/6 p-4 m-auto font-semibold uppercase rounded-full"
          :disabled="!values.email || !values.password"
          :class="
            values.email && values.password
              ? 'bg-purple hover:bg-purple text-white'
              : 'bg-[#EFF0EB] text-[#A7AAA2]'
          "
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import * as Yup from "yup";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const { handleSubmit, values } = useForm({
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }),
});

const onSubmit = handleSubmit((values) => {
  login(values);
});

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated, error } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const login = async (values) => {
  await authenticateUser(values); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/");
  }
};
</script>
