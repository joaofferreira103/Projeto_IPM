import { defineStore } from "pinia";

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
    isLoading: false,
  }),
  actions: {
    async loadDatabase() {
      this.isLoading = true;
      try {
        const baseUrl = "http://localhost:3000"; // URL do backend

        const [
          directors,
          teachers,
          students,
          degrees,
          courses,
          shifts,
          allocations,
          conflicts,
          buildings,
          classrooms,
          classroomRequests,
          shiftRequests,
        ] = await Promise.all([
          fetch(`${baseUrl}/directors`).then((res) => res.json()),
          fetch(`${baseUrl}/teachers`).then((res) => res.json()),
          fetch(`${baseUrl}/students`).then((res) => res.json()),
          fetch(`${baseUrl}/degrees`).then((res) => res.json()),
          fetch(`${baseUrl}/courses`).then((res) => res.json()),
          fetch(`${baseUrl}/shifts`).then((res) => res.json()),
          fetch(`${baseUrl}/allocations`).then((res) => res.json()),
          fetch(`${baseUrl}/conflicts`).then((res) => res.json()),
          fetch(`${baseUrl}/buildings`).then((res) => res.json()),
          fetch(`${baseUrl}/classrooms`).then((res) => res.json()),
          fetch(`${baseUrl}/classroomRequests`).then((res) => res.json()),
          fetch(`${baseUrl}/shiftRequests`).then((res) => res.json()),
        ]);

        // Atualiza o estado da store com os dados carregados
        this.directors = directors;
        this.teachers = teachers;
        this.students = students;
        this.degrees = degrees;
        this.courses = courses;
        this.shifts = shifts;
        this.allocations = allocations;
        this.conflicts = conflicts;
        this.buildings = buildings;
        this.classrooms = classrooms;
        this.classroomRequests = classroomRequests;
        this.shiftRequests = shiftRequests;

        console.log("Dados carregados:", {
          courses,
          shifts,
          allocations : this.allocations,
          students : this.students,
          classrooms : this.classrooms,
          buildings : this.buildings,
        });
      } catch (error) {
        console.error("Erro ao carregar os dados do servidor:", error);
      } finally {
        this.isLoading = false;
      }
    },
    filterRequests() {
      console.log("User:", this.user);
      console.log("ClassroomRequests:", this.classroomRequests);
      console.log("ShiftRequests:", this.shiftRequests);
      if (!this.user) return [];

      let requests = [];
      if (this.user.role === "student") {
        requests = this.shiftRequests
          .filter((request) => String(request.studentId) === String(this.user.id) && (!request.status || request.status === "pending"))
          .map((request) => ({
            sender: this.students.find((s) => String(s.id) === String(request.studentId))?.name || "Desconhecido",
            type: "Troca de Turno",
            subject: `Turno ${request.shiftId}`,
            date: request.createdAt || new Date().toLocaleDateString("pt-PT"),
            isWarning: request.responseSeenByStudent === false,
          }));
      } else if (this.user.role === "teacher") {
        requests = this.classroomRequests
          .filter((request) => String(request.teacherId) === String(this.user.id) && (!request.status || request.status === "pending"))
          .map((request) => ({
            sender: this.teachers.find((t) => String(t.id) === String(request.teacherId))?.name || "Desconhecido",
            type: "Reserva de Sala",
            subject: `Sala ${request.classroomId}`,
            date: request.createdAt || new Date().toLocaleDateString("pt-PT"),
            isWarning: request.responseSeenByTeacher === false,
          }));
      } else if (this.user.role === "director") {
        requests = [
          ...this.shiftRequests
            .filter((request) => !request.status || request.status === "pending")
            .map((request) => ({
              sender: this.students.find((s) => String(s.id) === String(request.studentId))?.name || "Desconhecido",
              type: "Troca de Turno",
              subject: `Turno ${request.shiftId}`,
              date: request.createdAt || new Date().toLocaleDateString("pt-PT"),
              isWarning: request.responseSeenByStudent === false,
            })),
          ...this.classroomRequests
            .filter((request) => !request.status || request.status === "pending")
            .map((request) => ({
              sender: this.teachers.find((t) => String(t.id) === String(request.teacherId))?.name || "Desconhecido",
              type: "Reserva de Sala",
              subject: `Sala ${request.classroomId}`,
              date: request.createdAt || new Date().toLocaleDateString("pt-PT"),
              isWarning: request.responseSeenByTeacher === false,
            })),
        ];
      }
      console.log("Filtered Requests:", requests);
      return requests;
    },
  },
  getters: {
    getStudentById: (state) => (id) => state.students.find((student) => String(student.id) === String(id)),
    getTeacherById: (state) => (id) => state.teachers.find((teacher) => String(teacher.id) === String(id)),
    getDirectorById: (state) => (id) => state.directors.find((director) => String(director.id) === String(id)),
    getCourseById: (state) => (id) => {
      console.log("Procurando curso com ID:", id);
      const course = state.courses.find((course) => String(course.id) === String(id));
      console.log("Curso encontrado:", course);
      return course;
    },
    getCourseByDegree: (state) => (degreeId) => state.courses.filter((course) => String(course.degreeId) === String(degreeId)),
    getShiftsByCourse: (state) => (courseId) => state.shifts.filter((shift) => String(shift.courseId) === String(courseId)),
  },
});
