<!-- src/views/OptionsPage.vue -->
<template>
    <div>
        <OptionsComponent />        
    </div>
  </template>
  
  <script>

import OptionsComponent from "@/components/OptionsComponent.vue"; // Import the OptionsComponent
  export default {
    name: "OptionsPage", 
    components: {
      OptionsComponent, 
    },
    
  }
  
  </script>