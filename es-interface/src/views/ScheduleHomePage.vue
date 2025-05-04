<!-- src/views/ScheduleHomePage.vue -->
<template>
  <div>
    <ScheduleOptions />
  </div>
</template>

<script>
import ScheduleOptions from '@/components/ScheduleOptions.vue';
export default {
  name: "ScheduleHomePage",
  components: {
    ScheduleOptions,
  },
};
</script>