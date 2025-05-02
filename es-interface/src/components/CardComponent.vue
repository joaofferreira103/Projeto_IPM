<template>
    <div class="card-component" :style="{ height: height, width: width }">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "CardComponent",
    props: {
      height: {
        type: String,
        default: "auto",
      },
      width: {
        type: String,
        default: "auto",
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #d4b1df;
    border-radius: 20px;
  }
  </style>