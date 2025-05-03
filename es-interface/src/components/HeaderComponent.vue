<template>
  <div class="header">
    <img
      class="logo"
      alt="SWAP Logo"
      src="@/assets/images/icon_swap.png"
      @click="goToDcLogado"
      style="cursor:pointer"
    />
    <div class="header-right" v-if="isLoggedIn">
      <button class="logout-button" @click="showLogoutOverlay = true">Sair</button>
      <div class="user-name">{{ userName }}</div>
      <div class="user-circle"></div>
    </div>
    <LogoutComponent
      v-if="showLogoutOverlay"
      @confirm="logout"
      @cancel="showLogoutOverlay = false"
    />
  </div>
</template>

<script>
import LogoutComponent from "@/components/LogoutComponent.vue";
import { useDatabaseStore } from "@/store/useDatabaseStore";

export default {
  name: "HeaderComponent",
  components: { LogoutComponent },
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const userStore = useDatabaseStore();

    // Retorna o nome do utilizador da store
    return {
      userName: userStore.user?.name || "Utilizador",
    };
  },
  data() {
    return {
      showLogoutOverlay: false,
    };
  },
  methods: {
    logout() {
      // Limpa o estado do utilizador na store
      const userStore = useDatabaseStore();
      userStore.user = null;

      // Remove o utilizador do localStorage (se necessário)
      localStorage.removeItem("user");

      // Fecha o overlay e redireciona para a página inicial
      this.showLogoutOverlay = false;
      this.$router.push("/");
    },
    goToDcLogado() {
      this.$router.push("/dc-logado");
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
  box-sizing: border-box; /* Inclui padding e border no cálculo da largura */
  z-index: 1000; /* Garante que o cabeçalho fique acima de outros elementos */
}

.logo {
  height: 6.35vh; /* 65px / 1024 * 100 */
  width: auto;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

.logout-button {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  padding: 5px 10px;
  background-color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
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
  background-image: url('@/assets/images/icon_person.png');
  background-size: cover;
  background-position: center;
}
</style>