<!-- src/views/SchedulePage.vue -->
<template>
    <div>
        <ScheduleHome />
    </div>
  </template>
  
  <script>
  import ScheduleHome from '@/components/ScheduleHome.vue';
  export default {
    name: "SchedulePage",
    components: {
      ScheduleHome,
    },
  };
  </script>