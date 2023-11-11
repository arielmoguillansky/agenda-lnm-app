<template>
  <div>
    <div id="AdminPage" class="flex pb-4">
      <div class="max-w-[750px] mx-auto pb-24">
        <div class="bg-white">
          <div
            class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
          >
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">
              Contacts
            </h2>
            <div
              class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
            >
              <div
                class="relative group"
                v-for="(user, index) in data"
                :key="index"
              >
                {{ user.name }}
                <!-- <button
                  class="px-2 py-1 text-white rounded-md bg-gradient-to-r from-cyan-500 to-blue-500"
                  @click.prevent="addUser(data.id)"
                >
                  Add contact
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
      @click="logout()"
    >
      <span class="mx-4 font-medium"> Sign out </span>
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
const router = useRouter();
const config = useRuntimeConfig();
let token;
if (process.client) {
  token = localStorage.getItem("token");
}
const { data } = await useFetch(`${config.public.apiUrl}/users`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
// import AdminLayout from "~~/layouts/AdminLayout.vue";
// import { useUserStore } from "~~/stores/user";
// import { storeToRefs } from "pinia";

// const userStore = useUserStore();
// const { user } = storeToRefs(userStore);
// const router = useRouter();
// const addUser = async (productID) => {
//   try {
//     await userStore.addUser(userId);
//   } catch (error) {}
// };
// onMounted(async () => {
//   try {
//     await userStore.getUsers();
//   } catch (error) {
//     console.log(error);
//   }
// });
// const logout = async () => {
//   try {
//     console.log("token", token);
//     await userStore.logout();
//     router.push("/");
//   } catch (error) {
//     console.log(error);
//   }
// };
</script>
