<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";
import * as Yup from "yup";

const { contactInfo } = storeToRefs(useContactStore());

const props = defineProps([
  "hasPlaces",
  "type",
  "value",
  "name",
  "label",
  "successMessage",
  "placeholder",
]);

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
const { resetField } = useField("address", Yup.string());
import { onMounted, ref, defineProps } from "vue";

const placesRef = ref(null);
const placesAutocomplete = ref(null);

const initPlacesAutocomplete = () => {
  placesAutocomplete.value = new google.maps.places.Autocomplete(
    placesRef.value,
    {
      types: ["geocode"],
    }
  );
  placesAutocomplete.value.addListener("place_changed", () => {
    const place = placesAutocomplete.value.getPlace();
    contactInfo.address = place.formatted_address;
    resetField({
      value: place.formatted_address,
    });
  });
};
onMounted(() => {
  // Wait for Google Maps API to load
  if (window.google) {
    initPlacesAutocomplete();
  } else {
    console.error("Google Maps API not loaded.");
  }
});
</script>

<template>
  <div
    class="textInput"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label class="mb-2 text-xl font-bold" :for="name">{{ label }}</label>
    <input
      :ref="props.hasPlaces ? 'placesRef' : ''"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<style>
.textInput {
  position: relative;
  margin-bottom: calc(1em * 1.5);
  width: 100%;
}

label {
  display: block;
  margin-bottom: 4px;
  width: 100%;
}

input {
  border-radius: 5px;
  padding: 15px 10px;
  outline: none;
  background-color: #f2f5f7;
  width: 100%;
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

input:focus {
  border-color: var(--primary-color);
}

.help-message {
  position: absolute;
  bottom: calc(-1.5 * 1em);
  left: 0;
  margin: 0;
  font-size: 14px;
}

.textInput.has-error input {
  @apply bg-red-100;
}

.textInput.has-error input:focus {
  @apply text-red-400;
}

.textInput.has-error .help-message {
  @apply text-red-400 text-xs;
}

.textInput input,
.textInput.success input {
  @apply bg-pink;
}
</style>
<style >
.pac-container {
}
</style>
