<template>
  <div class="requests-bg">
    <Header :is-logged-in="true" />
    <div class="requests-content">
      <div class="requests-card">
        <div class="requests-title">
          <img class="icon-mail" :src="require('@/assets/images/icon_mail.png')" alt="icon mail" />
          <span>Pedidos</span>
        </div>
        <div class="requests-divider"></div>
        <div class="requests-table">
          <div class="requests-table-header">
            <div>REMETENTE</div>
            <div>TIPO</div>
            <div>ASSUNTO</div>
            <div>DATA</div>
            <div></div>
          </div>
          <div
            v-for="(pedido, idx) in pedidos"
            :key="idx"
            class="requests-table-row"
            :class="{ 'requests-table-row--inactive': pedido.estado === 'concluido' }"
            @click="goToPedidoDetalhe(pedido)"
            style="cursor:pointer"
          >
            <div class="remetente-cell">
              <img class="remetente-img" :src="pedido.foto" alt="remetente" />
              <span>{{ pedido.nome }}</span>
            </div>
            <div>{{ pedido.tipo }}</div>
            <div>{{ pedido.assunto }}</div>
            <div>{{ pedido.data }}</div>
            <div>
              <img
                v-if="pedido.estado === 'pendente'"
                class="icon-status"
                :src="require('@/assets/images/icon_warning.png')"
                alt="pendente"
              />
              <img
                v-else
                class="icon-status"
                :src="require('@/assets/images/icon_done.png')"
                alt="concluido"
              />
            </div>
          </div>
          <div v-if="pedidos.length === 0" class="no-requests">
            Nenhum pedido encontrado.
          </div>
        </div>
        <div class="ver-anteriores-wrapper">
          <button class="ver-anteriores-btn" disabled>Ver pedidos anteriores</button>
        </div>
      </div>
      <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import { useDatabaseStore } from "@/store/useDatabaseStore";

export default {
  name: "RequestsComponent",
  components: { Header },
  setup() {
    const databaseStore = useDatabaseStore();
    
    // Ensure database is loaded
    if (!databaseStore.students.length || !databaseStore.teachers.length) {
      databaseStore.loadDatabase();
    }
    
    // Fetch requests using filterRequests
    const requests = databaseStore.filterRequests();
    
    // Map requests to the format expected by the component
    const pedidos = requests.map((request) => ({
      nome: request.sender,
      tipo: request.type === "Troca de Turno" ? "Aluno" : "Docente",
      assunto: request.subject,
      data: request.date,
      estado: request.isWarning ? "pendente" : "concluido",
      foto: require("@/assets/images/icon_person.png"), // Use dynamic photo if available
    }));
    
    console.log("Pedidos:", pedidos);
    
    return {
      pedidos,
    };
  },
  methods: {
    goToPedidoDetalhe(pedido) {
      // Uncomment and implement when PedidoDetalhe route is ready
      // this.$router.push({ name: "PedidoDetalhe", params: { nome: pedido.nome } });
      console.log("Navigating to PedidoDetalhe for:", pedido);
    },
  },
};
</script>

<style scoped>
.requests-bg {
  min-height: 100vh;
  background: url('@/assets/images/background.png') no-repeat center center fixed;
  background-size: cover;
  padding-top: 8.69vh;
  overflow: hidden;
}

.requests-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.requests-card {
  background: #d4b1df;
  border-radius: 24px;
  padding: 32px 36px;
  box-sizing: border-box;
  margin-bottom: 0;
}

.requests-title {
  display: flex;
  align-items: center;
  font-size: 2.7rem;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-weight: 400;
  gap: 14px;
}

.icon-mail {
  width: 54px;
  height: 54px;
  object-fit: contain;
}

.requests-divider {
  border-bottom: 2px solid #3a2658;
  margin: 8px 0 18px 0;
}

.requests-table {
  width: 100%;
}

.requests-table-header,
.requests-table-row {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  padding: 8px 0;
}

.requests-table-header {
  font-weight: 700;
  border-bottom: 1.5px solid #3a2658;
}

.requests-table-row {
  font-weight: 400;
  border-bottom: 1px solid #bfa6d6;
  transition: background 0.15s;
}

.requests-table-row:last-child {
  border-bottom: none;
}

.requests-table-row--inactive {
  opacity: 0.5;
  cursor: default;
}

.requests-table-header > div,
.requests-table-row > div {
  flex: 1;
  text-align: left;
  padding-right: 12px;
  display: flex;
  align-items: center;
}

.remetente-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
}

.remetente-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  border: 2px solid #bfa6d6;
}

.icon-status {
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-left: 8px;
}

.ver-anteriores-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.ver-anteriores-btn {
  background: #3a2658;
  color: #fff;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 1.1rem;
  border: none;
  border-radius: 20px;
  padding: 8px 28px;
  cursor: not-allowed;
  opacity: 0.9;
}

.voltar {
  position: fixed;
  right: 40px;
  bottom: 40px;
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

.no-requests {
  text-align: center;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 1.5rem;
  margin: 20px 0;
}
</style>