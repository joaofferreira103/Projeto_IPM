<template>
    <div class="options-bg">
      <Header :is-logged-in="true" />
      <div class="options-content">
        <!-- Política de Privacidade -->
        <div class="card policy-card">
          <div class="card-title">
            <img class="icon" :src="require('@/assets/images/icon_privacyPolice.png')" alt="Política de Privacidade" />
            <span>Política de Privacidade</span>
          </div>
          <div class="card-divider"></div>
          <div class="policy-text">
            O tratamento de dados pessoais deverá ser efetuado de forma lícita e equitativa, para finalidades determinadas, específicas e explícitas.<br>
            Os dados pessoais tratados deverão ser adequados, pertinentes e limitados ao necessário para as finalidades determinadas, aplicando-se estes requisitos à quantidade de dados, à extensão do tratamento, à acessibilidade dos dados e ao prazo da sua conservação. Não deverão tratar-se dados pessoais se a finalidade do tratamento puder ser atingida de forma razoável por outros meios.<br>
            Os dados deverão ser protegidos de acessos não autorizados e de divulgação, perda, destruição ou alteração acidental ou ilícita, de acordo com o risco que o tratamento apresente para os titulares dos dados.<br>
            Os titulares têm direito a receber informações concisas e transparentes, em linguagem clara e simples, sobre o tratamento dos seus dados.
          </div>
        </div>
  
        <!-- Segurança e Backup & Mais Opções -->
        <div class="cards-row">
          <div class="card backup-card">
            <div class="card-title">
              <img class="icon" :src="require('@/assets/images/icon_backup.png')" alt="Segurança e Backup" />
              <span>Segurança e Backup</span>
            </div>
            <div class="card-divider"></div>
            <div class="backup-info">
              <div>Última cópia de segurança em: <b>26/08/2024</b></div>
              <div>Documentos não guardados: <b>4</b></div>
            </div>
            <button class="card-btn" disabled>Efetuar Cópia de Segurança dos Documentos</button>
          </div>
          <div class="card options-card">
            <div class="card-title">
              <img class="icon" :src="require('@/assets/images/icon_options.png')" alt="Mais Opções" />
              <span>Mais Opções</span>
            </div>
            <div class="card-divider"></div>
            <div class="options-info">
              <div>Número da licença: <b>194566</b></div>
              <div>Atualizado pela última vez a: <b>19/11/2024</b></div>
            </div>
            <div class="options-btns">
                <button class="card-btn" disabled>Ver histórico de versões</button>
            <button class="card-btn" @click="showLogoutOverlay = true">Terminar sessão</button>
          </div>
        </div>
      </div>
      <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
    </div>
    <LogoutComponent
      v-if="showLogoutOverlay"
      @confirm="logout"
      @cancel="showLogoutOverlay = false"
    />
  </div>
</template>
  
<script>
import Header from "@/components/HeaderComponent.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";

export default {
  name: "OptionsComponent",
  components: { Header, LogoutComponent },
  data() {
    return {
      showLogoutOverlay: false,
    };
  },
  methods: {
    logout() {
      this.showLogoutOverlay = false;
      this.$router.push('/');
    }
  }
};
</script>
  
  <style scoped>
  .options-bg {
    min-height: 100vh;
    background: url('@/assets/images/background.png') no-repeat center center fixed;
    background-size: cover;
    padding-top: 8.69vh;
    overflow: hidden;
  }
  
  .options-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .card {
    background: #d4b1df;
    border-radius: 24px;
    padding: 32px 36px;
    box-sizing: border-box;
    margin-bottom: 0;
  }
  
  .policy-card {
    font-size: 1.15rem;
  }
  
  .card-title {
    display: flex;
    align-items: center;
    font-size: 2.2rem;
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-weight: 400;
    gap: 14px;
  }
  
  .icon {
    width: 38px;
    height: 38px;
    object-fit: contain;
  }
  
  .card-divider {
    border-bottom: 2px solid #3a2658;
    margin: 8px 0 18px 0;
  }
  
  .policy-text {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    line-height: 1.5;
  }
  
  .cards-row {
    display: flex;
    gap: 32px;
    width: 100%;
  }
  
  .backup-card, .options-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .backup-info, .options-info {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 1.1rem;
    margin-bottom: 18px;
  }
  
  .card-btn {
    background: #3a2658;
    color: #fff;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 1.1rem;
    border: none;
    border-radius: 20px;
    padding: 8px 28px;
    margin-right: 12px;
    margin-bottom: 0;
    cursor: pointer;
    opacity: 0.95;
    transition: background 0.2s;
  }
  
  .card-btn[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .options-btns {
    display: flex;
    gap: 12px;
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
    .policy-text,
    .backup-info,
    .options-info {
    text-align: left;
    }
  
  @media (max-width: 1100px) {
    .cards-row {
      flex-direction: column;
      gap: 24px;
    }
  }
  </style>