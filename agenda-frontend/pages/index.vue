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
                v-for="(user, index) in contacts"
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
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
const router = useRouter();
const config = useRuntimeConfig();
const { getContacts } = useContactStore();
const { contacts } = storeToRefs(useContactStore());

onMounted(async () => {
  try {
    console.log("ACA");
    await getContacts();
  } catch (error) {
    console.log(error);
  }
});
</script>
