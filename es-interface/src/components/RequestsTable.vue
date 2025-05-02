<template>
    <Card height="41.60vh" width="81.18%" class="requests-container">
      <div class="requests-header">
        <img class="icon-mail" alt="Icon mail" :src="iconMail" />
        <div class="text-wrapper-14">PEDIDOS</div>
      </div>
      <div class="requests-table">
        <div class="line"></div>
        <div class="table-headers">
          <div class="text-wrapper-4">REMETENTE</div>
          <div class="text-wrapper-5">TIPO</div>
          <div class="text-wrapper-6">ASSUNTO</div>
          <div class="text-wrapper-7">DATA</div>
        </div>
        <div class="request-row">
          <div class="pessoa-circle-small"></div>
          <div class="text-wrapper-2">Jorge Macário</div>
          <div class="text-wrapper-8">Docente</div>
          <div class="text-wrapper-10">Alteração de Sala</div>
          <div class="text-wrapper-12">17h</div>
          <img class="icon-warning" alt="Icon warning" :src="iconWarning" />
        </div>
        <div class="line"></div>
        <div class="request-row">
          <div class="pessoa-circle-small"></div>
          <div class="text-wrapper-3">Maria Fernandes</div>
          <div class="text-wrapper-9">Aluno</div>
          <div class="text-wrapper-11">Mudança de Turno</div>
          <div class="text-wrapper-13">1d</div>
          <img class="img" alt="Icon warning" :src="image" />
        </div>
        <div class="line"></div>
      </div>
      <router-link to="/pedidos" class="view-all-button">
        <div class="rectangle-2"></div>
        <div class="text-wrapper">Ver todos os pedidos</div>
      </router-link>
    </Card>
  </template>
  
  <script>
  import Card from '@/components/CardComponent.vue'; // Import the Card component
  
  export default {
    name: "RequestsTable",
    components: {
      Card, // Register the Card component
    },
    props: {
      iconMail: { type: String, required: true },
      iconWarning: { type: String, required: true },
      image: { type: String, required: true },
    },
  };
  </script>
  
  <style scoped>
  .requests-container {
    left: 10.69%; /* 154px / 1440 * 100 */
    position: absolute;
    top: 48.05vh; /* 492px / 1024 * 100 */
  }
  
  .requests-header {
    display: flex;
    align-items: center;
    position: absolute;
    left: 5.13%; /* 60px / 1169px * 100 */
    top: 4.69vh; /* 20px / 426px * 100 */
  }
  
  .icon-mail {
    height: 10.56vh; /* 108px / 1024 * 100 */
    width: 9.24%; /* 108px / 1169px * 100 */
    object-fit: cover;
  }
  
  .text-wrapper-14 {
    color: #3a2658;
    font-family: "Istok Web-Bold", Helvetica;
    font-size: 44px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: normal;
    margin-left: 1rem;
  }
  
  .requests-table {
    position: absolute;
    top: 19.72vh; /* 84px / 426px * 100 */
    left: 2.82%; /* 33px / 1169px * 100 */
    width: 94.10%; /* 1100px / 1169px * 100 */
  }
  
  .table-headers {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1vh;
  }
  
  .text-wrapper-4,
  .text-wrapper-5,
  .text-wrapper-6,
  .text-wrapper-7 {
    color: #3a2658;
    font-family: "Istok Web-Bold", Helvetica;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
    width: 20%;
  }
  
  .request-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1vh 0;
  }
  
  .pessoa-circle-small {
    height: 5.96vh; /* 61px / 1024 * 100 */
    width: 5.23%; /* 61px / 1169px * 100 */
    background-color: #ffffff;
    border-radius: 50%;
  }
  
  .text-wrapper-2,
  .text-wrapper-3,
  .text-wrapper-8,
  .text-wrapper-9,
  .text-wrapper-10,
  .text-wrapper-11,
  .text-wrapper-12,
  .text-wrapper-13 {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
    width: 20%;
  }
  
  .icon-warning,
  .img {
    height: 3.91vh; /* 40px / 1024 * 100 */
    width: 3.42%; /* 40px / 1169px * 100 */
    object-fit: cover;
  }
  
  .line {
    height: 1px;
    width: 100%;
    background-color: #d4b1df; /* Card color */
    margin: 1vh 0;
  }
  
  .view-all-button {
    position: absolute;
    bottom: 4.69vh; /* 20px / 426px * 100 */
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;
  }
  
  .rectangle-2 {
    background-color: #3a2658;
    border-radius: 20px;
    height: 3.91vh; /* 40px / 1024 * 100 */
    width: 15.42vw; /* 222px / 1440 * 100 */
  }
  
  .text-wrapper {
    color: #ffffff;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  </style>