<template>
    <div class="horarios-aluno">
      <Header :is-logged-in="true" />
      <div class="horario-card">
        <h1>O Meu Horário</h1>
        <table class="horario-table">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Hora</th>
              <th>Unidade Curricular</th>
              <th>Turno</th>
              <th>Sala (Edifício)</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="shift in orderedShifts" :key="shift.id">
              <td>{{ shift.day }}</td>
              <td>{{ shift.from }}:00 - {{ shift.to }}:00</td>
              <td>{{ getCourseName(shift.courseId) }}</td>
              <td>{{ shift.name }}</td>
              <td>{{ getClassroomName(shift.classroomId) }}</td>
              <td>{{ shift.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
    </div>
  </template>
  
  <script>
  import Header from "@/components/HeaderComponent.vue";
  import { useDatabaseStore } from "@/store/useDatabaseStore";
  
  export default {
    name: "HorariosAluno",
    components: { Header },
    data() {
      return {
        shifts: [],
        courses: [],
        classrooms: [],
        alunoId: null,
      };
    },
    computed: {
      orderedShifts() {
        // Ordena por dia da semana e hora de início
        const dias = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return [...this.shifts].sort((a, b) => {
          const diaA = dias.indexOf(a.day);
          const diaB = dias.indexOf(b.day);
          if (diaA !== diaB) return diaA - diaB;
          return a.from - b.from;
        });
      }
    },
    async mounted() {
      // Garante que o alunoId corresponde ao id do aluno autenticado
      // Exemplo: guarda o id do aluno autenticado no localStorage ao fazer login
      
        const databaseStore = useDatabaseStore();
        await databaseStore.loadDatabase();

        // Usa o id do aluno autenticado da store
        this.alunoId = databaseStore.user?.id;

        // Filtra allocations só deste aluno
        const allocations = databaseStore.allocations.filter(
        (a) => String(a.studentId) === String(this.alunoId)
        );
        // Vai buscar os shifts correspondentes
        this.shifts = allocations
        .map(a => databaseStore.shifts.find(s => String(s.id) === String(a.shiftId)))
        .filter(Boolean);
        this.courses = databaseStore.courses;
        this.classrooms = databaseStore.classrooms;
        this.buildings = databaseStore.buildings;
    },
    methods: {
      getCourseName(courseId) {
        const course = this.courses.find(c => String(c.id) === String(courseId));
        return course ? course.name : "Desconhecida";
      },
      getClassroomName(classroomId) {
        const classroom = this.classrooms.find(c => String(c.id) === String(classroomId));
        if (!classroom) return "Desconhecida";
        const building = this.buildings.find(b => String(b.id) === String(classroom.buildingId));
        const buildingName = building ? building.name : "Edifício desconhecido";
        return `${classroom.name} (${buildingName})`;
      }
    }
  };
  </script>
  
  <style scoped>
  .horarios-aluno {
    min-height: 100vh;
    background: url('@/assets/images/background.png') no-repeat center center fixed;
    background-size: cover;
    padding-top: 8.69vh;
  }
  .horario-card {
    max-width: 900px;
    margin: 40px auto 0 auto;
    background: #d4b1df;
    border-radius: 28px;
    padding: 40px 60px 60px 60px;
    position: relative;
  }
  .horario-card h1 {
    text-align: center;
    color: #3a2658;
    margin-bottom: 28px;
  }
  .horario-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
  }
  .horario-table th, .horario-table td {
    border: 1px solid #3a2658;
    padding: 12px;
    text-align: center;
  }
  .horario-table th {
    background: #3a2658;
    color: #fff;
  }
  .voltar {
    text-align: right;
    margin: 18px 60px 0 0;
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