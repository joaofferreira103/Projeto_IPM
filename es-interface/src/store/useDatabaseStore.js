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
      return this.classroomRequests.filter((request) => request.status === "pending");
    },
  },
  getters: {
    getStudentById: (state) => (id) => state.students.find((student) => student.id === id),
    getTeacherById: (state) => (id) => state.teachers.find((teacher) => teacher.id === id),
    getDirectorById: (state) => (id) => state.directors.find((director) => director.id === id),
    getCourseById: (state) => (id) => {
      console.log("Procurando curso com ID:", id);
      const course = state.courses.find((course) => course.id === id.toString());
      console.log("Curso encontrado:", course);
      return course;
    },
    getCourseByDegree: (state) => (degreeId) => state.courses.filter((course) => course.degreeId === degreeId),
    getShiftsByCourse: (state) => (courseId) => state.shifts.filter((shift) => shift.courseId === courseId),
  },
});