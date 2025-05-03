import { defineStore } from "pinia";
import database from "@/assets/database.json";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    user: null, 
    directors: [],
    teachers: [],
    students: [],
    degrees: [],
    courses: [],
    shifts: [],
    allocations: [],
    conflicts: [],
    buildings: [],
    classrooms: [],
    classroomRequests: [],
    shiftRequests: [],
  }),
  actions: {
    loadDatabase() {
      this.directors = database.directors;
      this.teachers = database.teachers;
      this.students = database.students;
      this.degrees = database.degrees;
      this.courses = database.courses;
      this.shifts = database.shifts;
      this.allocations = database.allocations;
      this.conflicts = database.conflicts;
      this.buildings = database.buildings;
      this.classrooms = database.classrooms;
      this.classroomRequests = database.classroomRequests;
      this.shiftRequests = database.shiftRequests;
    },
    filterRequests() {
      if (!this.user) return []; // Retorna vazio se não houver usuário logado
    
      let requests = [];
      if (this.user.role === "student") {
        requests = this.shiftRequests
          .filter((request) => request.studentId === this.user.id)
          .map((request) => ({
            sender: this.students.find((s) => s.id === request.studentId)?.name || "Desconhecido",
            type: "Troca de Turno",
            subject: `Turno ${request.shiftId}`,
            date: new Date().toLocaleDateString("pt-PT"), // Ajuste conforme necessário
            isWarning: !request.responseSeenByStudent,
          }));
      } else if (this.user.role === "teacher") {
        requests = this.classroomRequests
          .filter((request) => request.teacherId === this.user.id)
          .map((request) => ({
            sender: this.teachers.find((t) => t.id === request.teacherId)?.name || "Desconhecido",
            type: "Reserva de Sala",
            subject: `Sala ${request.classroomId}`,
            date: new Date().toLocaleDateString("pt-PT"), // Ajuste conforme necessário
            isWarning: !request.responseSeenByTeacher,
          }));
      } else if (this.user.role === "director") {
        requests = [
          ...this.shiftRequests.map((request) => ({
            sender: this.students.find((s) => s.id === request.studentId)?.name || "Desconhecido",
            type: "Troca de Turno",
            subject: `Turno ${request.shiftId}`,
            date: new Date().toLocaleDateString("pt-PT"),
            isWarning: !request.responseSeenByStudent,
          })),
          ...this.classroomRequests.map((request) => ({
            sender: this.teachers.find((t) => t.id === request.teacherId)?.name || "Desconhecido",
            type: "Reserva de Sala",
            subject: `Sala ${request.classroomId}`,
            date: new Date().toLocaleDateString("pt-PT"),
            isWarning: !request.responseSeenByTeacher,
          })),
        ];
      }
      return requests;
    }
  },
  getters: {
    getStudentById: (state) => (id) => state.students.find((student) => student.id === id),
    getTeacherById: (state) => (id) => state.teachers.find((teacher) => teacher.id === id),
    getDirectorById: (state) => (id) => state.directors.find((director) => director.id === id),
    getCourseById: (state) => (id) => state.courses.find((course) => course.id === id),
    getCourseByDegree: (state) => (degreeId) => state.courses.filter((course) => course.degreeId === degreeId),
    getShiftsByCourse: (state) => (courseId) => state.shifts.filter((shift) => shift.courseId === courseId),
  },
});