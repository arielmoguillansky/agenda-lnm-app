<template>
  <div class="p-4">
    <div class="flex gap-2 mb-4 text-gray-400">
      <span class="text-gray-400 cursor-pointer material-icons">
        arrow_back
      </span>
      <span>Back</span>
    </div>
    <div>
      <div class="flex gap-3">
        <div class="rounded-full h-[50px] w-[50px] overflow-hidden">
          <img src="../assets/images/profile.webp" alt="" />
        </div>
        <div>
          <h2 class="text-2xl font-bold">
            {{ contactInfo.name }} {{ contactInfo.lastname }}
          </h2>
          <span>{{ contactInfo.title }}</span>
        </div>
      </div>
    </div>
    <div class="my-5">
      <h3 class="mb-2 text-xl font-bold">Address</h3>
      <span class="text-gray-400">{{ contactInfo.address }}</span>
    </div>
    <div class="my-4">
      <h3 class="mb-2 text-xl font-bold">Phone</h3>
      <span class="text-gray-400">{{ contactInfo.phone }}</span>
    </div>
    <div class="my-4">
      <h3 class="mb-2 text-xl font-bold">Email</h3>
      <span class="text-gray-400">{{ contactInfo.email }}</span>
    </div>
    <div class="m-auto mt-12">
      <button
        v-if="state.showForm"
        @click="updateUser"
        class="block w-4/6 p-4 m-auto font-semibold text-white uppercase rounded-full bg-purple hover:bg-purple"
      >
        Save
      </button>
      <button
        v-else
        @click="editForm"
        class="block w-4/6 p-4 m-auto font-semibold text-white uppercase rounded-full bg-purple hover:bg-purple"
      >
        Edit
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  contactId: Number,
  contactInfo: Object,
});
import { reactive } from "vue";

const { setId } = useContactStore();

const state = reactive({
  showForm: false,
});

const editForm = () => {
  state.showForm = true;
};
const updateUser = () => {
  setId(props.contactId);

  // state.showForm = false;
};
</script>