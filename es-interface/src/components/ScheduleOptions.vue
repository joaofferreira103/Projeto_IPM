<template>
    <div class="schedule-options">
      <Header :is-logged-in="true" />
      <div class="center-container">
        <div class="main-card">
          <div class="header-row">
            <img src="@/assets/images/icon_schedule.png" class="icon-calendar" />
            <h1 class="main-title">Horários</h1>
          </div>
          <div class="options">
            <button class="option-btn" @click="goToHorarios">Consultar Horários</button>
            <button class="option-btn" @click="showPublishOverlay = true">Publicar Horários</button>
          </div>
          <img src="@/assets/images/icon_schedule.png" class="big-calendar" />
          <div
            v-if="showWarning"
            class="warning"
            @click="showConflictsOverlay = true"
            style="cursor:pointer;"
          >
            <span class="icon-warning">!</span>
            Não foi possível alocar {{ conflictsCount }} aluno{{ conflictsCount === 1 ? '' : 's' }}
          </div>
        </div>
      </div>
      <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
  
      <!-- Overlay de confirmação -->
      <div v-if="showPublishOverlay" class="overlay">
        <div class="confirm-modal">
          <img src="@/assets/images/icon_done.png" class="check-icon" />
          <p>Tem a certeza que pretende<br>publicar os horários?</p>
          <button class="confirm-btn" @click="confirmPublish">Confirmar</button>
          <button class="cancel-btn" @click="showPublishOverlay = false">Cancelar</button>
        </div>
      </div>
  
      <!-- Overlay com lista de alunos não alocados -->
      <div v-if="showConflictsOverlay" class="overlay">
        <div class="conflicts-modal">
          <h2>Alunos não alocados</h2>
          <ul>
            <li v-for="conflict in conflictsList" :key="conflict.studentId">
              {{ getStudentName(conflict.studentId) }} (ID: {{ conflict.studentId }})
            </li>
          </ul>
          <button class="close-btn" @click="showConflictsOverlay = false">Fechar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "@/components/HeaderComponent.vue";
  
  export default {
    name: "ScheduleOptions",
    components: { Header },
    data() {
      return {
        showPublishOverlay: false,
        showWarning: false,
        conflictsCount: 0,
        showConflictsOverlay: false,
        conflictsList: [],
        students: [],
      };
    },
    methods: {
      goToHorarios() {
        this.$router.push("/horarios");
      },
      async confirmPublish() {
        this.showPublishOverlay = false;
        this.showWarning = true;
        await this.loadConflictsCount();
      },
      async loadConflictsCount() {
        const res = await fetch("http://localhost:3000/conflicts");
        const conflicts = await res.json();
        this.conflictsCount = conflicts.length;
        this.conflictsList = conflicts;
        // Carrega os alunos se ainda não estiverem carregados
        if (!this.students.length) {
          const resStudents = await fetch("http://localhost:3000/students");
          this.students = await resStudents.json();
        }
      },
      getStudentName(studentId) {
        const student = this.students.find(s => Number(s.id) === Number(studentId));
        return student ? student.name : "Desconhecido";
      }
    },
    watch: {
      showPublishOverlay(val) {
        if (val) this.showWarning = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .schedule-options {
    min-height: 100vh;
    min-width: 100vw;
    background: url('@/assets/images/background.png') no-repeat center center fixed;
    background-size: cover;
    display: flex;
    flex-direction: column;
  }
  .main-title {
  font-size: 2.3rem;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  margin: 0;
}
  .center-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .main-card {
    max-width: 1100px;
    min-width: 600px;
    min-height: 520px;
    background: #d4b1df;
    border-radius: 32px;
    padding: 60px 80px 80px 80px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .header-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 32px;
}
  .icon-calendar {
    width: 60px;
    height: 60px;
  }
  .options {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 40px;
    width: 100%;
  }
  .option-btn {
    background: #fff;
    color: #3a2658;
    border: none;
    border-radius: 22px;
    font-size: 1.5rem;
    padding: 24px 0;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
  }
  .option-btn:hover {
    background: #e6d1ee;
  }
  .big-calendar {
    position: absolute;
    right: 60px;
    top: 60px;
    width: 220px;
    opacity: 0.22;
  }
  .voltar {
    text-align: right;
    margin: 18px 60px 0 0;
  }
  .voltar a {
    color: #3a2658;
    text-decoration: none;
    font-size: 1.1rem;
  }
  .voltar a:hover {
    text-decoration: underline;
  }
  .overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(44, 30, 60, 0.45);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .confirm-modal {
    background: #d4b1df;
    border-radius: 24px;
    padding: 48px 48px 38px 48px;
    min-width: 340px;
    text-align: center;
    box-shadow: 0 4px 24px rgba(44,30,60,0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .check-icon {
    width: 70px;
    margin-bottom: 22px;
  }
  .confirm-btn, .cancel-btn {
    border-radius: 20px;
    padding: 12px 44px;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    margin: 14px 10px 0 10px;
  }
  .confirm-btn {
    background: #3a2658;
    color: #fff;
  }
  .cancel-btn {
    background: #fff;
    color: #3a2658;
    border: 2px solid #3a2658;
  }
  .warning {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #3a2658;
    font-size: 1.2rem;
    margin-top: 28px;
    justify-content: center;
  }
  .icon-warning {
    font-weight: bold;
    font-size: 1.5rem;
    border: 2px solid #3a2658;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .conflicts-modal {
    background: #fff;
    border-radius: 18px;
    padding: 32px 38px;
    min-width: 320px;
    max-width: 90vw;
    max-height: 70vh;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 4px 24px rgba(44,30,60,0.15);
  }
  .conflicts-modal h2 {
    margin-bottom: 18px;
    color: #3a2658;
  }
  .conflicts-modal ul {
    list-style: none;
    padding: 0;
    margin: 0 0 18px 0;
  }
  .conflicts-modal li {
    margin-bottom: 8px;
    font-size: 1.1rem;
    color: #3a2658;
  }
  .close-btn {
    border-radius: 18px;
    padding: 8px 32px;
    font-size: 1.1rem;
    border: none;
    background: #3a2658;
    color: #fff;
    cursor: pointer;
  }
  </style>