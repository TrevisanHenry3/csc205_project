<script setup>
import { ref, computed } from "vue";
import CourseCard from "@/components/CourseCard.vue";
import Semester from "@/components/Semester.vue";
import { VueDraggableNext } from 'vue-draggable-next';
import { useScheduleStore } from '@/stores/schedule';
import { useCoursesStore } from "@/stores/getCourses";
const schedule = useScheduleStore();
const coursesStore = useCoursesStore();


if (coursesStore.coreCourses.length < 1) {
    coursesStore.getCoreCourses();
}
if (coursesStore.majorCourses.length < 1) {
    coursesStore.getMajorCourses();
}
if (coursesStore.minorCourses.length < 1) {
    coursesStore.getMinorCourses();
}




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

const restriction = computed(() => {
    if (props.course.minimum_credits == 28) {
        return 'Sophomore';
    } else if (props.course.minimum_credits == 60) {
        return 'Junior';
    }
});

// https://www.npmjs.com/package/vue-draggable-next
const checkMove = (event) => {
    const targetSemester = event.relatedContext.component;
    const targetID = targetSemester.$attrs.semesterId;
    const draggedItem = event.draggedContext.element;
    const hasPreReq = Array.isArray(draggedItem.prereqs) && draggedItem.prereqs.length > 0

    //console.log('Dragging:', draggedItem.course_code, 'courseSemesterId', draggedItem.semester_id, 'into Semester:', targetID);

    // Check if courseCard semester.id is within the courseSemesters related to this semesterID
    const id = semesterRules[targetID]
    const allowedIds = id.courseSemesters;
    const compatible = allowedIds.includes(draggedItem.semester_id)
    //First check if semesters match
    if (!compatible) {
        return false
    }
    //Second check if prereq courses match
    else if (hasPreReq) {
        console.log("True has PreReq", draggedItem.prereqs)

        // Gemini assisted for how to check array of arrays contains a certain value
        // Also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
        // .every checks each prereq value of draggedItem.prereqs array
        // .some goes through scheduled array to see if prereq 
        const isSchedulable = draggedItem.prereqs.every((prereq) => {   //prereq is input from prereqs array - return checks if course is scheduled and gives true/false output
            return schedule.scheduled.some((course) => {
                return course.course_id === prereq.course_id;
            });
        });


        if (isSchedulable) {
            if (draggedItem.minimum_credits > 0) {
                if (draggedItem.minimum_credits == 28) {
                    alert("Must be a Sophomore to take this course")
                }
                else if (draggedItem.minimum_credits == 60) {
                    alert("You must be a Junior to take this course")
                }
            }
            return true
        }
        else {
            alert("Prereqs not met for ", draggedItem.course_code)
            return false
        }
    }
    return true
}
/////////////////
/////////////////

function showSchedule() {
    console.log("Scheduled Courses", schedule.scheduled)
    console.log(schedule.scheduled.length)
}

</script>


<template>
    <div class="dashboardContainer">
        <!--LEFT SIDE-->
        <div class="degreeProgress">
            <div class="container">
                <h2>Henry Trevisan</h2>
            </div>
            <div>
                <button @click="showSchedule">Click</button>
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

                    <div v-if="collapse.title == 'Core'" class="card-content"
                        style="border: 1px solid #eee; border-top: none;">
                        <div class="content" v-html="collapse.text"></div>
                        <div class="cardContent dragContainer">
                            <VueDraggableNext :list="coursesStore.coreCourses" :move="checkMove" :semesterId="0"
                                group="schedule" item-key="id" class="dropArea">
                                <CourseCard v-for="coreCourse in coursesStore.coreCourses" :key="coreCourse.course_id"
                                    :course="coreCourse" />
                            </VueDraggableNext>
                        </div>
                    </div>
                    <div v-else-if="collapse.title == 'Major' && coursesStore.majorCourses.length > 0"
                        class="card-content" style="border: 1px solid #eee; border-top: none;">
                        <div class="content" v-html="collapse.text"></div>
                        <div class="cardContent dragContainer">
                            <!--Gemini helped explain how to access data structure
                                Need to take first element of major array structure
                                And access courses property-->
                            <VueDraggableNext :list="coursesStore.majorCourses" :move="checkMove" :semesterId="0"
                                group="schedule" item-key="id" class="dropArea">
                                <CourseCard v-for="majorCourse in coursesStore.majorCourses"
                                    :key="majorCourse.course_id" :course="majorCourse" />
                            </VueDraggableNext>
                        </div>
                    </div>
                    <div v-if="collapse.title == 'Minor'" class="card-content"
                        style="border: 1px solid #eee; border-top: none;">
                        <div class="content" v-html="collapse.text"></div>
                        <div class="cardContent dragContainer">
                            <VueDraggableNext :list="coursesStore.minorCourses" :move="checkMove" :semesterId="0"
                                group="schedule" item-key="id" class="dropArea">
                                <CourseCard v-for="minorCourse in coursesStore.minorCourses"
                                    :key="minorCourse.course_id" :course="minorCourse" />
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

.column.isInvalid {
    border-color: red;
}

.column.isValid {
    border-color: black;
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