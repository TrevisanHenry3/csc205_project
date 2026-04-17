<script setup lang="ts">
import { ref, computed } from "vue";
import Popover from 'primevue/popover';
import Dropdown from 'primevue/dropdown';


// Define props
const props = defineProps(['course']);
const open = ref();
const toggle = (event: any) => {
    open.value.toggle(event);
}

const semesters = ref([
    'Fall',
    'Spring',
    'Both',
    'Even Fall',
    'Odd Fall',
    'Even Spring',
    'Odd Spring',
]);


const selectedStatus = ref();
const courseStatus = ref([
    { name: 'Failed', icon: ['fas', 'xmark'] },
    { name: 'Passed', icon: ['fas', 'check'] },
    { name: 'In-Progress' },
    { name: 'Scheduled' },
    { name: 'Audit' },
    { name: 'Transfer' },
]);



// Computed property logic
// const hasPreReq = computed(() => {
//     const preReqArray = props.course.prereqs;

//     return Object.keys(preReqArray).length;
//     //     return 'Yes';
//     // }
//     // return null;
// });


</script>

<template>
    <div class="courseCard">
        <div class="cardLeft">
            <div class="categoryIndicator">
                <div class="fill"
                    :class="{ 'core': course.type == 'core', 'major': course.type == 'major', 'minor': course.type == 'minor' }"
                    style="height:100%;"></div>
            </div>
        </div>
        <div class="cardBody">
            <div class="cardCenter">
                <div class="courseName">
                    <label><strong>{{ course.course_code }}</strong></label>
                </div>
                <div class="courseInfo">
                    <p>{{ semesters[course.semester_id - 1] }}</p>
                    <div style="width: 20px;"></div>

                    <p @mouseover="toggle" @mouseleave="toggle">Pre-Reqs</p>
                    <Popover ref="open">
                        <ul>
                            <li v-for="prereq in course.prereqs" :key="prereq.course_id">
                                {{ prereq.course_code }} {{ prereq.course_name }}
                            </li>
                        </ul>
                    </Popover>
                </div>
            </div>
        </div>
        <div class="cardRight">
            <div class="progressIndicator">
                <!--https://v3.primevue.org/dropdown/#theming.unstyled-->
                <Dropdown v-model="course.status" :options="courseStatus" :class="{
                    'failed': course.status?.name == 'Failed',
                    'passed': course.status?.name == 'Passed',
                    'in-progress': course.status?.name == 'In-Progress',
                    'scheduled': course.status?.name == 'Scheduled',
                    'audit': course.status?.name == 'Audit',
                    'transfer': course.status?.name == 'Transfer'
                }" optionLabel="name">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="statusOptions">
                            <!-- <font-awesome-icon class="statusIcon" :icon="slotProps.value.icon"></font-awesome-icon> -->
                            <div class="selectLabel"><strong>{{ slotProps.value.name }}</strong></div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="statusOptions">
                            <!-- <font-awesome-icon class="statusIcon" :icon="slotProps.option.icon"></font-awesome-icon> -->
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Dropdown>
            </div>
            <div class="credits"><strong>{{ course.credits }} Cr</strong></div>
        </div>
    </div>
</template>

<style scoped>
.popup {
    background-color: white;
    margin: 10px;
}

.selectLabel {
    color: black
}


.statusOptions {
    display: flex;
}

.statusIcon {
    font-size: 15px;
    margin-right: 5px;
}

.courseCard {
    display: flex;
    border: 1px solid;
    border-radius: 8px;
    overflow: hidden;
    height: 80px;
    width: 100%;
    margin-bottom: 1rem;
}

.categoryIndicator {
    width: 10px;
    height: 100%;
    background-color: orange;
}

.cardBody {
    display: flex;
    flex: 1;
    padding: 10px;
}

.courseName {
    font-size: 1.5rem;
}

.courseInfo {
    display: flex;
    flex-direction: row;
}

.cardRight {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid;
    border-radius: 8px;
    margin-left: auto;
    max-width: 130px;
}

.progressIndicator {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.credits {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}

.fill {
    height: 100%;
    background: green;
}

.fill.core {
    height: 100%;
    background: yellow;
}

.fill.major {
    height: 100%;
    background: blue;
}

.fill.minor {
    height: 100%;
    background: palevioletred;
}

.failed {
    background: #ea6161;
}

.passed {
    background: #A3C1AD
}

.in-progress {
    background: #B9CBD9;
}

.scheduled {
    background: #f9e87a
}

.audit {
    background: #eb83f2
}

.transfer {
    background: #c38c2e;
}
</style>
