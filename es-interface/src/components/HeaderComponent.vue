<template>
  <div class="header">
    <img class="logo" alt="SWAP Logo" src="@/assets/images/icon_swap.png" />
    <div class="header-right">
      <router-link to="/login" class="logout-button" @click="logout">Sair</router-link>
      <div class="user-name">José</div>
      <div class="user-circle"></div>
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
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #a37caf;
  height: 8.69vh; /* 89px / 1024 * 100 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed; /* Fixa o cabeçalho no topo */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Garante que o cabeçalho fique acima de outros elementos */
}

.logo {
  height: 6.35vh; /* 65px / 1024 * 100 */
  width: auto;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-button {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  padding: 5px 10px;
  background-color: #ffffff;
  border-radius: 10px;
}

.user-name {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
}

.user-circle {
  height: 6.84vh; /* 70px / 1024 * 100 */
  width: 6.84vh; /* 70px / 1024 * 100 */
  background-color: #ffffff;
  border-radius: 50%;
  background-image: url('@/assets/images/image.png');
  background-size: cover;
  background-position: center;
}
</style>