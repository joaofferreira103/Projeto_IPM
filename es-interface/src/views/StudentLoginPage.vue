<!-- src/views/StudentLoginPage.vue -->
<template>
    <div>
      <StudentLogin />
    </div>
  </template>
  
  <script>
  import StudentLogin from "@/components/StudentLogin.vue";


  export default {
    name: "StudentLoginPage",
    components: {
      StudentLogin,
    },
  };
  </script>