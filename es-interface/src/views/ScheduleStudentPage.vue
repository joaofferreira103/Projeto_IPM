<!-- src/views/ScheduleStudentPage.vue -->
<template>
    <div>
      <HorariosAluno />
    </div>
  </template>
  
  <script>
  import HorariosAluno from '@/components/HorariosAluno.vue';

  export default {
    name: "ScheduleStudentPage",
    components: {
      HorariosAluno,
    }
  };
  </script>