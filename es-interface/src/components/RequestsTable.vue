<template>
    <Card height="auto" width="81.18%" class="requests-container">
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
        <div v-for="(request, index) in requests" :key="index" class="request-row">
        <div class="pessoa-circle-small"></div>
        <div class="text-wrapper-2">{{ request.sender }}</div>
        <div class="text-wrapper-8">{{ request.type }}</div>
        <div class="text-wrapper-10">{{ request.subject }}</div>
        <div class="text-wrapper-12">{{ request.date }}</div>
        <img
          v-if="request.isWarning"
          class="icon-warning"
          alt="Icon warning"
          :src="iconWarning"
        />
        <img
          v-else
          class="img"
          alt="Request image"
          :src="image"
        />
        </div>
        <div class="line"></div>
      </div>
      <router-link to="/pedidos" class="view-all-button">
        <div class="rectangle-2">
          <div class="text-wrapper">Ver todos os pedidos</div>
        </div>
      </router-link>
    </Card>
  </template>
  
  <script>
  import Card from '@/components/CardComponent.vue';
  
  export default {
    name: "RequestsTable",
    components: {
      Card,
    },
    props: {
      iconMail: { type: String, required: true },
      iconWarning: { type: String, required: true },
      image: { type: String, required: true },
      requests: { type: Array, required: true },
    },
  };
  </script>
  
  <style scoped>
  .requests-container {
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .requests-header {
  display: flex;
  align-items: center; /* Alinha verticalmente os itens */
  justify-content: flex-start; /* Alinha os itens à esquerda */
  gap: 10px; /* Espaçamento entre o ícone e o texto */
  margin-bottom: 20px;
  width: 100%; /* Garante que ocupe toda a largura do Card */
}

.icon-mail {
  height: 10.56vh;
  width: auto;
  object-fit: contain;
  margin: 0; /* Remove qualquer margem desnecessária */
}

.text-wrapper-14 {
  color: #3a2658;
  font-family: "Istok Web-Bold", Helvetica;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  margin: 0; /* Remove qualquer margem desnecessária */
}
  
  .requests-table {
    width: 100%;
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
    flex: 1;
  }
  
  .request-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1vh 0;
  }
  
  .pessoa-circle-small {
    height: 5.96vh; /* 61px / 1024 * 100 */
    width: 5.96vh; /* 61px / 1024 * 100 */
    background-color: #ffffff;
    border-radius: 50%;
    flex-shrink: 0;
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
    flex: 1;
  }
  
  .icon-warning,
  .img {
    height: 3.91vh; /* 40px / 1024 * 100 */
    width: auto;
    object-fit: contain;
    flex-shrink: 0;
  }
  
  .line {
    height: 1px;
    width: 100%;
    background-color: #d4b1df;
    margin: 1vh 0;
  }
  
  .view-all-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    text-decoration: none;
  }
  
  .rectangle-2 {
    background-color: #3a2658;
    border-radius: 20px;
    padding: 10px 20px;
  }
  
  .text-wrapper {
    color: #ffffff;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
  }
  </style>