<script setup>
import { ref, computed } from "vue";
import CourseCard from "@/components/CourseCard.vue";
import Semester from "@/components/Semester.vue";
import { VueDraggableNext } from 'vue-draggable-next';
import { useScheduleStore } from '@/stores/schedule';
import { useCoursesStore } from "@/stores/getCourses";
import { useStudentsStore } from "@/stores/student";
const schedule = useScheduleStore();
const coursesStore = useCoursesStore();
const studentStore = useStudentsStore();


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
    const targetSemester = event.relatedContext.component;      //The semester being dropped into
    const targetID = targetSemester.$attrs.semesterId;          //The semesterRules Id for targetSemester
    const targetScheduleID = targetSemester.$attrs.scheduleId   //The chronological semester ID for targetSemester
    const draggedItem = event.draggedContext.element;           //The course card being dragged
    //Make into array and check if it has items
    const hasPreReq = Array.isArray(draggedItem.prereqs) && draggedItem.prereqs.length > 0
    //https://stackoverflow.com/questions/4020796/finding-the-max-value-of-a-property-in-an-array-of-objects
    const prereqMaxId = Math.max(...draggedItem.prereqs.map(prereq => {
        const temp = schedule.scheduled.find(course => course.course_id === prereq.course_id);
        return temp.scheduleId;
    }))

    // console.log("prereq Schedule ID", draggedItem.prereqs[0].scheduleId)
    // console.log("dragged course", draggedItem)
    // console.log("prereq course", draggedItem.prereqs)
    // console.log("prereqMaxID", prereqMaxId)
    // console.log('Dragging:', draggedItem.course_code, 'dragged Item semester', draggedItem.semester_id, 'into Semester:', targetSemester.$attrs);

    // Check if courseCard semester.id is within the courseSemesters related to this semesterID
    const id = semesterRules[targetID]
    const allowedIds = id.courseSemesters;
    const compatible = allowedIds.includes(draggedItem.semester_id)
    //First check if allowed semesters match
    if (!compatible) {
        return false
    }
    //Second check if all prereq courses have been scheduled
    else if (hasPreReq) {
        // Gemini assisted for how to check array of arrays contains a certain value
        // Also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
        // .every checks each prereq value of draggedItem.prereqs array
        // .some goes through scheduled array to see if prereq 
        const isSchedulable = draggedItem.prereqs.every((prereq) => {   //prereq is input from prereqs array - return checks if course is scheduled and gives true/false output
            return schedule.scheduled.some((course) => {
                return course.course_id === prereq.course_id;
            });
        });

        // If the course has all prereqs scheduled -- make sure prereqs are scheduled before targetSemester
        // Then check if the course has min credits requirements
        if (isSchedulable) {

            if (draggedItem.minimum_credits > 0) {
                if (draggedItem.minimum_credits == 28 && studentStore.totalCredits < 28) {
                    alert("Must be a Sophomore to take this course")
                    return false
                }
                else if (draggedItem.minimum_credits == 60 && studentStore.totalCredits < 60) {
                    alert("You must be a Junior to take this course")
                    return false
                }
            }
            // Turn draggedItem.prereq into the max value of the scheduleId of every prereq course
            if (targetScheduleID < prereqMaxId) {
                alert("Course cannot be scheduled before prereqs")
                return false
            }

        }
        else {
            alert("Prereqs not met for ", draggedItem.course_code)
            return false
        }
    }
    draggedItem.scheduleId = targetScheduleID;
    console.log("scheduleId", draggedItem.scheduleId)
    return true
}
/////////////////
/////////////////

function showPassed() {
    console.log("Passed Courses", schedule.passed)
}
function showCredits() {
    console.log("Credits", studentStore.totalCredits)
}


</script>


<template>
    <div class="dashboardContainer">
        <!--LEFT SIDE-->
        <div class="degreeProgress">
            <div class="container">
                <h2>Henry Trevisan</h2>
            </div>
            <div class="container">
                <p>Sophomore | 55 credits</p>
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
            <Semester title="Transfer" :list="schedule.transfer" :semesterId="0" :scheduleId="0"></Semester>
            <Semester title="Fall 26" :list="schedule.fall26" :semesterId="1" :scheduleId="1"></Semester>
            <Semester title="Spring 27" :list="schedule.spring27" :semesterId="4" :scheduleId="2"></Semester>
            <Semester title="Fall 27" :list="schedule.fall27" :semesterId="2" :scheduleId="3"></Semester>
            <Semester title="Spring 28" :list="schedule.spring28" :semesterId="3" :scheduleId="4"></Semester>
            <Semester title="Fall 28" :list="schedule.fall28" :semesterId="1" :scheduleId="5"></Semester>
            <Semester title="Spring 29" :list="schedule.spring29" :semesterId="4" :scheduleId="6"></Semester>
            <Semester title="Fall 29" :list="schedule.fall29" :semesterId="2" :scheduleId="7"></Semester>
            <Semester title="Spring 30" :list="schedule.spring30" :semesterId="3" :scheduleId="8"></Semester>
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