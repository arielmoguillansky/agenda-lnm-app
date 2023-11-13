<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/stores/auth"; // import the auth store we just created
const route = useRoute();
let search = ref("");
const { contacts } = storeToRefs(useContactStore());

function filteredList() {
  return fruits.filter((fruit) =>
    fruit.toLowerCase().includes(input.value.toLowerCase())
  );
}
</script>
