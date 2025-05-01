<template>
    <div class="dc-pagina-inicial">
      <div class="overlap-wrapper">
        <div class="overlap-2">
          <img class="background" alt="Background" :src="backgroundImg" />
          <div class="text-wrapper-3">Voltar</div>
          <div class="rectangle-2" />
          <img class="icon_swap" alt="Logo" :src="logoImg" />
          <div class="rectangle-3" />
          <img class="icon_teacher" alt="Profile icon" :src="profileIcon" />
          <div class="text-wrapper-4">Palavra-passe:</div>
          <input class="retangulo-pass" type="password" v-model="password" placeholder="Insira a palavra-passe" />
          <div class="text-wrapper-5">Login</div>
          <div class="text-wrapper-6">Registar</div>
          <div class="text-wrapper-7">Utilizador:</div>
          <input class="retangulo-user" type="text" v-model="username" placeholder="Insira o utilizador" />
          <div class="text-wrapper-8">Iniciar sessão</div>
          <div class="rectangle-4" />
          <div class="text-wrapper-9">Esqueci-me da palavra-passe</div>
          <div class="text-wrapper-10">Desenvolvido pelos brabos ®</div>
          <button class="boto-login" @click="handleLogin">Iniciar Sessão</button>
          <div class="rectangle-5" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import backgroundImg from '@/assets/images/background.png';
  import profileIcon from '@/assets/images/icon_teacher.png';
  import logoImg from '@/assets/images/icon_swap.png';
  
  export default {
    name: 'TeacherLogin',
    data() {
      return {
        backgroundImg,
        profileIcon,
        logoImg,
        username: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        // Add login logic here (e.g., API call)
        console.log('Login attempted with:', this.username, this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  .dc-pagina-inicial {
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .dc-pagina-inicial .overlap-wrapper {
    background-color: #ffffff;
    height: 1024px;
    width: 1440px;
  }
  
  .dc-pagina-inicial .overlap-2 {
    height: 1024px;
    position: relative;
  }
  
  .dc-pagina-inicial .background {
    height: 949px;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 75px;
    width: 1440px;
  }
  
  .dc-pagina-inicial .text-wrapper-3 {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 30px;
    font-weight: 400;
    left: 1282px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 863px;
    width: 114px;
  }
  
  .dc-pagina-inicial .rectangle-2 {
    background-color: #a37caf;
    height: 89px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1440px;
  }
  
  .dc-pagina-inicial .icon_swap {
    height: 65px;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 10px;
    width: 209px;
  }
  
  .dc-pagina-inicial .rectangle-3 {
    background-color: #d4b1df;
    border-radius: 30px;
    height: 600px;
    left: 320px;
    position: absolute;
    top: 212px;
    width: 800px;
  }
  
  .dc-pagina-inicial .icon_teacher {
    height: 81px;
    left: 675px;
    object-fit: cover;
    position: absolute;
    top: 268px;
    width: 81px;
  }
  
  .dc-pagina-inicial .text-wrapper-4 {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 30px;
    font-weight: 400;
    left: 415px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 553px;
    width: 500px;
    text-align: left;
  }
  
  .dc-pagina-inicial .retangulo-pass {
    background-color: #ffffff;
    border-radius: 20px;
    height: 56px;
    left: 415px;
    position: absolute;
    top: 599px;
    width: 609px;
    padding: 0 10px;
    border: 1px solid #3a2658;
  }
  
  .dc-pagina-inicial .text-wrapper-5 {
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
  }
  
  .dc-pagina-inicial .text-wrapper-6 {
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
  }
  
  .dc-pagina-inicial .text-wrapper-7 {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 30px;
    font-weight: 400;
    left: 415px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 425px;
    width: 200px;
    text-align: left;
  }
  
  .dc-pagina-inicial .retangulo-user {
    background-color: #ffffff;
    border-radius: 20px;
    height: 56px;
    left: 415px;
    position: absolute;
    top: 476px;
    width: 609px;
    padding: 0 10px;
    border: 1px solid #3a2658;
  }
  
  .dc-pagina-inicial .text-wrapper-8 {
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
  
  .dc-pagina-inicial .rectangle-4 {
    background-color: #e9e4eb;
    height: 89px;
    left: 0;
    position: absolute;
    top: 935px;
    width: 1440px;
  }
  
  .dc-pagina-inicial .text-wrapper-9 {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 25px;
    font-weight: 400;
    height: 32px;
    left: 684px;
    letter-spacing: -0.75px;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 715px;
    width: 367px;
  }
  
  .dc-pagina-inicial .text-wrapper-10 {
    color: #3a2658;
    font-family: "Inter-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    height: 36px;
    left: 482px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 961px;
    width: 476px;
  }
  
  .dc-pagina-inicial .boto-login {
    background-color: #3a2658;
    color: #ffffff;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    border-radius: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    width: 200px;
    height: 50px;
    text-align: center;
    left: 415px;
    position: absolute;
    top: 702px;
  }
  
  .dc-pagina-inicial .boto-login:hover {
    background-color: #a37caf;
  }
  
  .dc-pagina-inicial .rectangle-5 {
    border: 5px solid;
    border-color: #3a2658;
    border-radius: 100px;
    height: 118px;
    left: 661px;
    position: absolute;
    top: 243px;
    width: 118px;
  }
  </style>