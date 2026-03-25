<script setup>
import { ref } from "vue";
import CourseCard from "@/components/CourseCard.vue";
import { VueDraggableNext } from 'vue-draggable-next';
import axios from 'axios';
import { useLoginStore } from '@/stores/login';


const token = useLoginStore();
const courses = ref(null);

async function getCourses() {
    try {
        const response = await axios.get('https://checksheets.cscprof.com/students', {
            headers: {
                'x-token': token.userToken
            }
        });
        courses.value = response.data;
        // console.log(courses.value[0]);
    }
    catch (error) {
        console.log(error);
    }
}

// Call axios to get the course listing
getCourses();


const fall26 = ref([
    {
        id: 1,
        title: 'Databases',
        number: 'CSC363',
        credits: 3,
        grade: 92,
    },
    {
        id: 2,
        title: 'Object Oriented Programming',
        number: 'CSC102',
        credits: 3,
        grade: 78,
    }
]);
const spring27 = ref([
    {
        id: 3,
        title: 'Algorithms',
        number: 'CSC204',
        credits: 3,
        grade: 85,
    }
]);


// Sample Course Data
const courseList = ref([
    {
        id: 4,
        title: 'Networks and Security',
        number: 'CSC351',
        credits: 4,
        grade: 88,
    },
    {
        id: 5,
        title: 'HTML',
        number: 'CSC190',
        credits: 1,
        grade: 52,
    },
]);

// const newCourses = ref(courseList)

const isOpen = ref(0);

// const courses = ref([
//     {
//         title: "Core"
//     },
//     {
//         title: "Major"
//     },
//     {
//         title: "Minor"
//     },
// ]);


</script>


<template>
    <div class="dashboardContainer">
        <!--LEFT SIDE-->
        <div class="degreeProgress">
            <div class="container">
                <h2>Steven Adams</h2>
            </div>
            <div class="container">
                <p>Freshman | 22 credits</p>
            </div>

            <div class="containerProgress">
                <label><strong>Major:</strong> Cybersecurity</label>
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
            <section class="column droppable">
                <h2>Fall 2026</h2>
                <!--https://www.youtube.com/watch?v=JlWL7TOoVLY-->
                <!-- <draggable v-model="fall26" tag="div">
                    <template #item="{ element: course }">
                        <li>{{ course }}</li>
                    </template>
</draggable> -->
                <VueDraggableNext :list="fall26" group="schedule" item-key="id" class="dropArea">
                    <CourseCard v-for="course in fall26" :key="course.id" :course="course" />
                </VueDraggableNext>
            </section>

            <section class="column droppable">
                <h2>Spring 2027</h2>
                <VueDraggableNext :list="spring27" group="schedule" item-key="id" class="dropArea">
                    <CourseCard v-for="course in spring27" :key="course.id" :course="course" />
                </VueDraggableNext>

            </section>
        </div>


        <!--RIGHT SIDE-->
        <div class="courseCatalog">
            <section>
                <!--Taken from https://oruga-ui.com/components/Collapse.html-->
                <o-collapse v-for="(collapse, index) of courses" :key="index" class="card" animation="slide"
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

                    <div class="card-content" style="border: 1px solid #eee; border-top: none;">
                        <div class="content" v-html="collapse.text"></div>
                        <div class="cardContent dragContainer">
                            <VueDraggableNext :list="courseList" group=schedule item-key="id" class="dropArea">
                                <CourseCard v-for="course in courseList" :key="course.id" :course="course" />
                            </VueDraggableNext>
                        </div>
                    </div>
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

.courseCatalog {
    display: flex;
    flex-direction: column;
    border: 2px solid;
    border-radius: 8px;
    margin-bottom: 200px;
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
    min-height: 300px;
}

.container {
    display: block;
}
</style>