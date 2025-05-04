<template>
    <div class="overlay">
      <div class="modal">
        <img class="profile-img" :src="studentImg" alt="Foto do aluno" />
        <div class="student-info">
        <div class="student-name">{{ aluno.name }} </div>
        <div class="student-course">{{ aluno.email }} </div>
      </div>
        <div class="turno-select">
          <label><b>Teórico:</b></label>
          <select v-model="selectedTShiftId">
            <option v-for="shift in shiftsTeoricos" :key="shift.id" :value="shift.id">
              {{ shift.name }}
            </option>
          </select>
        </div>
        <div class="turno-select">
          <label><b>Prático:</b></label>
          <select v-model="selectedPLShiftId">
            <option v-for="shift in shiftsPraticos" :key="shift.id" :value="shift.id">
              {{ shift.name }}
            </option>
          </select>
        </div>
        <div class="actions">
          <button class="cancel-btn" @click="$emit('close')">Cancelar</button>
          <button class="confirm-btn" @click="confirm">Concluído</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EditAllocationOverlay",
    props: {
      aluno: Object,
      shifts: Array,
      currentTShiftId: [String, Number],
      currentPLShiftId: [String, Number],
      studentImg: { type: String, default: require('@/assets/images/icon_person.png') }
    },
    data() {
      return {
        selectedTShiftId: this.currentTShiftId,
        selectedPLShiftId: this.currentPLShiftId
      };
    },
    computed: {
      shiftsTeoricos() {
        return this.shifts.filter(s => s.type === 'T');
      },
      shiftsPraticos() {
        return this.shifts.filter(s => s.type === 'PL' || s.type === 'TP');
      }
    },
    methods: {
      confirm() {
        this.$emit('save', {
          tShiftId: this.selectedTShiftId,
          plShiftId: this.selectedPLShiftId
        });
      },
      
    }
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(44, 30, 60, 0.45);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background: #d4b1df;
    border-radius: 28px;
    padding: 32px 38px;
    min-width: 340px;
    max-width: 90vw;
    box-shadow: 0 4px 24px rgba(44,30,60,0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 18px;
  }
  .student-info {
    text-align: center;
    margin-bottom: 18px;
  }
  .student-name {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .student-course {
    font-size: 1rem;
    color: #3a2658;
  }
  .turno-select {
    margin-bottom: 24px;
    font-size: 1.1rem;
  }
  .actions {
    display: flex;
    gap: 18px;
    margin-top: 10px;
  }
  .cancel-btn, .confirm-btn {
    border-radius: 20px;
    padding: 8px 28px;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
  }
  .cancel-btn {
    background: #fff;
    color: #3a2658;
    border: 2px solid #3a2658;
  }
  .confirm-btn {
    background: #3a2658;
    color: #fff;
  }
  </style>