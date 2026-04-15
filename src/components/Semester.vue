<script setup>
import { ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import CourseCard from "@/components/CourseCard.vue";

const isValid = ref(true);
const isHover = ref(false);

// Define props
const props = defineProps(['title', 'list', 'semesterId']);
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
        isValid.value = false;
        return false
    }
    return true
}

</script>


<template>
    <!--https://vuejs.org/guide/essentials/class-and-style -->
    <section class="column droppable" :class="{ 'isInvalid': !isValid && isHover }" @dragend="isValid = true"
        @dragstart="isHover = true" @dragexit="isHover = false" @mouseup="isHover = false">
        <h2>{{ title }}</h2>
        <VueDraggableNext :list="list" :move="checkMove" :semesterId="semesterId" group="schedule" item-key="id"
            class="dropArea">
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