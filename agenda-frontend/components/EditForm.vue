<template>
  <div
    class="absolute top-0 left-0 w-full h-full p-4 py-10 overflow-y-scroll bg-white"
  >
    <button @click="closeModal" class="flex gap-2 mb-6 text-gray-400">
      <span class="text-gray-400 cursor-pointer material-icons">
        arrow_back
      </span>
      <span>Back</span>
    </button>
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
    <div v-if="state.showForm">
      <form class="mt-10" @submit="onSubmit">
        <div>
          <TextInput
            name="name"
            type="text"
            label="Name"
            placeholder="John"
            :value="contactInfo.name"
          />
        </div>
        <div>
          <TextInput
            name="lastname"
            type="text"
            label="Name"
            placeholder="Doe"
            :value="contactInfo.lastname"
          />
        </div>
        <div>
          <TextInput
            name="title"
            type="text"
            label="Title"
            placeholder="Designer"
            :value="contactInfo.title"
          />
        </div>
        <!-- <div>
          <TextInput name="avatar" type="avatar" label="Profile picture" />
        </div> -->
        <div>
          <TextInput
            hasPlaces
            name="address"
            type="text"
            label="Address"
            :value="contactInfo.address"
          />
        </div>
        <div>
          <TextInput
            name="phone"
            type="text"
            label="Phone"
            :value="contactInfo.phone"
          />
        </div>
        <div>
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="john@doe.com"
            :value="contactInfo.email"
          />
        </div>
        <div class="h-1 text-red-400">
          {{ error }}
        </div>
        <div class="m-auto mt-12">
          <button
            class="block w-4/6 p-4 m-auto font-semibold text-white uppercase rounded-full bg-purple hover:bg-purple shadow-cta"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <div v-else>
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
          @click="editForm"
          class="block w-4/6 p-4 m-auto font-semibold text-white uppercase rounded-full bg-purple hover:bg-purple shadow-cta"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useModalStore } from "~/stores/modal";
import { useContactStore } from "~/stores/contacts";
import * as Yup from "yup";
const { contactInfo } = storeToRefs(useContactStore());
const { updateContact } = useContactStore();
const { closeModal } = useModalStore();

const { handleSubmit, values } = useForm({
  validationSchema: Yup.object({
    name: Yup.string().required(),
    lastname: Yup.string().required(),
    title: Yup.string().required(),
    address: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().email().required(),
  }),
});

const onSubmit = handleSubmit((values) => {
  updateUser(values);
});

const state = reactive({
  showForm: false,
});

const editForm = () => {
  state.showForm = true;
};

const updateUser = async (values) => {
  await updateContact(contactInfo.value.id, values);
  state.showForm = false;
};
</script>