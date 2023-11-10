<template>
  <AdminLayout>
    <div id="AdminPage" class="flex h-[100vh] pb-4">
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
                v-for="(user, index) in users.data"
                :key="index"
              >
                <div
                  class="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none lg:h-80"
                >
                  <img
                    src="https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="image"
                    class="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  />
                </div>
                <button
                  class="px-2 py-1 text-white rounded-md bg-gradient-to-r from-cyan-500 to-blue-500"
                  @click.prevent="addUser(user.id)"
                >
                  Add contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~~/layouts/AdminLayout.vue";
import { useUserStore } from "~~/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const addUser = async (productID) => {
  try {
    await userStore.addUser(userId);
  } catch (error) {}
};

onMounted(async () => {
  try {
    await userStore.getUser();
  } catch (error) {
    console.log(error);
  }
});
</script>
