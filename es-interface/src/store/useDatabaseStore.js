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
    filterRequests(){
      if (this.user) return [];
      if (this.user.role === "teacher") {
        return this.classroomRequests.filter(
          (request) => request.teacherId === this.user.id
        );
      } else if (this.user.role === "student") {
        return this.shiftRequests.filter(
          (request) => request.studentId === this.user.id
        );
      }
      return [];
    },
  },
  getters: {
    getStudentById: (state) => (id) => state.students.find((student) => student.id === id),
    getTeacherById: (state) => (id) => state.teachers.find((teacher) => teacher.id === id),
    getCourseById: (state) => (id) => state.courses.find((course) => course.id === id),
    getCourseByDegree: (state) => (degreeId) => state.courses.filter((course) => course.degreeId === degreeId),
    getShiftsByCourse: (state) => (courseId) => state.shifts.filter((shift) => shift.courseId === courseId),
  },
});