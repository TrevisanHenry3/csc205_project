import { defineStore } from "pinia";
import { ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
    const courses = ref([]);
    const coreCourses = ref([]);
    const majorCourses = ref([]);
    const scheduled = ref([]);
    const transfer = ref([]);
    const fall26 = ref([]);
    const spring27 = ref([]);
    const fall27 = ref([]);
    const spring28 = ref([]);
    const fall28 = ref([]);
    const spring29 = ref([]);
    const fall29 = ref([]);
    const spring30 = ref([]);
    


    return { courses, coreCourses, majorCourses, scheduled, transfer, fall26, spring27, fall27, spring28, fall28, spring29, fall29, spring30}
}, {persist: true})