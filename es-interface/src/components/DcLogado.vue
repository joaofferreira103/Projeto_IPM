<!-- src/components/DcLogado.vue -->
<template>
  <div class="dc-logado">
    <div class="overlap-group-wrapper">
      <div class="overlap-group">
        <!-- Background -->
        <img class="background" alt="Background" :src="background" />

        <!-- Header -->
        <div class="rectangle-5" />
        <Header :icon-swap="iconSwap" />

        <!-- Greeting -->
        <p class="bem-vindo-jose">
          <span class="span">Bem-vindo</span>
          <span class="text-wrapper-17">, </span>
          <span class="span">José</span>
        </p>

        <!-- Main Options -->
        <div class="options-container">
          <router-link to="/perfil" class="option-card">
            <Card height="23.24vh" width="24.79%">
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
            <Card height="23.24vh" width="24.79%">
              <img class="icon-schedule" alt="Icon schedule" :src="iconSchedule" />
              <div class="text-wrapper-19">HORÁRIOS</div>
            </Card>
          </router-link>
          <router-link to="/opcoes" class="option-card">
            <Card height="23.24vh" width="24.79%">
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

export default {
  name: "DcLogado",
  components: {
    Header: HeaderComponent, // Register as Header to match template
    RequestsTable,
    Card: CardComponent, // Register as Card to match template
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
.dc-logado {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.overlap-group-wrapper {
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.overlap-group {
  height: 100%;
  position: relative;
}

.background {
  height: 92.77vh; /* 949px / 1024 * 100 */
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 7.32vh; /* 75px / 1024 * 100 */
  width: 100%;
}

.rectangle-5 {
  background-color: #a37caf;
  height: 8.69vh; /* 89px / 1024 * 100 */
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.bem-vindo-jose {
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 45px;
  font-weight: 400;
  left: 38.89%; /* 560px / 1440 * 100 */
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 11.04vh; /* 113px / 1024 * 100 */
}

.options-container {
  display: flex;
  justify-content: center;
  gap: 2.83vw; /* 40px / 1440 * 100 (approx spacing between cards) */
  position: absolute;
  top: 22.66vh; /* 232px / 1024 * 100 */
  left: 10.69%; /* 154px / 1440 * 100 */
  width: 81.18%; /* 1169px / 1440 * 100 */
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.icon-person,
.icon-options {
  height: 12.40vh; /* 127px / 1024 * 100 */
  width: 35.57%; /* 127px / 357px * 100 */
  object-fit: cover;
}

.icon-schedule {
  height: 11.82vh; /* 121px / 1024 * 100 */
  width: 33.89%; /* 121px / 357px * 100 */
  object-fit: cover;
}

.o-meu-perfil {
  color: #3a2658;
  font-family: "Istok Web-Bold", Helvetica;
  font-size: 44px;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  margin-top: 1rem;
}

.text-wrapper-19,
.text-wrapper-20 {
  color: #3a2658;
  font-family: "Istok Web-Bold", Helvetica;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  text-align: center;
  margin-top: 1rem;
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

@media (max-height: 800px) {
  .bem-vindo-jose,
  .o-meu-perfil,
  .text-wrapper-19,
  .text-wrapper-20 {
    font-size: 36px;
  }
}

@media (max-height: 600px) {
  .bem-vindo-jose,
  .o-meu-perfil,
  .text-wrapper-19,
  .text-wrapper-20 {
    font-size: 28px;
  }
}
</style>