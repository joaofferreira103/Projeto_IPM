<!-- src/views/CourseDetailsPage.vue -->
<template>
    <div>
      <CourseDetails />
    </div>
  </template>
  
  <script>
  import CourseDetails from "@/components/CourseDetails.vue";
  
  export default {
    name: "CourseDetailsPage", 
    components: {
      CourseDetails,
    },
  };
  </script>