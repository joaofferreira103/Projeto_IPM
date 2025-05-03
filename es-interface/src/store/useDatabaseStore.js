import { defineStore } from "pinia";
import database from "@/assets/database.json";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
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
  },
  getters: {
    getStudentById: (state) => (id) => state.students.find((student) => student.id === id),
    getTeacherById: (state) => (id) => state.teachers.find((teacher) => teacher.id === id),
    getCoursesByDegree: (state) => (degreeId) => state.courses.filter((course) => course.degreeId === degreeId),
    getShiftsByCourse: (state) => (courseId) => state.shifts.filter((shift) => shift.courseId === courseId),
  },
});