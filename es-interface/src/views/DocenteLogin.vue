<!-- src/views/DocenteLogin.vue -->
<template>
    <div>
      <TeacherLogin />
    </div>
  </template>

  <script>
  import TeacherLogin from "@/components/TeacherLogin.vue";

  
  export default {
    name: "DocenteLogin",
    components: {
      TeacherLogin,

    },
  };
  </script>