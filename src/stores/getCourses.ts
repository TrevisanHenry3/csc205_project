import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useLoginStore } from '@/stores/login';
import { useScheduleStore } from '@/stores/schedule';


export const useCoursesStore = defineStore('courses', () => {

    const token = useLoginStore();
    const schedule = useScheduleStore();

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
            schedule.coreCourses = response.data.map(item => {
                return {
                    ...item.course,
                    type: 'core',
                    status: null
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    // These return values are the values and functions that are accessible from 
    // outside the store.  This of it like Public in an OO program
    return { token, schedule, getCoreCourses }
})