<!-- src/views/RequestsPage.vue -->
<template>
    <div>
        <RequestsComponent />
    </div>
  </template>
  
  <script>
  import RequestsComponent from '@/components/RequestsComponent.vue';
  export default {
    name: "RequestsPage",
    components: {
      RequestsComponent,
    },
  };
  </script>