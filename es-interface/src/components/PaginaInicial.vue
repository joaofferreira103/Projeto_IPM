<template>
    <div class="pagina-inicial">
      <div class="overlap-group-wrapper">
        <div class="overlap-group">
          <img class="backgorund" alt="Background" :src="backgorund" />
          <div class="rectangle" />
          <img class="swap_logo" alt="Swap_logo" :src="swap_logo" />
          <div class="div" />
          <img class="icon_person" alt="Icon_person" :src="icon_person" />
          <router-link to="/login" class="text-wrapper">Login</router-link>
          <router-link to="/register" class="text-wrapper-2">Registar</router-link>
          <div class="text-wrapper-3">Iniciar sessão</div>
          <div class="rectangle-2" />
          <div class="text-wrapper-4">Desenvolvido pelos brabos ®</div>
          <div class="selection-container">
            <div class="student-card" @click="goToStudentLogin">
                <img class="icon_teacher" alt="Icon Teacher" :src="icon_teacher" />
              <div class="text-wrapper-6">Sou Estudante</div>
            </div>
            <div class="teacher-card" @click="goToTeacherLogin">
                <img class="icon_student" alt="Icon Student" :src="icon_student" />
              <div class="text-wrapper-5">Sou Docente</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PaginaInicial",
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
  .pagina-inicial {
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .pagina-inicial .overlap-group-wrapper {
    background-color: #ffffff;
    height: 1024px;
    width: 1440px;
  }
  
  .pagina-inicial .overlap-group {
    height: 1024px;
    position: relative;
  }
  
  .pagina-inicial .backgorund {
    height: 949px;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 75px;
    width: 1440px;
  }
  
  .pagina-inicial .rectangle {
    background-color: #a37caf;
    height: 89px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1440px;
  }
  
  .pagina-inicial .ewywcq {
    height: 65px;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 10px;
    width: 209px;
  }
  
  .pagina-inicial .div {
    background-color: #d4b1df;
    border-radius: 30px;
    height: 600px;
    left: 320px;
    position: absolute;
    top: 212px;
    width: 800px;
  }
  
  .pagina-inicial .imageedit {
    height: 119px;
    left: 660px;
    object-fit: cover;
    position: absolute;
    top: 250px;
    width: 119px;
  }
  
  .pagina-inicial .text-wrapper {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 30px;
    font-weight: 400;
    left: 1188px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 24px;
    width: 99px;
    text-decoration: none;
  }
  
  .pagina-inicial .text-wrapper-2 {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 30px;
    font-weight: 400;
    left: 1284px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 24px;
    width: 127px;
    text-decoration: none;
  }
  
  .pagina-inicial .text-wrapper-3 {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 45px;
    font-weight: 400;
    left: 290px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 355px;
    width: 860px;
  }
  
  .pagina-inicial .rectangle-2 {
    background-color: #e9e4eb;
    height: 89px;
    left: 0;
    position: absolute;
    top: 935px;
    width: 1440px;
  }
  
  .pagina-inicial .text-wrapper-4 {
    color: #3a2658;
    font-family: "Inter-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    left: 482px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 961px;
    width: 476px;
  }
  
  .pagina-inicial .selection-container {
    display: flex;
    justify-content: center;
    gap: 32px;
    position: absolute;
    top: 442px;
    left: 320px;
    width: 800px;
  }
  
  .pagina-inicial .student-card,
  .pagina-inicial .teacher-card {
    background-color: #ffffff;
    border-radius: 20px;
    height: 333px;
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .pagina-inicial .edicao-de-imagem {
    height: 216px;
    width: 216px;
    object-fit: cover;
  }
  
  .pagina-inicial .img {
    height: 216px;
    width: 216px;
    object-fit: cover;
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
    margin-top: 10px;
  }
  </style>