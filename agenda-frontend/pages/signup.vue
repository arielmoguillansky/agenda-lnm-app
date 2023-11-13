<template>
  <div class="flex justify-center w-full h-screen">
    <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <div class="mt-10">
            <h1 class="text-3xl font-extrabold text-center lg:text-5xl">
              Sign Up
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
              <div>
                <TextInput
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="John"
                />
              </div>
              <div>
                <TextInput
                  name="lastname"
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                />
              </div>
              <div>
                <TextInput
                  name="address"
                  type="text"
                  label="Address"
                  placeholder=""
                />
              </div>
              <div>
                <TextInput
                  name="phone"
                  type="number"
                  label="Phone number"
                  placeholder=""
                />
              </div>
              <div>
                <TextInput
                  name="title"
                  type="text"
                  label="Profession"
                  placeholder=""
                />
              </div>
              <div class="mt-4">
                <TextInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Your password"
                />
                <TextInput
                  name="password_confirmation"
                  type="password"
                  label="Confirm Password"
                  placeholder="Type it again"
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
                  Create account
                </button>
              </div>
            </form>
            <div class="text-[14px] text-center pt-12">
              Already have an account?
              <NuxtLink to="/login" class="text-[#8228D9] underline">
                Login
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
const { registerUser } = useAuthStore();

const { registered } = storeToRefs(useAuthStore());

const { handleSubmit, values } = useForm({
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    name: Yup.string().required(),
    lastname: Yup.string().required(),
    address: Yup.string().required(),
    title: Yup.string().required(),
    phone: Yup.string().required(),
    password: Yup.string().min(6).required(),
    password_confirmation: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  }),
});

const signup = async (values, resetForm) => {
  await registerUser(values);
  if (registered.value) {
    router.push("/login");
    resetForm();
  }
};

const onSubmit = handleSubmit((values, { resetForm }) => {
  signup(values, resetForm);
});
</script>
