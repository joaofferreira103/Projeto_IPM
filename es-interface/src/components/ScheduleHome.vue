<template>
    <div class="schedule-bg">
      <Header :is-logged-in="true" />
      <div class="schedule-content">
        <div class="schedule-card">
          <!-- Título e Ícone no Topo do Card -->
          <div class="schedule-header">
            <img class="icon-schedule" :src="require('@/assets/images/icon_schedule.png')" alt="Horários" />
            <span class="schedule-title">Horários</span>
          </div>
  
          <div class="schedule-body">
            <!-- Menu Interativo à Esquerda -->
            <div class="schedule-left">
              <div class="menu-interativo">
                <div class="semester-selector">
                  <button
                    v-for="semester in semesters"
                    :key="semester"
                    :class="{ active: selectedSemester === semester }"
                    @click="selectSemester(semester)"
                  >
                    {{ semester }}º Semestre
                  </button>
                </div>
                <div class="year-selector">
                  <button
                    v-for="year in years"
                    :key="year"
                    :class="{ active: selectedYear === year }"
                    @click="selectYear(year)"
                  >
                    {{ year }}º Ano
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Lista de Cadeiras à Direita -->
            <div class="schedule-right">
              <div v-if="filteredCourses.length > 0" class="courses-list">
                <h3>Unidades Curriculares</h3>
                <ul>
                  <li
                    v-for="course in filteredCourses"
                    :key="course.id"
                    @click="goToCourseDetails(course.id)"
                    class="course-item"
                  >
                    {{ course.name }}
                  </li>
                </ul>
              </div>
              <div v-else class="no-courses">
                <p>Não há cadeiras disponíveis para o semestre e ano selecionados.</p>
              </div>
            </div>
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
    name: "ScheduleHome",
    components: { Header },
    data() {
      return {
        semesters: [1, 2], // Semestres disponíveis
        years: [1, 2, 3], // Anos disponíveis
        selectedSemester: null,
        selectedYear: null,
      };
    },
    computed: {
      filteredCourses() {
        const databaseStore = useDatabaseStore();
  
        // Certifique-se de que os dados foram carregados
        if (!databaseStore.courses || databaseStore.courses.length === 0) {
          return [];
        }
  
        // Filtra os cursos com base no semestre e ano selecionados
        if (this.selectedSemester && this.selectedYear) {
          return databaseStore.courses.filter(
            (course) =>
              course.semester === this.selectedSemester && course.year === this.selectedYear
          );
        }
        return [];
      },
    },
    methods: {
      selectSemester(semester) {
        this.selectedSemester = semester;
      },
      selectYear(year) {
        this.selectedYear = year;
      },
      goToCourseDetails(courseId) {
        this.$router.push(`/detalhesUC/${courseId}`);
      },
    },
    mounted() {
      const databaseStore = useDatabaseStore();
  
      // Certifique-se de carregar os dados da base de dados
      if (!databaseStore.courses || databaseStore.courses.length === 0) {
        databaseStore.loadDatabase();
      }
    },
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
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 480px;
    position: relative;
  }
  
  .schedule-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .icon-schedule {
    width: 40px;
    height: 40px;
  }
  
  .schedule-title {
    font-size: 1.8rem;
    font-family: "Istok Web-Regular", Helvetica;
    color: #3a2658;
  }
  
  .schedule-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 20px;
  }
  
  .schedule-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centraliza verticalmente os botões */
    gap: 20px;
  }
  
  .menu-interativo {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .semester-selector,
  .year-selector {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .semester-selector button,
  .year-selector button {
    background: #fff;
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 1.2rem;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .semester-selector button.active,
  .year-selector button.active {
    background: #3a2658;
    color: #fff;
  }
  
  .schedule-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centraliza verticalmente as unidades curriculares */
    align-items: center; /* Centraliza horizontalmente as unidades curriculares */
    gap: 20px;
  }
  
  .courses-list {
    margin-top: 20px;
    text-align: center;
  }
  
  .courses-list h3 {
    font-size: 2rem; /* Aumenta o tamanho do título */
    color: #3a2658;
    margin-bottom: 20px;
  }
  
  .courses-list ul {
    list-style: none;
    padding: 0;
  }
  
  .courses-list li {
    font-size: 1.5rem; /* Aumenta o tamanho das unidades curriculares */
    color: #3a2658;
    margin-bottom: 10px;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .courses-list li:hover {
    color: #5a3b7a;
  }
  
  .no-courses {
    font-size: 1.5rem; /* Aumenta o tamanho da mensagem */
    color: #3a2658;
    margin-top: 20px;
    text-align: center;
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