<script setup>
import axios from 'axios';
import { useLoginStore } from '@/stores/login';
// https://primevue.org/datatable/ //
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, computed } from 'vue';


const token = useLoginStore();
const activeFilter = ref(false);
const selectedStudent = ref();

// All students
const students = ref();
// Only active students
// https://vuejs.org/guide/essentials/computed
const activeStudents = computed(() => {
  if (activeFilter.value) {
    return students.value.filter(student => student.is_active == 1);
  }
  else {
    return students.value;
  }
})

const columns = [
  { field: 'student_id', header: 'Student ID ' },
  { field: 'firstname', header: 'First Name ' },
  { field: 'lastname', header: 'Last Name ' },
  { field: 'credits', header: 'Credits' }
];


const getStudents = async () => {
  try {
    const response = await axios.get('https://checksheets.cscprof.com/students', {
      headers: {
        'x-token': token.userToken
      }
    });
    students.value = response.data;
    console.log('Get students successful');
    console.log(response.data);
  }

  catch (error) {
    console.log(error);
  }
}
getStudents();

// Update active status toggle
const updateActive = async (student) => {
  try {
    const header = {
      headers: {
        'x-token': token.userToken
      }
    }
    const data = {
      student_id: student.student_id,
      is_active: student.is_active
    }
    // https://iproyal.com/blog/axios-headers/
    const response = await axios.put('https://checksheets.cscprof.com/students', data, header);
  }
  catch (error) {
    console.log(error);
  }
}

</script>


<template>
  <div class="container">
    <div class="about">
      <h1>Student List</h1>
    </div>

    <o-field class="includeToggle">
      <o-switch v-model="activeFilter">
        Exclude Inactive Students
      </o-switch>
    </o-field>
    <div class="primeVueTable">
      <DataTable v-model:selection="selectedStudent" :value="activeStudents" selectionMode="single"
        :metaKeySelection="metaKey" dataKey="id" removableSort table-style="border: 2px solid">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
        <!--Gemini assisted code: Using scoped slots
            Finds the current student being processed and creates slotProp object
            Major column takes that info and accesses first result of major_name-->
        <Column header="Major">
          <template #body="slotProps">
            {{ slotProps.data.majors[0]?.major_name }}
          </template>
        </Column>
        <!--End Gemini assisted code-->
        <Column field="status" header="Status">
          <template #body="slotProps">
            <o-field>
              <o-switch v-model="slotProps.data.is_active" :true-value="1" :false-value="0"
                @change="updateActive(slotProps.data)">
                {{ slotProps.data.is_active ? 'Active' : 'Inactive' }}
              </o-switch>
            </o-field>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>


</template>

<style scoped>
.container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.about {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
}

.studentTable {
  width: 100%;
  border: 2px solid;
  border-radius: 8px;
}

.includeToggle {
  margin-left: auto;
}

.primeVueTable {
  display: flex;
  flex-direction: column;
  --p-datatable-header-cell-background: #ffcb71;
}

:deep(.p-datatable-tbody>tr>td) {
  padding: 5px;
}

:deep(.p-datatable-tbody > tr) {
  background-color: bisque;
  color: black;
}


/* Gemini recommeded using :deep to interact with PrimeVue */
:deep(.p-datatable-tbody > tr:hover > td) {
  background-color: #ffcb71;
}

@media (min-width: 1024px) {
  .about {
    min-height: 0 !important;
    display: block !important;
  }
}
</style>
<style>
.primeVueTable {
  --p-datatable-header-background: #ffcb71;
}
</style>