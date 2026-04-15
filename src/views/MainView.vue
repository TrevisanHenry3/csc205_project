<script setup>
import { ref } from "vue";
import axios from 'axios';
import CourseCard from "@/components/CourseCard.vue";
import Semester from "@/components/Semester.vue";
import { VueDraggableNext } from 'vue-draggable-next';
import { useLoginStore } from '@/stores/login';
import { useScheduleStore } from '@/stores/schedule';
const schedule = useScheduleStore();


const token = useLoginStore();
const courses = ref([]);
const coreCourses = ref([]);
const majorCourses = ref([]);
// const scheduled = ref([]);
// const transfer = ref([]);
// const fall26 = ref([]);
// const spring27 = ref([]);
// const fall27 = ref([]);
// const spring28 = ref([]);
// const fall28 = ref([]);
// const spring29 = ref([]);
// const fall29 = ref([]);
// const spring30 = ref([]);



async function getCourses() {
    console.log('Running getCourses');
    try {
        const response = await axios.get('https://checksheets.cscprof.com/courses', {
            headers: {
                'x-token': token.userToken
            }
        });
        courses.value = response.data;
    }
    catch (error) {
        console.log(error);
    }
}
// Call axios to get the course listing
getCourses();


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
getCoreCourses();

async function getMajorCourses() {
    console.log('Running getCoreCourses');
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
                status: null
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}
getMajorCourses();




const isOpen = ref(0);

const courseCategories = ref([
    {
        title: "Core"
    },
    {
        title: "Major"
    },
    {
        title: "Minor"
    },
]);


////////////////////////////////////////////////////
//Need to easily bring this over from Semester.vue//
////////////////////////////////////////////////////
const semesterRules = {
    0: { name: 'Any', courseSemesters: [1, 2, 3, 4, 5, 6, 7] },
    1: { name: 'EvenFall', courseSemesters: [1, 3, 4] },
    2: { name: 'OddFall', courseSemesters: [1, 3, 5] },
    3: { name: 'EvenSpring', courseSemesters: [2, 3, 6] },
    4: { name: 'OddSpring', courseSemesters: [2, 3, 7] },
}
const checkMove = (event) => {
    const targetSemester = event.relatedContext.component;
    const targetID = targetSemester.$attrs.semesterId;
    const draggedItem = event.draggedContext.element;

    //console.log('Dragging:', draggedItem.course_code, 'courseSemesterId', draggedItem.semester_id, 'into Semester:', targetID);

    // Check if courseCard semester.id is within the courseSemesters related to this semesterID
    const id = semesterRules[targetID]
    const allowedIds = id.courseSemesters;

    // Don't allow moving locked items
    const compatible = allowedIds.includes(draggedItem.semester_id)
    if (!compatible) {
        return false
    }

    return true
}
/////////////////
/////////////////



</script>


