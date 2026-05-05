import { defineStore } from "pinia";
import { ref, computed, onMounted } from 'vue'
import { useScheduleStore } from "./schedule";
import { useCoursesStore } from "./getCourses";


export const useStudentsStore = defineStore('student', () => {

    const coursesStore = useCoursesStore();
    const schedule = useScheduleStore();
    const minorCredits = ref(0);

    const classStanding = computed(() => {
        if (totalCredits.value < 30) {
            return 'Freshman'
        }
        else if (totalCredits.value < 60) {
            return 'Sophomore'
        }
        else if (totalCredits.value < 90) {
            return 'Junior'
        }
        else {
            return 'Senior'
        }
    })

    const totalCredits = computed(() => {
        return schedule.passed.reduce((total, course) => {  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
            return total + course.credits;
        }, 0);
    });

    const earnedMajorCredits = computed(() => {
        return schedule.passed.filter(item => item.type === 'major')
            .reduce((sum, item) => sum + item.credits, 0);
    })

    const earnedMinorCredits = computed(() => {
        return schedule.passed.filter(item => item.type === 'minor')
            .reduce((sum, item) => sum + item.credits, 0);
    })

    const progressCredits = computed(() => {
        return schedule.progress.reduce((sum, item) => sum + item.credits, 0);
    });
    const currentScheduledCredits = computed(() => {
        return schedule.currentScheduled.reduce((sum, item) => sum + item.credits, 0);
    });

    const majorCreditPercent = (earnedMajorCredits.value / coursesStore.majorCredits) * 100
    const minorCreditPercent = (earnedMinorCredits.value / coursesStore.minorCredits) * 100
    const totalCreditPercent = (totalCredits.value / 120) * 100

    return { totalCredits, minorCredits, earnedMajorCredits, earnedMinorCredits, progressCredits, currentScheduledCredits, majorCreditPercent, minorCreditPercent, totalCreditPercent, classStanding }
}, { persist: true })