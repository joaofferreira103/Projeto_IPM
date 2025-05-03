<template>
  <div class="aluno-logado">
    <Header :is-logged-in="true" />
    <div class="overlap-group-wrapper">
      <div class="overlap-group">
        <!-- Greeting -->
        <p class="bem-vindo-maria">
          <span class="span">Bem-vindo/a</span>
          <span class="text-wrapper-17"></span>
        </p>

        <!-- Main Options -->
        <div class="options-container">
          <router-link to="/perfil" class="option-card">
            <Card height="25vh" width="100%">
              <img class="icon-person" alt="Icon person" :src="iconPerson" />
              <p class="o-meu-perfil">
                <span class="span">O</span>
                <span class="text-wrapper-18"> </span>
                <span class="span">MEU</span>
                <span class="text-wrapper-18"> </span>
                <span class="span">PERFIL</span>
              </p>
            </Card>
          </router-link>
          <router-link to="/horarios" class="option-card">
            <Card height="25vh" width="100%">
              <img class="icon-schedule" alt="Icon schedule" :src="iconSchedule" />
              <div class="text-wrapper-19">HORÁRIOS</div>
            </Card>
          </router-link>
          <router-link to="/opcoes" class="option-card">
            <Card height="25vh" width="100%">
              <img class="icon-options" alt="Icon options" :src="iconOptions" />
              <div class="text-wrapper-20">OPÇÕES</div>
            </Card>
          </router-link>
        </div>

        <!-- Requests Section -->
        <RequestsTable
          :icon-mail="iconMail"
          :icon-warning="iconWarning"
          :image="image"
          :requests="requests"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import RequestsTable from '@/components/RequestsTable.vue';
import CardComponent from '@/components/CardComponent.vue';
import background from "@/assets/images/background.png";
import iconMail from "@/assets/images/icon_mail.png";
import iconOptions from "@/assets/images/icon_options.png";
import iconPerson from "@/assets/images/icon_person.png";
import iconSchedule from "@/assets/images/icon_schedule.png";
import iconSwap from "@/assets/images/icon_swap.png";
import iconWarning from "@/assets/images/icon_warning.png";
import image from "@/assets/images/image.png";
import { useDatabaseStore } from '@/store/useDatabaseStore';

export default {
  name: "AlunoLogado",
  components: {
    Header: HeaderComponent,
    RequestsTable,
    Card: CardComponent,
  },
  setup() {
    const databaseStore = useDatabaseStore();
    const requests = databaseStore.filterRequests();
    const userName = databaseStore.user?.name || "Utilizador";
    return {
      requests,
      userName,   
    };
  },
  data() {
    return {
      background,
      iconMail,
      iconOptions,
      iconPerson,
      iconSchedule,
      iconSwap,
      iconWarning,
      image,
    };
  },
};
</script>

<style scoped>
.aluno-logado {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
}

.overlap-group-wrapper {
  width: 100%;
  max-width: 1440px;
  padding: 8.69vh 20px 20px; /* Adiciona padding-top para compensar o cabeçalho fixo */
  box-sizing: border-box;
}

.overlap-group {
  width: 100%;
}

.bem-vindo-maria {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 45px;
  font-weight: 400;
  text-align: center;
  margin: 20px 0;
}

.options-container {
  display: flex;
  justify-content: center;     /* centrar os cards horizontalmente */
  gap: 2.83vw;                  /* mantém o espaçamento entre eles */
  margin-bottom: 40px;
  flex-wrap: wrap;              /* para telas pequenas */
  width: 100%;                  /* ocupa toda a largura disponível */           
  margin: 0 auto 40px;          /* centraliza o container na página */
}

.option-card {
  text-decoration: none;
  flex: 0 0 24%;        /* fixa em 24% do container */
  max-width: 24%;
  height: 25vh;         /* mesma altura para todos */
  box-sizing: border-box;
}

.icon-person,
.icon-options,
.icon-schedule {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

.o-meu-perfil {
  color: #3a2658;
  font-family: "Istok Web-Bold", Helvetica;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  margin: 0;
}

.text-wrapper-19,
.text-wrapper-20 {
  color: #3a2658;
  font-family: "Istok Web-Bold", Helvetica;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
}

.span {
  letter-spacing: 0;
}

.text-wrapper-17 {
  letter-spacing: -1.82px;
}

.text-wrapper-18 {
  letter-spacing: -2.52px;
}
</style>