<template>
    <div class="course-details" v-if="course">
      <Header :is-logged-in="true" />
      <div class="course-content">
        <div class="course-header">
          <img class="icon-course" :src="require('@/assets/images/icon_book.png')" alt="Unidade Curricular" />
          <h1 class="course-title">{{ course.name }}</h1>
        </div>
        <div class="course-body">
          <!-- Turnos -->
          <div class="turnos-section">
            <h2>Turnos</h2>
            <div class="turnos-list">
              <div
                v-for="turno in shifts"
                :key="turno.id"
                class="turno-card"
                :class="{ active: selectedShiftId === turno.id }"
                @click="selectShift(turno.id)"
              >
                <h3>{{ turno.type }} {{ turno.name }}</h3>
                <p><b>Sala:</b> {{ getClassroomName(turno.classroomId) }}</p>
                <p><b>Horário:</b> {{ turno.day }} {{ turno.from }}:00 - {{ turno.to }}:00</p>
                <p><b>Alunos:</b> {{ getStudentsByShift(turno.id).length }}</p>
              </div>
            </div>
          </div>
  
          <!-- Alunos do Turno Selecionado -->
          <div class="alunos-section">
            <h2>Alunos do Turno Selecionado</h2>
            <table class="alunos-table">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Nome</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="aluno in studentsBySelectedShift" :key="aluno.id">
                  <td>{{ aluno.id }}</td>
                  <td>{{ aluno.name }}</td>
                  <td>{{ aluno.specialStatus ? "Estatuto Especial" : "-" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
      </div>
    </div>
    <div v-else>
      <p>Carregando dados...</p>
    </div>
  </template>
  
  <script>
  import Header from "@/components/HeaderComponent.vue";
  import { useDatabaseStore } from "@/store/useDatabaseStore";
  
  export default {
    name: "CourseDetails",
    components: { Header },
    data() {
      return {
        course: null,
        shifts: [],
        students: [],
        selectedShiftId: null, // ID do turno selecionado
      };
    },
    computed: {
      studentsBySelectedShift() {
        // Retorna os alunos do turno selecionado
        if (!this.selectedShiftId) return [];
        return this.getStudentsByShift(this.selectedShiftId);
      },
    },
    watch: {
      "$route.params.id": "loadCourse", // Recarrega os dados se o ID da rota mudar
    },
    mounted() {
      this.loadCourse();
    },
    methods: {
      loadCourse() {
        const databaseStore = useDatabaseStore();
  
        // Certifique-se de que os dados foram carregados
        if (!databaseStore.courses.length) {
          databaseStore.loadDatabase();
        }
  
        const courseId = parseInt(this.$route.params.id);
        this.course = databaseStore.getCourseById(courseId);
        this.shifts = databaseStore.getShiftsByCourse(courseId);
  
        // Define o primeiro turno como selecionado por padrão
        if (this.shifts.length > 0) {
          this.selectedShiftId = this.shifts[0].id;
        }
  
        // Busca os alunos associados aos turnos da unidade curricular
        const shiftIds = this.shifts.map((shift) => shift.id);
        const allocations = databaseStore.allocations.filter((allocation) =>
          shiftIds.includes(allocation.shiftId)
        );
        const studentIds = allocations.map((allocation) => allocation.studentId);
        this.students = databaseStore.students.filter((student) =>
          studentIds.includes(student.id)
        );
  
        if (!this.course) {
          alert("Unidade Curricular não encontrada!");
          this.$router.push("/horarios");
        }
      },
      getStudentsByShift(shiftId) {
        const databaseStore = useDatabaseStore();
        const allocations = databaseStore.allocations.filter(
          (allocation) => allocation.shiftId === shiftId
        );
        const studentIds = allocations.map((allocation) => allocation.studentId);
        return databaseStore.students.filter((student) =>
          studentIds.includes(student.id)
        );
      },
      getClassroomName(classroomId) {
        const databaseStore = useDatabaseStore();
        const classroom = databaseStore.classrooms.find(
          (classroom) => classroom.id === classroomId
        );
        if (!classroom) return "Desconhecida";
  
        const building = databaseStore.buildings.find(
          (building) => building.id === classroom.buildingId
        );
        const buildingName = building ? building.name : "Edifício Desconhecido";
  
        return `${classroom.name} (${buildingName})`;
      },
      selectShift(shiftId) {
        this.selectedShiftId = shiftId; // Atualiza o turno selecionado
      },
    },
  };
  </script>
  
  <style scoped>
  .course-details {
    min-height: 100vh;
    background: url('@/assets/images/background.png') no-repeat center center fixed;
    background-size: cover;
    padding-top: 8.69vh;
  }
  
  .course-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .course-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .icon-course {
    width: 60px;
    height: 60px;
  }
  
  .course-title {
    font-size: 2.5rem;
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
  }
  
  .course-body {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  
  .turnos-section,
  .alunos-section {
    background: #d4b1df;
    border-radius: 20px;
    padding: 20px;
  }
  
  .turnos-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .turno-card {
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    flex: 1 1 calc(33.33% - 20px);
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .turno-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .turno-card.active {
    border: 2px solid #3a2658;
  }
  
  .alunos-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .alunos-table th,
  .alunos-table td {
    border: 1px solid #3a2658;
    padding: 10px;
    text-align: left;
  }
  
  .alunos-table th {
    background: #3a2658;
    color: #fff;
  }
  
  .voltar {
    text-align: center;
    margin-top: 20px;
  }
  
  .voltar a {
    color: #3a2658;
    text-decoration: none;
    font-size: 1.2rem;
  }
  
  .voltar a:hover {
    text-decoration: underline;
  }
  </style>