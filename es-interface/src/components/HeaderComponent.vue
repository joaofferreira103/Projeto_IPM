<template>
    <div class="header-component">
      <img class="icon-swap" alt="Icon swap" :src="iconSwap" />
      <div class="header-right">
        <router-link to="/login" class="text-wrapper-15" @click="logout">Sair</router-link>
        <div class="text-wrapper-16">José</div>
        <div class="pessoa-circle"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeaderComponent",
    props: {
      iconSwap: {
        type: String,
        required: true,
      },
    },
    methods: {
      logout() {
        localStorage.removeItem('user');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    position: relative;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0.98vh; /* 10px / 1024 * 100 */
    gap: 1rem;
  }
  </style>