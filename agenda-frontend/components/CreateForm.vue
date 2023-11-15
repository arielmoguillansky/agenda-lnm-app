<template>
  <div
    class="absolute top-0 left-0 w-full h-full p-4 py-10 overflow-y-auto bg-white"
  >
    <button @click="closeModal" class="flex gap-2 mb-6 text-gray-400">
      <span class="text-gray-400 cursor-pointer material-icons">
        arrow_back
      </span>
      <span>Back</span>
    </button>
    <div class="m-auto lg:max-w-3xl">
      <div class="flex gap-3">
        <div>
          <h2 class="text-2xl font-bold">Add new contact</h2>
        </div>
      </div>
    </div>
    <form class="m-auto mt-10 lg:max-w-3xl" @submit="onSubmit">
      <div>
        <TextInput name="name" type="text" label="Name" placeholder="John" />
      </div>
      <div>
        <TextInput
          name="lastname"
          type="text"
          label="Last name"
          placeholder="Doe"
        />
      </div>
      <div>
        <TextInput
          name="title"
          type="text"
          label="Title"
          placeholder="Designer"
        />
      </div>
      <div>
        <div class="textInput">
          <label class="h-full mb-2 text-xl font-bold" for="avatar">
            Avatar
            <div
              class="relative flex w-full cursor-pointer bg-pink h-[54px]"
              @click="openFileSelector"
            >
              <span class="font-normal text-md" v-if="selectedFileName">
                {{ selectedFileName }}
              </span>
              <span
                class="absolute right-4 translate-y-[65%] flex items-center text-gray-400 cursor-pointer material-icons"
              >
                upload
              </span>
              <input
                ref="fileInputRef"
                name="avatar"
                type="file"
                @change="handleChange"
                class="hidden w-full h-[50px]"
              />
            </div>
          </label>
        </div>
      </div>
      <div>
        <TextInput
          :hasPlaces="true"
          name="address"
          type="text"
          label="Address"
          placeholder="272 5th street"
        />
      </div>
      <div>
        <TextInput
          name="phone"
          type="text"
          label="Phone"
          placeholder="(54) 11503098"
        />
      </div>
      <div>
        <TextInput
          name="email"
          type="email"
          label="Email"
          placeholder="john@doe.com"
        />
      </div>
      <div>
        <TextInput name="password" type="password" label="Password" />
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
import { ref } from "vue";
import { useModalStore } from "~/stores/modal";
import { useContactStore } from "~/stores/contacts";
import * as Yup from "yup";

const { createContact } = useContactStore();
const { closeModal } = useModalStore();
const selectedFileName = ref("");
const fileInputRef = ref(null);

let formData = new FormData();

const { handleSubmit, values } = useForm({
  validationSchema: Yup.object({
    name: Yup.string().required(),
    lastname: Yup.string().required(),
    title: Yup.string().required(),
    address: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  }),
});

const onSubmit = handleSubmit((values) => {
  handleCreateContact(values);
});

const openFileSelector = () => {
  fileInputRef.value.click();
};

const handleChange = (e) => {
  const selectedFile = e.target.files[0];
  selectedFileName.value = selectedFile.name;
  formData.append("avatar", selectedFile);
};

const handleCreateContact = async (values) => {
  const formdata = {
    email: values.email,
    name: values.name,
    lastname: values.lastname,
    phone: values.phone,
    address: values.address,
    title: values.title,
    password: values.password,
  };

  for (const item in formdata) {
    formData.append(item, formdata[item]);
  }

  await createContact(formData);
};
</script>