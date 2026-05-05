import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useLoginStore } from '@/stores/login';


export const useCoursesStore = defineStore('courses', () => {

    const coreCourses = ref([]);
    const majorCourses = ref([]);
    const minorCourses = ref([]);
    const majorCredits = ref();
    const minorCredits = ref();
    const token = useLoginStore();

    async function getCoreCourses() {
        console.log('Running getCoreCourses');
        try {
            const response = await axios.get('https://checksheets.cscprof.com/courses/core/prereqs', {
                headers: { 'x-token': token.userToken }
            });
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
            // Go through the response data from axios call and use .map to assign each to new coreCourses.value
            // Returns new course object for each item in loop with defined type and status
            // ...item.course takes all properties of item.course
            coreCourses.value = response.data.map(item => {
                return {
                    ...item.course,
                    type: 'core',
                    status: null,
                    schedule: null,
                    scheduleId: 0
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getMajorCourses() {
        console.log('Running getMajorCourses');
        try {
            const response = await axios.get('https://checksheets.cscprof.com/courses/major/1/prereqs', {
                headers: {
                    'x-token': token.userToken
                }
            });
            majorCourses.value = response.data[0].courses.map(course => {
                return {
                    ...course,
                    type: 'major',
                    status: null,
                    schedule: null,
                    scheduleId: 0
                }
            })
            majorCredits.value = majorCourses.value.reduce((sum, item) => sum + item.credits, 0);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getMinorCourses() {
        console.log('Running getMinorCourses');
        try {
            const response = await axios.get('https://checksheets.cscprof.com/courses/minor/3/prereqs', {
                headers: {
                    'x-token': token.userToken
                }
            });
            minorCourses.value = response.data[0].courses.map(course => {
                return {
                    ...course,
                    type: 'minor',
                    status: null,
                    schedule: null,
                    scheduleId: 0
                }
            })
            minorCredits.value = minorCourses.value.reduce((sum, item) => sum + item.credits, 0);
        }
        catch (error) {
            console.log(error);
        }
    }
    return { coreCourses, majorCourses, minorCourses, getCoreCourses, getMajorCourses, getMinorCourses, majorCredits, minorCredits }
}, { persist: true })