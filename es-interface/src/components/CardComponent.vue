<template>
  <div class="card" :style="{ height: height, width: width }">
    <div class="card-content">
      <slot></slot>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  min-height: 0; /* Garante que a altura mínima seja respeitada */
  overflow: hidden; /* Impede que o conteúdo exceda os limites */
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* Garante que o conteúdo ocupe toda a altura do cartão */
  width: 100%;
}

.card img {
  max-height: 50%; /* Limita a altura da imagem para não dominar o cartão */
  width: auto;
  object-fit: contain;
}

.card p,
.card div {
  margin: 0;
  text-align: center;
  word-wrap: break-word; /* Garante que o texto quebre corretamente */
}
</style>