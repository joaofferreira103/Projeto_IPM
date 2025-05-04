<template>
    <div class="shift-request-bg">
      <Header :is-logged-in="true" />
      <div class="shift-request-content">
        <div class="shift-request-card">
          <div class="shift-request-title">
            <img class="icon-mail" :src="require('@/assets/images/icon_mail.png')" alt="icon mail" />
            <span>Novo Pedido de Troca de Turno</span>
          </div>
          <div class="shift-request-divider"></div>
          <form class="shift-request-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="course">Disciplina:</label>
              <select id="course" v-model="selectedCourseId" @change="loadShifts" required>
                <option value="" disabled>Selecione uma disciplina</option>
                <option v-for="course in enrolledCourses" :key="course.id" :value="course.id">
                  {{ course.name }}
                </option>
              </select>
            </div>
            <div class="form-group" v-if="currentShifts.length">
              <label for="currentShift">Turno Atual:</label>
              <select id="currentShift" v-model="selectedCurrentShiftId" required>
                <option value="" disabled>Selecione o turno atual</option>
                <option v-for="shift in currentShifts" :key="shift.id" :value="shift.id">
                  {{ formatShift(shift) }}
                </option>
              </select>
            </div>
            <div v-else class="form-group">
              <p>Nenhum turno atual encontrado para esta disciplina.</p>
            </div>
            <div class="form-group" v-if="availableShifts.length">
              <label for="alternativeShift">Turno Pretendido:</label>
              <select id="alternativeShift" v-model="selectedAlternativeShiftId" required>
                <option value="" disabled>Selecione o turno pretendido</option>
                <option v-for="shift in availableShifts" :key="shift.id" :value="shift.id">
                  {{ formatShift(shift) }}
                </option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="submit-btn">Submeter Pedido</button>
              <button type="button" class="cancel-btn" @click="$router.back()">Cancelar</button>
            </div>
          </form>
        </div>
        <div class="voltar"><a href="#" @click.prevent="$router.back()">Voltar</a></div>
      </div>
    </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import { useDatabaseStore } from "@/store/useDatabaseStore";

export default {
  name: "ShiftRequestForm",
  components: { Header },
  data() {
    return {
      selectedCourseId: "",
      selectedCurrentShiftId: "",
      selectedAlternativeShiftId: "",
      enrolledCourses: [],
      currentShifts: [],
      availableShifts: [],
    };
  },
  setup() {
    const databaseStore = useDatabaseStore();
    return { databaseStore };
  },
  async created() {
    // Load database if not already loaded
    if (!this.databaseStore.students.length) {
      await this.databaseStore.loadDatabase();
      console.log("Banco de dados carregado. Alocações:", this.databaseStore.allocations);
    }
    this.loadEnrolledCourses();
  },
  methods: {
    loadEnrolledCourses() {
      const student = this.databaseStore.students.find(
        (s) => String(s.id) === String(this.databaseStore.user.id)
      );
      if (student && student.enrolled) {
        this.enrolledCourses = student.enrolled
          .map((courseId) => this.databaseStore.getCourseById(courseId))
          .filter((course) => course);
      }
    },
    loadShifts() {
      this.currentShifts = [];
      this.availableShifts = [];
      this.selectedCurrentShiftId = "";
      this.selectedAlternativeShiftId = "";

      if (this.selectedCourseId) {
        // Obtém todos os turnos para a disciplina selecionada
        const allShifts = this.databaseStore.getShiftsByCourse(this.selectedCourseId);
        console.log("Disciplina selecionada (courseId):", this.selectedCourseId);
        console.log("Todos os turnos (allShifts):", allShifts);

        // Obtém as alocações do aluno
        const studentAllocations = this.databaseStore.allocations.filter(
          (alloc) => String(alloc.studentId) === String(this.databaseStore.user.id)
        );
        console.log("Alocações do aluno (studentAllocations):", studentAllocations);

        // Obtém os IDs dos turnos atuais do aluno
        const currentShiftIds = studentAllocations.map((alloc) => String(alloc.shiftId));
        console.log("IDs dos turnos atuais (currentShiftIds):", currentShiftIds);

        // Filtra os turnos atuais (em que o aluno está inscrito)
        this.currentShifts = allShifts.filter((shift) =>
          currentShiftIds.includes(String(shift.id))
        );
        console.log("Turnos atuais (currentShifts):", this.currentShifts);

        // Filtra os turnos disponíveis (em que o aluno não está inscrito)
        this.availableShifts = allShifts.filter(
          (shift) => !currentShiftIds.includes(String(shift.id))
        );
        console.log("Turnos disponíveis (availableShifts):", this.availableShifts);
      }
    },
    formatShift(shift) {
      return `${shift.name} (${shift.type}) - ${shift.day}, ${shift.from}:00 - ${shift.to}:00`;
    },
    async handleSubmit() {
      if (!this.selectedCourseId || !this.selectedCurrentShiftId || !this.selectedAlternativeShiftId) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      try {
        // Format date as dd/mm/aaaa
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        const newRequest = {
          shiftId: this.selectedCurrentShiftId,
          studentId: this.databaseStore.user.id,
          alternativeShiftId: this.selectedAlternativeShiftId,
          response: "pending",
          responseSeenByStudent: false,
          createdAt: formattedDate,
        };

        // Submit request to backend
        const response = await fetch("http://localhost:3000/shiftRequests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRequest),
        });

        if (response.ok) {
          const createdRequest = await response.json();
          // Update store
          this.databaseStore.shiftRequests.push(createdRequest);
          alert("Pedido de troca de turno submetido com sucesso!");
          this.$router.push("/pedidos");
        } else {
          throw new Error("Erro ao submeter o pedido.");
        }
      } catch (error) {
        console.error("Erro ao submeter o pedido:", error);
        alert("Ocorreu um erro ao submeter o pedido. Tente novamente.");
      }
    },
  },
};
</script>

<style scoped>
.shift-request-bg {
  min-height: 100vh;
  background: url('@/assets/images/background.png') no-repeat center center fixed;
  background-size: cover;
  padding-top: 8.69vh;
  overflow: hidden;
}

.shift-request-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.shift-request-card {
  background: #d4b1df;
  border-radius: 24px;
  padding: 32px 36px;
  box-sizing: border-box;
}

.shift-request-title {
  display: flex;
  align-items: center;
  font-size: 2.7rem;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-weight: 400;
  gap: 14px;
}

.icon-mail {
  width: 54px;
  height: 54px;
  object-fit: contain;
}

.shift-request-divider {
  border-bottom: 2px solid #3a2658;
  margin: 8px 0 18px 0;
}

.shift-request-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 1.25rem;
  color: #3a2658;
  margin-bottom: 8px;
}

.form-group select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 1rem;
  color: #3a2658;
  background: #fff;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.submit-btn {
  background: #3a2658;
  color: #fff;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 1.1rem;
  border: none;
  border-radius: 20px;
  padding: 8px 28px;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #5a3b7a;
}

.cancel-btn {
  background: #fff;
  color: #3a2658;
  font-family: "Istok Web-Regular", Helvetica;
  font-size: 1.1rem;
  border: 2px solid #3a2658;
  border-radius: 20px;
  padding: 8px 28px;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn:hover {
  background: #f3eaf7;
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