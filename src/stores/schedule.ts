import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
    //const scheduled = ref([]);
    const transfer = ref([]);
    const fall26 = ref([]);
    const spring27 = ref([]);
    const fall27 = ref([]);
    const spring28 = ref([]);
    const fall28 = ref([]);
    const spring29 = ref([]);
    const fall29 = ref([]);
    const spring30 = ref([]);

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

    return { scheduled, transfer, fall26, spring27, fall27, spring28, fall28, spring29, fall29, spring30 }
}, { persist: true })