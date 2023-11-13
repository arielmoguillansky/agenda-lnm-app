<template>
  <div>
    <header class="w-full px-4 py-9 bg-gray">
      <div>
        <h1 class="text-4xl font-bold">{{ route.meta.name }}</h1>
        <div class="flex items-center w-full px-4 mt-6 bg-white rounded-lg">
          <input
            class="flex-1 py-4 focus:outline-none"
            v-if="route.meta.name === 'Contacts'"
            type="text"
            v-model="search"
            placeholder="Search..."
          />
          <span class="right-0 material-icons">search</span>
        </div>
      </div>
    </header>
    <ul>
      <li
        v-for="(user, index) in contacts"
        :key="index"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-gray'"
        class="flex px-4 py-6"
      >
        <div class="rounded-full h-[50px] w-[50px] overflow-hidden">
          <img src="../assets/images/profile.webp" alt="" />
        </div>
        <div class="flex flex-col justify-center flex-1 gap-[3px] px-4">
          <h4 class="text-xl font-bold">{{ user.name }} {{ user.lastname }}</h4>
          <span class="text-sm text-gray-500">{{ user.status }}</span>
        </div>
        <button @click="editUser(user.id)">
          <span
            class="right-0 flex items-center text-gray-400 cursor-pointer material-icons"
          >
            chevron_right
          </span>
        </button>
      </li>
    </ul>
    <EditForm
      v-if="isModalOpened"
      :contactInfo="contactInfo"
      @modal-close="closeModal"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  name: "Contacts",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { getContacts, setId, getContactInfo } = useContactStore();
const { contacts, contactInfo } = storeToRefs(useContactStore());
const isModalOpened = ref(false);
await getContacts();

const closeModal = () => {
  isModalOpened.value = false;
  document.body.classList.remove("overflow-hidden");
};

const editUser = async (id) => {
  await getContactInfo(id); // call authenticateUser and pass the user object
  isModalOpened.value = true;
  document.body.classList.add("overflow-hidden");
};
</script>
