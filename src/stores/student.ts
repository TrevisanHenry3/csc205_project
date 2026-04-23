import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useScheduleStore } from "./schedule";

export const useStudentsStore = defineStore('student', () => {
    const schedule = useScheduleStore();
    const totalCredits = computed(() => {
        return schedule.passed.reduce((total, course) => {  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
            return total + course.credits;
        }, 0);
    });

    return { totalCredits }
}, { persist: true })