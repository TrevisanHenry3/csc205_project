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

    const transferCredits = computed(() => {
        return transfer.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const fall26Credits = computed(() => {
        return fall26.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const spring27Credits = computed(() => {
        return spring27.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const fall27Credits = computed(() => {
        return fall27.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const spring28Credits = computed(() => {
        return spring28.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const fall28Credits = computed(() => {
        return fall28.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const spring29Credits = computed(() => {
        return spring29.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const fall29Credits = computed(() => {
        return fall29.value.reduce((sum, item) => sum + item.credits, 0);
    })
    const spring30Credits = computed(() => {
        return spring30.value.reduce((sum, item) => sum + item.credits, 0);
    })

    const passed = computed(() => {
        return scheduled.value.filter(item => {
            const status = item?.status?.name
            return ['Transfer', 'Passed'].includes(status)
        })
    })

    const progress = computed(() => {
        return scheduled.value.filter(item => {
            const status = item?.status?.name
            return ['In-Progress'].includes(status)
        })
    })

    const currentScheduled = computed(() => {
        return scheduled.value.filter(item => {
            const status = item?.status?.name
            return ['Scheduled'].includes(status)
        })
    })

    return {
        scheduled, passed, progress, currentScheduled, transfer, fall26, spring27, fall27, spring28, fall28, spring29, fall29, spring30,
        transferCredits, fall26Credits, spring27Credits, fall27Credits, spring28Credits, fall28Credits, spring29Credits, fall29Credits, spring30Credits
    }
}, { persist: true })