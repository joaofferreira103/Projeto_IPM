<template>
    <div class="schedule-bg">
      <Header :is-logged-in="true" />
      <div class="schedule-content">
        <div class="schedule-card">
          <div class="schedule-left">
            <div class="schedule-title">
              <img class="icon-schedule" :src="require('@/assets/images/icon_schedule.png')" alt="Horários" />
              <span>Horários</span>
            </div>
            <div class="schedule-divider"></div>
            <div class="schedule-actions">
              <button class="schedule-btn">Consultar Horários</button>
              <button class="schedule-btn">Publicar Horários</button>
            </div>
            <div class="schedule-warning">
              <img class="icon-warning" :src="require('@/assets/images/icon_warning.png')" alt="Aviso" />
              <span>Não foi possível alocar 45 alunos</span>
            </div>
          </div>
          <div class="schedule-right">
            <img class="icon-schedule-big" :src="require('@/assets/images/icon_schedule.png')" alt="Horários" />
          </div>
        </div>
        <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "@/components/HeaderComponent.vue";
  export default {
    name: "ScheduleHome",
    components: { Header },
  };
  </script>
  
  <style scoped>
  .schedule-bg {
    min-height: 100vh;
    background: url('@/assets/images/background.png') no-repeat center center fixed;
    background-size: cover;
    padding-top: 8.69vh;
    overflow: hidden;
  }
  
  .schedule-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .schedule-card {
    background: #d4b1df;
    border-radius: 24px;
    padding: 32px 36px;
    box-sizing: border-box;
    margin-bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    min-height: 480px;
    position: relative;
  }
  
  .schedule-left {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }
  
  .schedule-title {
    display: flex;
    align-items: center;
    font-size: 2.7rem;
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-weight: 400;
    gap: 18px;
    margin-bottom: 12px;
  }
  
  .icon-schedule {
    width: 54px;
    height: 54px;
    object-fit: contain;
  }
  
  .schedule-divider {
    border-bottom: 2px solid #3a2658;
    margin: 0 0 32px 0;
    width: 100%;
  }
  
  .schedule-actions {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 40px;
    width: 80%;
  }
  
  .schedule-btn {
    background: #fff;
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 2rem;
    border: none;
    border-radius: 20px;
    padding: 28px 0;
    cursor: pointer;
    width: 100%;
    box-shadow: none;
    transition: background 0.2s;
  }
  
  .schedule-btn:hover {
    background: #f3eaf7;
  }
  
  .schedule-warning {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 2rem;
    margin-top: auto;
    margin-bottom: 0;
  }
  
  .icon-warning {
    width: 38px;
    height: 38px;
    object-fit: contain;
  }
  
  .schedule-right {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: relative;
  }
  
  .icon-schedule-big {
  width: 300px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
  margin-right: 130px; 
  opacity: 1;
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