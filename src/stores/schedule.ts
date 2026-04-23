import { defineStore } from "pinia";
import { ref, computed } from 'vue'

interface Course {
    status: { name: string } // This is to fix the course.status type never error
    credits: number
}
export const useScheduleStore = defineStore('schedule', () => {
    const transfer = ref<Course[]>([]);
    const fall26 = ref<Course[]>([]);
    const spring27 = ref<Course[]>([]);
    const fall27 = ref<Course[]>([]);
    const spring28 = ref<Course[]>([]);
    const fall28 = ref<Course[]>([]);
    const spring29 = ref<Course[]>([]);
    const fall29 = ref<Course[]>([]);
    const spring30 = ref<Course[]>([]);

    const tempScheduled = computed(() => {
        return [
            transfer.value,
            fall26.value,
            spring27.value,
            fall27.value,
            spring28.value,
            fall28.value,
            spring29.value,
            fall29.value,
            spring30.value,
        ]
    })
    const scheduled = computed(() => {
        return tempScheduled.value.flat();
    });

    const passed = computed(() => {
        return scheduled.value.filter(item => {
            const status = item?.status?.name
            return ['Transfer', 'Passed'].includes(status)
        })
    })

    return { scheduled, passed, transfer, fall26, spring27, fall27, spring28, fall28, spring29, fall29, spring30 }
}, { persist: true })