<!-- src/views/ShiftRequestPage.vue -->
<template>
    <div>
        <ShiftRequestForm />
    </div>
  </template>
  
  <script>
  import ShiftRequestForm from '@/components/ShiftRequestForm.vue';
  export default {
    name: "ShiftRequestsPage",
    components: {
      ShiftRequestForm,
    },
  };
  </script>