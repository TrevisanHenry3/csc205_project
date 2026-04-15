/** This store will contain all of the courses in the database */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref([]);
    const selectedCourseId = ref(null);
    const error = ref();

    // Computed property that contains the data for the selected course
    // selected from the existing courseList (no re-query with axios)
    const selectedCourse = computed(() => {
        // Iterate through the course list and choose the one that matches the selected Course ID
        return courses.value.find(c => c.course_id == selectedCourseId.value);
    })

    // Sets the selectedCourseId (called from the Course Component)
    const setSelectedCourse = (id) => {
        // selectedCourseId is reactive.  Therefore, when this value changes, 
        // selectedCourse will be recomputed to get the course details
        selectedCourseId.value = id;
    }

    // Axios call to get all of the courses. May only need to be called once if the course
    // list is not changing while using the application.
    const getCourses = async () => {
        error.value = null;
        const endpoint = 'https://checksheets.cscprof.com/courses';

        try {
            const response = await axios.get(endpoint);
            courses.value = response.data;

        } catch (err) {
            // More robust error handling
            if (axios.isAxiosError(err)) {
                // Access Axios-specific properties like response data
                error.value = err.response?.data?.message || err.message;
            } else if (err instanceof Error) {
                // Standard JS error
                error.value = err.message;
            } else {
                // Fallback for literal strings or unexpected throws
                error.value = String(err);
            }
        }
    }

    // These return values are the values and functions that are accessible from 
    // outside the store.  This of it like Public in an OO program
    return { courses, error, getCourses, selectedCourse, setSelectedCourse }
})