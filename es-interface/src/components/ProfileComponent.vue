<template>
  <div class="options-bg">
    <Header :is-logged-in="true" />
    <div class="options-content">
      <!-- Card Perfil -->
      <div class="profile-card">
        <div class="profile-info">
          <div class="profile-title">
            <img class="icon-profile" :src="require('@/assets/images/icon_person.png')" alt="icon person" />
            <span>Perfil/Profile</span>
          </div>
          <div class="profile-details">
            <div class="profile-detail"><b>Nome:</b> José</div>
            <div class="profile-detail"><b>Idade:</b> 35 anos</div>
            <div class="profile-detail"><b>Profissão:</b> Docente do ensino superior; diretor de curso</div>
            <div class="profile-detail"><b>Localização:</b> Braga</div>
            <div class="profile-detail"><b>Educação:</b> Doutoramento em informática</div>
            <div class="profile-detail"><b>Interesses:</b> Automóveis, futebol, séries</div>
          </div>
        </div>
        <div class="profile-photo-area">
          <img class="profile-photo" :src="require('@/assets/images/icon_person.png')" alt="foto perfil" />
          <img class="icon-edit" :src="require('@/assets/images/icon_edit.png')" alt="editar perfil" />
        </div>
      </div>

      <!-- Card Documentos -->
      <div class="documents-card">
        <div class="documents-header">
          <div class="documents-title">
            <img class="icon-documents" :src="require('@/assets/images/icon_documents.png')" alt="icon documents" />
            <span>Documentos/Documents</span>
          </div>
          <div class="icon-add-wrapper">
            <img class="icon-add" :src="require('@/assets/images/icon_add.png')" alt="adicionar documento" />
          </div>
        </div>
        <div class="documents-table">
          <div class="documents-table-header">
            <div>Data</div>
            <div>Tipo</div>
            <div>Descrição</div>
          </div>
          <div class="documents-table-row" v-for="(doc, idx) in docs" :key="idx">
            <div>{{ doc.data }}</div>
            <div>{{ doc.tipo }}</div>
            <div class="desc-cell">
              {{ doc.descricao }}
              <img class="icon-doc" :src="require('@/assets/images/icon_documents.png')" alt="icon doc" />
            </div>
          </div>
        </div>
        <div class="ver-todos-wrapper">
          <button class="ver-todos-btn" disabled>Ver todos</button>
        </div>
      </div>
      <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "ProfileComponent",
  components: {
    Header: HeaderComponent,
  },
  data() {
    return {
      docs: [
        { data: "2025", tipo: "Horários", descricao: "Horários Unidade Curricular" },
        { data: "2025", tipo: "Matrículas", descricao: "Matrículas Ano Letivo 24/25 Atualizadas" },
        { data: "2024", tipo: "Inscrições", descricao: "Inscrições Ano Letivo 24/25 Atualizadas" },
      ],
    };
  },
};
</script>

<style scoped>
.options-bg {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/images/background.png') no-repeat center center fixed;
  background-size: cover;
  padding-top: 8.69vh; /* espaço para o header fixo */
}

.options-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: calc(100vh - 8.69vh);
  overflow: hidden;
}

.profile-card, .documents-card {
  background: #d4b1df;
  border-radius: 24px;
  display: flex;
  padding: 32px 36px;
  gap: 32px;
  align-items: flex-start;
  position: relative;
}

.profile-card {
  justify-content: space-between;
}

.profile-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start; /* Alinha todo o conteúdo à esquerda */
}

.profile-title {
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-weight: 400;
  margin-bottom: 10px;
  gap: 12px;
  border-bottom: 2px solid #3a2658;
  padding-bottom: 6px;
  width: 100%;
}

.icon-profile {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.profile-details {
  font-size: 1.25rem;
  color: #222;
  font-family: "Istok Web-Regular", Helvetica;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start; /* Alinha cada linha à esquerda */
  width: 100%;
}

.profile-detail {
  width: 100%;
  text-align: left;
}

.profile-details b {
  color: #3a2658;
  font-weight: 700;
}

.profile-photo-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
}

.profile-photo {
  width: 220px;
  height: 220px;
  border-radius: 16px;
  object-fit: cover;
  background: #fff;
}

.icon-edit {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.documents-card {
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
}

.documents-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.documents-title {
  display: flex;
  align-items: center;
  font-size: 2.2rem;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-weight: 400;
  gap: 12px;
  border-bottom: 2px solid #3a2658;
  padding-bottom: 4px;
}

.icon-documents {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

.icon-add-wrapper {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.icon-add {
  width: 32px;
  height: 32px;
  object-fit: contain;
  cursor: pointer;
  margin-left: 16px;
}

.documents-table {
  background: transparent;
  border-radius: 10px;
  width: 100%;
  margin-top: 8px;
}

.documents-table-header, .documents-table-row {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  padding: 4px 0;
}

.documents-table-header {
  font-weight: 700;
  border-bottom: 1.5px solid #3a2658;
}

.documents-table-row {
  font-weight: 400;
  border-bottom: 1px solid #bfa6d6;
}

.documents-table-row:last-child {
  border-bottom: none;
}

.documents-table-header > div,
.documents-table-row > div {
  flex: 1;
  text-align: left;
  padding-right: 12px;
}

.desc-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-doc {
  width: 22px;
  height: 22px;
  object-fit: contain;
  margin-left: 8px;
}

.ver-todos-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.ver-todos-btn {
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
</style>