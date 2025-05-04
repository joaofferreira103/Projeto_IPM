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
                <p>
                  <b>Sala:</b> {{ getClassroomName(turno.classroomId) }}
                  <span v-if="getClassroomCapacity(turno.classroomId) !== 'N/A'">
                    - Lotação: {{ getClassroomCapacity(turno.classroomId) }}
                  </span>
                </p>
                <button v-if="editTurnoId !== turno.id" @click.stop="editTurnoId = turno.id">Editar</button>
                <div v-if="editTurnoId === turno.id">
                  <select v-model="turno.classroomId">
                    <option v-for="sala in classrooms" :key="sala.id" :value="sala.id">
                      {{ sala.name }} ({{ getBuildingName(sala.buildingId) }})
                    </option>
                  </select>
                  <button @click.stop="guardarSala(turno)">Guardar</button>
                  <button @click.stop="cancelarEdicao">Cancelar</button>
                </div>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="aluno in studentsBySelectedShift" :key="aluno.id">
                  <td>{{ aluno.id }}</td>
                  <td>{{ aluno.name }}</td>
                  <td>{{ aluno.specialStatus ? "Estatuto Especial" : "-" }}</td>
                  <td>
                    <button @click="openEditAllocation(aluno)">Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
      </div>
      <!-- Overlay para editar alocação -->
      <EditAllocationOverlay
        v-if="showEditOverlay"
        :aluno="alunoParaEditar"
        :shifts="shifts"
        :currentTShiftId="getCurrentTShiftId(alunoParaEditar)"
        :currentPLShiftId="getCurrentPLShiftId(alunoParaEditar)"
        @close="showEditOverlay = false"
        @save="saveAllocation"
        />
    </div>
    <div v-else>
      <p>Carregando dados...</p>
    </div>
  </template>
  
  <script>
  import Header from "@/components/HeaderComponent.vue";
  import EditAllocationOverlay from "@/components/EditAllocationOverlay.vue";
  import { useDatabaseStore } from "@/store/useDatabaseStore";
  
  export default {
    name: "CourseDetails",
    components: { Header, EditAllocationOverlay },
    data() {
      return {
        course: null,
        shifts: [],
        students: [],
        classrooms: [],
        selectedShiftId: null,
        editTurnoId: null,
        showEditOverlay: false,
        alunoParaEditar: null,
      };
    },
    computed: {
      studentsBySelectedShift() {
        if (!this.selectedShiftId) return [];
        return this.getStudentsByShift(this.selectedShiftId);
      },
    },
    watch: {
      "$route.params.id": "loadCourse",
    },
    mounted() {
      this.loadCourse();
    },
    methods: {
      selectShift(shiftId) {
        this.selectedShiftId = shiftId;
      },
      loadCourse() {
        const databaseStore = useDatabaseStore();
        if (
          !databaseStore.courses.length ||
          !databaseStore.classrooms.length ||
          !databaseStore.shifts.length
        ) {
          databaseStore.loadDatabase().then(() => {
            this._loadCourseData(databaseStore);
          });
        } else {
          this._loadCourseData(databaseStore);
        }
      },
      _loadCourseData(databaseStore) {
        const courseId = parseInt(this.$route.params.id);
        this.course = databaseStore.getCourseById(courseId);
        this.shifts = databaseStore.getShiftsByCourse(courseId);
        this.classrooms = databaseStore.classrooms;
        if (this.shifts.length > 0) {
          this.selectedShiftId = this.shifts[0].id;
        }
        if (!this.course) {
          alert("Unidade Curricular não encontrada!");
          this.$router.push("/horarios");
        }
      },
      getStudentsByShift(shiftId) {
        const databaseStore = useDatabaseStore();
        const allocations = databaseStore.allocations.filter(
          (allocation) => Number(allocation.shiftId) === Number(shiftId)
        );
        const studentIds = allocations.map((allocation) => Number(allocation.studentId));
        return databaseStore.students.filter((student) =>
          studentIds.includes(Number(student.id))
        );
      },
      getClassroomName(classroomId) {
        const databaseStore = useDatabaseStore();
        const classroom = databaseStore.classrooms.find(
          (classroom) => String(classroom.id) === String(classroomId)
        );
        if (!classroom) return "Desconhecida";
        const building = databaseStore.buildings.find(
          (building) => String(building.id) === String(classroom.buildingId)
        );
        const buildingName = building ? building.name : "Edifício Desconhecido";
        return `${classroom.name} (${buildingName})`;
      },
      getClassroomCapacity(classroomId) {
        const databaseStore = useDatabaseStore();
        const classroom = databaseStore.classrooms.find(
          (classroom) => String(classroom.id) === String(classroomId)
        );
        return classroom && classroom.capacity ? classroom.capacity : "N/A";
      },
      getCurrentTShiftId(aluno) {
        const databaseStore = useDatabaseStore();
        const allocation = databaseStore.allocations.find(
            (a) =>
            Number(a.studentId) === Number(aluno.id) &&
            databaseStore.shifts.find(s => s.id === a.shiftId && s.type === 'T')
        );
        return allocation ? allocation.shiftId : null;
        },
        getCurrentPLShiftId(aluno) {
        const databaseStore = useDatabaseStore();
        const allocation = databaseStore.allocations.find(
            (a) =>
            Number(a.studentId) === Number(aluno.id) &&
            databaseStore.shifts.find(s => s.id === a.shiftId && (s.type === 'PL' || s.type === 'TP'))
        );
        return allocation ? allocation.shiftId : null;
        },
      async guardarSala(turno) {
        try {
          const response = await fetch(`http://localhost:3000/shifts/${turno.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ classroomId: turno.classroomId }),
          });
          if (!response.ok) throw new Error("Erro ao atualizar sala!");
          alert("Sala atualizada com sucesso!");
          this.editTurnoId = null;
        } catch (e) {
          alert("Erro ao atualizar sala!");
        }
      },
      getBuildingName(buildingId) {
        const databaseStore = useDatabaseStore();
        const building = databaseStore.buildings.find(
          (b) => String(b.id) === String(buildingId)
        );
        return building ? building.name : "Edifício Desconhecido";
      },
      cancelarEdicao() {
        this.editTurnoId = null;
        this.loadCourse();
      },
      openEditAllocation(aluno) {
        this.alunoParaEditar = aluno;
        this.showEditOverlay = true;
      },
      getCurrentShiftId(aluno) {
        const databaseStore = useDatabaseStore();
        const allocation = databaseStore.allocations.find(
          (a) => Number(a.studentId) === Number(aluno.id)
        );
        return allocation ? allocation.shiftId : null;
      },
      async saveAllocation({ tShiftId, plShiftId }) {
  const databaseStore = useDatabaseStore();

  // --- Troca TEÓRICO ---
  if (tShiftId) {
    // Remove TODAS as allocations antigas do tipo T para este aluno
    const oldTAllocations = databaseStore.allocations.filter(
      (a) =>
        Number(a.studentId) === Number(this.alunoParaEditar.id) &&
        databaseStore.shifts.find(s => String(s.id) === String(a.shiftId) && s.type === 'T')
    );
    for (const alloc of oldTAllocations) {
      await fetch(`http://localhost:3000/allocations/${alloc.id}`, { method: "DELETE" });
    }
    // Cria nova allocation
    await fetch(`http://localhost:3000/allocations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shiftId: tShiftId, studentId: this.alunoParaEditar.id })
    });
  }

  // --- Troca PRÁTICO ---
  if (plShiftId) {
    // Remove TODAS as allocations antigas do tipo PL/TP para este aluno
    const oldPLAllocations = databaseStore.allocations.filter(
      (a) =>
        Number(a.studentId) === Number(this.alunoParaEditar.id) &&
        databaseStore.shifts.find(s => String(s.id) === String(a.shiftId) && (s.type === 'PL' || s.type === 'TP'))
    );
    for (const alloc of oldPLAllocations) {
      await fetch(`http://localhost:3000/allocations/${alloc.id}`, { method: "DELETE" });
    }
    // Cria nova allocation
    await fetch(`http://localhost:3000/allocations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shiftId: plShiftId, studentId: this.alunoParaEditar.id })
    });
  }

  // Recarrega os dados para atualizar a interface
  await databaseStore.loadDatabase();
  this.showEditOverlay = false;
  this.alunoParaEditar = null;
}
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