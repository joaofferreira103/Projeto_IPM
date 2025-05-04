<template>
  <div class="pagina-inicial">
    <Header :is-logged-in="false" />
    <div class="overlap-group-wrapper">
      <div class="overlap-group">
        <img class="backgorund" alt="Background" :src="backgorund" />
        <div class="div" />
        <img class="icon" alt="Icon_person" :src="icon_person" />
        <div class="text-wrapper-3">Iniciar sessão</div>
        <div class="rectangle-2" />
        <div class="text-wrapper-4">Desenvolvido pelos brabos ®</div>
        <div class="selection-container">
          <div class="teacher-card" @click="goToTeacherLogin">
            <img class="edicao-de-imagem" alt="Icon Teacher" :src="icon_teacher" />
            <div class="text-wrapper-6">Sou Docente</div>
          </div>
          <div class="student-card" @click="goToStudentLogin">
            <img class="img" alt="Icon Student" :src="icon_student" />
            <div class="text-wrapper-5">Sou Estudante</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent.vue";


export default {
  name: "PaginaInicial",
  components: {
    Header: HeaderComponent, // Reutilizando o HeaderComponent
  },
  data() {
    return {
      backgorund: new URL("@/assets/images/background.png", import.meta.url).href,
      swap_logo: new URL("@/assets/images/icon_swap.png", import.meta.url).href,
      icon_person: new URL("@/assets/images/icon_person.png", import.meta.url).href,
      icon_teacher: new URL("@/assets/images/icon_teacher.png", import.meta.url).href,
      icon_student: new URL("@/assets/images/icon_student.png", import.meta.url).href,
    };
  },
  methods: {
    goToStudentLogin() {
      this.$router.push("/student-login");
    },
    goToTeacherLogin() {
      this.$router.push("/teacher-login");
    },
  },
};
</script>

<style scoped>
/* O estilo permanece o mesmo */
.pagina-inicial {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.pagina-inicial .overlap-group-wrapper {
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.pagina-inicial .overlap-group {
  height: 100%;
  position: relative;
}

.pagina-inicial .backgorund {
  height: 92.77vh;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 7.32vh;
  width: 100%;
}

.pagina-inicial .rectangle {
  background-color: #a37caf;
  height: 8.69vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.pagina-inicial .swap_logo {
  height: 6.35vh;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0.98vh;
  width: 209px;
}

.pagina-inicial .div {
  background-color: #d4b1df;
  border-radius: 30px;
  height: 58.59vh;
  left: 22.22%;
  position: absolute;
  top: 20.70vh;
  width: 55.56%;
}

.pagina-inicial .icon {
  height: 10vh;
  left: 50%;
  transform: translateX(-50%);
  object-fit: contain; /* Alterado de "cover" para "contain" */
  position: absolute;
  top: 24vh; /* Você pode ajustar este valor se necessário */
  width: 10vw;
}
.pagina-inicial .text-wrapper {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 30px;
  font-weight: 400;
  left: 82.50%;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 2.34vh;
  width: 99px;
  text-decoration: none;
}

.pagina-inicial .text-wrapper-2 {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 30px;
  font-weight: 400;
  left: 89.17%;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 2.34vh;
  width: 127px;
  text-decoration: none;
}

.pagina-inicial .text-wrapper-3 {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 45px;
  font-weight: 400;
  left: 20.14%;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 34.67vh;
  width: 59.72%;
}

.pagina-inicial .rectangle-2 {
  background-color: #e9e4eb;
  height: 8.69vh;
  left: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.pagina-inicial .text-wrapper-4 {
  color: #3a2658;
  font-family: "Inter-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  left: 33.47%;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  bottom: 2.54vh;
  width: 33.06%;
}

.pagina-inicial .selection-container {
  display: flex;
  justify-content: center;
  gap: 32px;
  position: absolute;
  top: 43.16vh;
  left: 22.22%;
  width: 55.56%;
}
.pagina-inicial .teacher-card .edicao-de-imagem,
.pagina-inicial .student-card .img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  display: block;
  margin: 20px auto 0;
  padding: 10px;
  box-sizing: border-box;
}


.pagina-inicial .student-card,
.pagina-inicial .teacher-card {
  background-color: #ffffff;
  border-radius: 20px;
  height: 32.52vh;
  width: 40%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
   
}


.pagina-inicial .text-wrapper-5,
.pagina-inicial .text-wrapper-6 {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 45px;
  font-weight: 400;
  letter-spacing: -1.35px;
  line-height: normal;
  text-align: center;
  position: absolute;
  bottom: 1.95vh;
  width: 100%;
}
</style>