<template>
    <div class="dashboardContainer">
        <!--LEFT SIDE-->
        <div class="degreeProgress">
            <div class="container">
                <h2>Henry Trevisan</h2>
            </div>
            <div class="container">
                <p>Freshman | 22 credits</p>
            </div>

            <div class="containerProgress">
                <label><strong>Major:</strong> Computer Science</label>
                <div class="progressBar">
                    <div class="fill" style="width: 25%;"></div>
                </div>
                <p>6 / 24</p>
            </div>
            <div class="containerProgress">
                <label><strong>Minor:</strong> Data Science</label>
                <div class="progressBar">
                    <div class="fill" style="width: 17%;"></div>
                </div>
                <p>3 / 18</p>
            </div>
            <div class="containerProgress">
                <label><strong>Total:</strong></label>
                <div class="progressBar">
                    <div class="fill" style="width: 25%;"></div>
                </div>
                <p>30 / 120</p>
            </div>
        </div>


        <!--CENTER-->
        <div class="scheduleLayout">
            <Semester title="Transfer" :list="schedule.transfer" :semesterId="0"></Semester>
            <Semester title="Fall 26" :list="schedule.fall26" :semesterId="1"></Semester>
            <Semester title="Spring 27" :list="schedule.spring27" :semesterId="4"></Semester>
            <Semester title="Fall 27" :list="schedule.fall27" :semesterId="2"></Semester>
            <Semester title="Spring 28" :list="schedule.spring28" :semesterId="3"></Semester>
            <Semester title="Fall 28" :list="schedule.fall28" :semesterId="1"></Semester>
            <Semester title="Spring 29" :list="schedule.spring29" :semesterId="4"></Semester>
            <Semester title="Fall 29" :list="schedule.fall29" :semesterId="2"></Semester>
            <Semester title="Spring 30" :list="schedule.spring30" :semesterId="3"></Semester>
        </div>


        <!--RIGHT SIDE-->
        <div class="courseCatalog">
            <section>
                <!--Taken from https://oruga-ui.com/components/Collapse.html-->
                <o-collapse v-for="(collapse, index) of courseCategories" :key="index" class="card" animation="slide"
                    :open="isOpen === index" @update:open="isOpen = (isOpen === index ? null : index)">
                    <template #trigger="{ open }">
                        <div class="card-header"
                            style="cursor: pointer; display: flex; justify-content: space-between;">
                            <span class="card-header-title">
                                {{ collapse.title }}
                            </span>
                            <span class="card-header-icon">
                                <o-icon :icon="open ? 'caret-up' : 'caret-down'" />
                            </span>
                        </div>
                    </template>

                    <div v-if="collapse.title == 'Core' && schedule.coreCourses.length > 0" class="card-content"
                        style="border: 1px solid #eee; border-top: none;">
                        <div class="content" v-html="collapse.text"></div>
                        <div class="cardContent dragContainer">
                            <VueDraggableNext :list="schedule.coreCourses" :move="checkMove" :semesterId="0"
                                group="schedule" item-key="id" class="dropArea">
                                <CourseCard v-for="coreCourse in schedule.coreCourses" :key="coreCourse.course_id"
                                    :course="coreCourse" />
                            </VueDraggableNext>
                        </div>
                    </div>
                    <div v-else-if="collapse.title == 'Major' && majorCourses.length > 0" class="card-content"
                        style="border: 1px solid #eee; border-top: none;">
                        <div class="content" v-html="collapse.text"></div>
                        <div class="cardContent dragContainer">
                            <!--Gemini helped explain how to access data structure
                                Need to take first element of major array structure
                                And access courses property-->
                            <VueDraggableNext :list="majorCourses" :move="checkMove" :semesterId="0" group="schedule"
                                item-key="id" class="dropArea">
                                <CourseCard v-for="majorCourse in majorCourses" :key="majorCourse.course_id"
                                    :course="majorCourse" />
                            </VueDraggableNext>
                        </div>
                    </div>
                    <!-- <div class="card-content" style="border: 1px solid #eee; border-top: none;">
                        <div class="content" v-html="collapse.text"></div>
                        <div class="cardContent dragContainer">
                            <VueDraggableNext :list="courses" :move="checkMove" :semesterId="0" group="schedule"
                                item-key="id" class="dropArea">
                                <CourseCard v-for="course in courses" :key="course.course_id" :course="course" />
                            </VueDraggableNext>
                        </div>
                    </div> -->
                </o-collapse>
                <div>
                </div>
            </section>

        </div>
    </div>
</template>


<!--STYLES-->
<style>
.dashboardContainer {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 50% 1fr;
    gap: 30px;
    color: black !important;
}

.degreeProgress {
    display: flex;
    flex-direction: column;
    border: 2px solid;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 200px;
    min-height: 300px;
    max-height: 300px;
}

.containerProgress {
    flex: 1;
}

.progressBar {
    flex-grow: 1;
    height: 12px;
    border-radius: 8px;
    border: 1px solid;
}

.fill {
    height: 100%;
    background: green;
}

.scheduleLayout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.column {
    border: 2px solid;
    padding: 10px;
    border-radius: 8px;
    min-height: 300px;
    text-align: center;
}

.column.isInvalid {
    border-color: red;
}

.courseCatalog {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    height: 80vh;
    overflow-y: auto;
    border: 2px solid;
    border-radius: 8px;
    margin-bottom: 20px;
}

.collapsible {
    background-color: bisque;
    color: #444;
    cursor: pointer;
    width: 100%;
    border: 1px solid;
    border-radius: 8px;
    text-align: left;
    font-size: 20px;
}

.courses {
    padding: 0 18px;
    display: none;
    overflow: hidden;
}

.active,
.collapsible:hover {
    background-color: #ffcb71;
}

/* Taken from oruga demo */
.card {
    position: relative;
    background-color: bisque !important;
}

.collapse-trigger {
    width: 100%;
    overflow: hidden;
}

.collapse-trigger:hover {
    background-color: #ffcb71 !important;
}

.card-header {
    display: flex;
    align-items: center;
}

.card-header-title {
    flex-grow: 1;
    font-weight: 700;
    padding: 0.75rem;
}

.card-header-icon {
    cursor: pointer;
    padding: 0.75rem;
}

.cardContent {
    display: flex;
    flex-direction: column;
}

.dropArea {
    min-height: 100%;
}

.container {
    display: block;
}
</style>