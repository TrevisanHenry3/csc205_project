<script setup>
import { ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import CourseCard from "@/components/CourseCard.vue";
import { useScheduleStore } from '@/stores/schedule';
const schedule = useScheduleStore();

const isValid = ref(true);
const isHover = ref(false);

// Define props
const props = defineProps(['title', 'list', 'semesterId', 'scheduleId']);
defineExpose({
    semesterId: props.semesterId
})

// https://www.benmvp.com/blog/create-object-lookup-array-javascript-objects/
const semesterRules = {
    0: { name: 'Any', courseSemesters: [1, 2, 3, 4, 5, 6, 7] },
    1: { name: 'EvenFall', courseSemesters: [1, 3, 4] },
    2: { name: 'OddFall', courseSemesters: [1, 3, 5] },
    3: { name: 'EvenSpring', courseSemesters: [2, 3, 6] },
    4: { name: 'OddSpring', courseSemesters: [2, 3, 7] },
}

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

</script>


<template>
    <!--https://vuejs.org/guide/essentials/class-and-style -->
    <section class="column droppable" :class="{ 'isInvalid': !isValid && isHover, 'isValid': isValid }"
        @dragend="isValid = true" @dragstart="isHover = true" @dragexit="isHover = false" @mouseup="isHover = false">
        <h2>{{ title }}</h2>
        <VueDraggableNext :list="list" :move="checkMove" :semesterId="semesterId" :scheduleId="scheduleId"
            group="schedule" item-key="id" class="dropArea">
            <CourseCard v-for="course in list" :key="course.course_id" :course="course" />
        </VueDraggableNext>
    </section>
</template>


<style>
.dropArea {
    min-height: 100%;
}

.column {
    max-height: 900px;
}
</style>