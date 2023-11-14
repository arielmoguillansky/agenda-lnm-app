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
        <div>
          <h2 class="text-2xl font-bold">Add new contact</h2>
        </div>
      </div>
    </div>
    <form class="mt-10" @submit="onSubmit">
      <div>
        <TextInput name="name" type="text" label="Name" placeholder="John" />
      </div>
      <div>
        <TextInput name="lastname" type="text" label="Name" placeholder="Doe" />
      </div>
      <div>
        <TextInput
          name="title"
          type="text"
          label="Title"
          placeholder="Designer"
        />
      </div>
      <!-- <div>
          <TextInput name="avatar" type="avatar" label="Profile picture" />
        </div> -->
      <div>
        <TextInput hasPlaces name="address" type="text" label="Address" />
      </div>
      <div>
        <TextInput name="phone" type="text" label="Phone" />
      </div>
      <div>
        <TextInput
          name="email"
          type="email"
          label="Email"
          placeholder="john@doe.com"
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
</template>
<script setup>
import { reactive } from "vue";
import { useModalStore } from "~/stores/modal";
import { useContactStore } from "~/stores/contacts";
import * as Yup from "yup";
const { contactInfo } = storeToRefs(useContactStore());
const { createContact } = useContactStore();
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
  handleCreateContact(values);
});

const state = reactive({});

const handleCreateContact = async (values) => {
  await createContact(contactInfo.value.id, values);
};
</script>