<template>
  <div class="pb-9">
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
        v-for="(user, index) in filteredContacts"
        :key="index"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-gray'"
      >
        <button
          @click="openEditionForm(user.id)"
          class="flex items-center w-full px-4 py-6 text-left"
        >
          <div class="rounded-full h-[50px] w-[50px] overflow-hidden">
            <img src="../assets/images/profile.webp" alt="" />
          </div>
          <div class="flex flex-col justify-center flex-1 gap-[3px] px-4">
            <h4 class="text-xl font-bold">
              {{ user.name }} {{ user.lastname }}
            </h4>
            <span class="text-sm text-gray-500">{{ user.status }}</span>
          </div>
          <span
            class="right-0 flex items-center text-gray-400 cursor-pointer material-icons"
          >
            chevron_right
          </span>
        </button>
      </li>
    </ul>
    <div class="m-auto mt-12">
      <button
        @click="openCreationForm"
        class="block w-4/6 p-4 m-auto font-semibold text-white uppercase rounded-full bg-purple hover:bg-purple"
      >
        Add new contact
      </button>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "~/stores/modal";
import EditForm from "~/components/EditForm.vue";

const store = useModalStore();
const search = ref("");

const openEditionForm = async (id) => {
  store.openModal({ component: EditForm });
  await getContactInfo(id);
};

const openCreationForm = async () => {
  store.openModal({ component: CreateForm });
};

definePageMeta({
  middleware: "auth",
  name: "Contacts",
});

const route = useRoute();

const { getContacts, getContactInfo } = useContactStore();
const { contacts } = storeToRefs(useContactStore());

await getContacts();

const filteredContacts = computed(() => {
  const searchTerm = search.value.toLowerCase().trim();

  if (!searchTerm) {
    return contacts.value;
  }

  return contacts.value.filter((contact) => {
    const fullName = `${contact.name} ${contact.lastname}`.toLowerCase();
    return fullName.includes(searchTerm);
  });
});
</script>
