<!-- src/views/Home.vue -->
<template>
  <div>
    <PaginaInicial />
  </div>
</template>

<script>
import PaginaInicial from "@/components/PaginaInicial.vue";

export default {
  name: "HomePage", // Changed from "Home"
  components: {
    PaginaInicial,
  },
};
</script>