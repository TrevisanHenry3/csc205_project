<script setup>
import { ref, onMounted } from 'vue';
import { useScheduleStore } from '@/stores/schedule';
import { useCoursesStore } from "@/stores/getCourses";
import { useStudentsStore } from "@/stores/student";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chart from 'chart.js/auto';
const schedule = useScheduleStore();
const coursesStore = useCoursesStore();
const studentStore = useStudentsStore();

const transfer = schedule.transfer;
const fall26 = schedule.fall26;
const spring27 = schedule.spring27;
const fall27 = schedule.fall27;
const spring28 = schedule.spring28;
const fall28 = schedule.fall28;
const spring29 = schedule.spring29;
const fall29 = schedule.fall29;
const spring30 = schedule.spring30;

const leftSchedule = [
    { id: transfer, name: 'Transfer' },
    { id: spring27, name: 'Spring 27' },
    { id: spring28, name: 'Spring 28' },
    { id: spring29, name: 'Spring 29' },
    { id: spring30, name: 'Spring 30' }
]
const rightSchedule = [
    { id: fall26, name: 'Fall 26' },
    { id: fall27, name: 'Fall 27' },
    { id: fall28, name: 'Fall 28' },
    { id: fall29, name: 'Fall 29' }
]

const columns = [
    { field: 'course_code', header: 'Code' },
    { field: 'course_name', header: 'Name' },
    { field: 'credits', header: 'Credits' }
];

const semesterData = [schedule.transferCredits, schedule.fall26Credits, schedule.spring27Credits,
schedule.fall27Credits, schedule.spring28Credits, schedule.fall28Credits,
schedule.spring29Credits, schedule.fall29Credits, schedule.spring30Credits
];
// Gemini assisted in how to create cumulative sum array from data
const cumulativeData = semesterData.reduce((acc, val, i) => {
    acc.push(i === 0 ? val : acc[i - 1] + val);
    return acc;
}, []);

const myChart = ref();
onMounted(() => {
    new Chart(myChart.value, {
        data: {
            datasets: [{
                type: 'bar',
                label: 'Credits per Semester',
                data: semesterData
            }, {
                type: 'line',
                label: 'Total Credits',
                data: cumulativeData
            }],
            labels: ['Transfer', 'Fall26', 'Spring27',
                'Fall27', 'Spring28', 'Fall28',
                'Spring29', 'Fall29', 'Spring30'
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});




function test() {
    console.log("transfer courses", schedule.transfer)
    console.log("transfer Credits", schedule.transferCredits)
};
</script>

<template>
    <div class="metricContainer">
        <div class="degreeProgress">
            <div class="container">
                <h2>Henry Trevisan</h2>
            </div>
            <div class="container">
                <p>{{ studentStore.classStanding }} | {{ studentStore.totalCredits }} credits</p>
            </div>

            <div class="containerProgress">
                <label><strong>Major:</strong> Computer Science</label>
                <div class="progressBar">
                    <div class="fill" :style="{ width: studentStore.majorCreditPercent + '%' }"></div>
                </div>
                <p>{{ studentStore.earnedMajorCredits }} / {{ coursesStore.majorCredits }}</p>
            </div>
            <div class="containerProgress">
                <label><strong>Minor:</strong> Data Science</label>
                <div class="progressBar">
                    <div class="fill" :style="{ width: studentStore.minorCreditPercent + '%' }"></div>
                </div>
                <p>{{ studentStore.earnedMinorCredits }} / {{ coursesStore.minorCredits }}</p>
            </div>
            <div class="containerProgress">
                <label><strong>Total:</strong></label>
                <div class="progressBar">
                    <div class="fill" :style="{ width: studentStore.totalCreditPercent + '%' }"></div>
                </div>
                <p>{{ studentStore.totalCredits }} / 120</p>
            </div>
            <div class="containerProgress">
                <label><strong>Credits in Progress:</strong> {{ studentStore.progressCredits }}</label>
            </div>
            <div class="containerProgress">
                <label><strong>Credits Scheduled:</strong> {{ studentStore.currentScheduledCredits }}</label>
            </div>
            <button @click="test">Test Function</button>
        </div>

        <!--Sample demo code-->
        <!-- <div v-for="(dataset, index) in allData" :key="index">
            <h3>{{ dataset.title }}</h3>
            <DataTable :value="dataset.items">
                <Column field="name" header="Name"></Column>
                <Column field="status" header="Status"></Column>
            </DataTable>
        </div> -->
        <div class="mainContent">
            <div class="chart">
                <canvas ref="myChart"></canvas>
            </div>
            <div class="metricSchedule">
                <div class="left">
                    <div class="primeVueTable">
                        <div v-for="table in leftSchedule" :key="table.name">
                            <DataTable :value="table.id">
                                <template #header>
                                    <div class="scheduleHeader">
                                        <span class="text-xl font-bold">{{ table.name }}</span>
                                    </div>
                                </template>
                                <!--Gemini assisted with syntax for selective slotProps styling of Primevue component-->
                                <Column v-for="(col, index) of columns" :key="col.field" :field="col.field"
                                    :header="col.header">
                                    <template #body="slotProps">
                                        <div :class="[{ 'core_course': index === 0 && slotProps.data.type === 'core' },
                                        { 'major_course': index === 0 && slotProps.data.type === 'major' },
                                        { 'minor_course': index === 0 && slotProps.data.type === 'minor' }]">
                                            {{ slotProps.data[col.field] }}
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="primeVueTable">
                        <div v-for="table in rightSchedule" :key="table.name">
                            <DataTable :value="table.id">
                                <template #header>
                                    <div class="scheduleHeader">
                                        <span class="text-xl font-bold">{{ table.name }}</span>
                                    </div>
                                </template>
                                <!--Gemini assisted with syntax for selective slotProps styling of Primevue component-->
                                <Column v-for="(col, index) of columns" :key="col.field" :field="col.field"
                                    :header="col.header">
                                    <template #body="slotProps">
                                        <div :class="[{ 'core_course': index === 0 && slotProps.data.type === 'core' },
                                        { 'major_course': index === 0 && slotProps.data.type === 'major' },
                                        { 'minor_course': index === 0 && slotProps.data.type === 'minor' }]">
                                            {{ slotProps.data[col.field] }}
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.metricContainer {
    display: grid;
    width: 100%;
    grid-template-columns: 325px 1fr;
}

.degreeProgress {
    display: flex;
    flex-direction: column;
    border: 2px solid;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 200px;
    min-height: 350px;
}

.metricSchedule {
    margin-left: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.mainContent {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chart {
    width: 600px;
    height: 300px;
}

.scheduleHeader {
    color: black;
    font-weight: 700;
}

.primeVueTable {
    display: flex;
    flex-direction: column;
    --p-datatable-header-cell-background: #ffcb71;
    border: 2px;
}

:deep(.p-datatable-tbody > tr) {
    background-color: bisque;
    color: black;
}

:deep(.core_course) {
    background-color: #ffff72;
    color: black;
}

:deep(.major_course) {
    background-color: #6a6afa;
    color: black;
}

:deep(.minor_course) {
    background-color: #f192b2;
    color: black;
}
</style>