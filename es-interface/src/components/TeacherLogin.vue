<template>
  <div class="dc-pagina-inicial">
    <Header :is-logged-in="false" />
    <div class="overlap-wrapper">
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="login-header">
          <img class="icon_teacher" alt="Profile icon" :src="profileIcon" />
          <div class="login-title">Iniciar sessão</div>
        </div>
        <label class="form-label" for="username">Utilizador:</label>
        <input
          id="username"
          class="retangulo-user"
          type="text"
          v-model="username"
          placeholder="Insira o utilizador"
          autocomplete="username"
        />
        <label class="form-label" for="password">Palavra-passe:</label>
        <input
          id="password"
          class="retangulo-pass"
          type="password"
          v-model="password"
          placeholder="Insira a palavra-passe"
          autocomplete="current-password"
        />
        <div class="login-actions">
          <button class="boto-login" type="submit">Entrar</button>
          <button class="boto-clear" type="button" @click="clearForm">Limpar</button>
          <span class="forgot-password">Esqueci-me da palavra-passe</span>
        </div>
      </form>
    </div>
    <div class="voltar"><a href="#" @click.prevent="goBack">Voltar</a></div>
    <footer class="footer">
      <div class="footer-text">Desenvolvido pelos brabos ®</div>
    </footer>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import profileIcon from "@/assets/images/icon_teacher.png";
import { useDatabaseStore } from "@/store/useDatabaseStore";

export default {
  name: "TeacherLogin",
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      profileIcon,
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      const databaseStore = useDatabaseStore();

      // Certifique-se de que os dados foram carregados na store
      if (!databaseStore.teachers || databaseStore.teachers.length === 0) {
        databaseStore.loadDatabase();
      }

       // Verifica se o utilizador é um professor
       const teacher = databaseStore.teachers.find(
        (t) => t.email === this.username.trim() && t.password === this.password.trim()
      );

      // Verifica se o utilizador é o diretor
      const director = databaseStore.directors.find((d) => d.email === this.username.trim());
      const isDirector = director && director.password === this.password.trim();

      if (teacher) {
        // Define o utilizador como professor na store
        databaseStore.user = { name: teacher.name, role: "teacher", id: teacher.id };

        alert(`Bem-vindo, ${teacher.name}`);
        this.$router.push("/dc-logado");
      } else if (isDirector) {
        // Define o utilizador como diretor na store
        databaseStore.user = { name: director.name, role: "director", id: director.id };

        alert(`Bem-vindo, ${director.name}`);
        this.$router.push("/dc-logado");
      } else {
        alert("Credenciais inválidas. Por favor, tente novamente.");
      }
    },
    clearForm() {
      this.username = "";
      this.password = "";
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.dc-pagina-inicial {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('@/assets/images/background.png') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.overlap-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login-form {
  background-color: #d4b1df;
  border-radius: 30px;
  padding: 40px 50px 32px 50px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.icon_teacher {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 8px;
}

.login-title {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 38px;
  font-weight: 400;
  text-align: center;
}

.form-label {
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 20px;
  color: #3a2658;
  margin-bottom: 2px;
  margin-top: 8px;
  text-align: left;
  width: 100%;
  display: block;
}

.retangulo-user,
.retangulo-pass {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 16px;
  padding: 0 15px;
  font-size: 18px;
  font-family: "Istok Web-Regular", Helvetica;
  color: #3a2658;
  background: #fff;
  margin-bottom: 0;
  box-sizing: border-box;
}

.login-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.boto-login {
  background-color: #3a2658;
  color: #fff;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  padding: 8px 28px;
  cursor: pointer;
  transition: background 0.2s;
}

.boto-login:hover {
  background-color: #5a3b7a;
}

.boto-clear {
  background-color: #fff;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  padding: 8px 22px;
  cursor: pointer;
  border: 2px solid #3a2658;
  transition: background 0.2s, color 0.2s;
}

.boto-clear:hover {
  background-color: #f3eaf7;
}

.forgot-password {
  margin-left: auto;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 16px;
  text-decoration: none;
  cursor: default;
  transition: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.footer {
  background-color: #e9e4eb;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}

.footer-text {
  font-family: "Inter-Regular", Helvetica;
  font-size: 18px;
  color: #3a2658;
  text-align: center;
}

.voltar {
  position: fixed;
  right: 40px;
  bottom: 70px;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 22px;
  color: #3a2658;
  z-index: 11;
}

.voltar a {
  color: #3a2658;
  text-decoration: none;
  transition: text-decoration 0.2s;
}

.voltar a:hover {
  text-decoration: underline;
}
</style>