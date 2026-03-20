<script setup>
import axios from 'axios';
import { useLoginStore } from '@/stores/login';
import ToggleButton from 'primevue/togglebutton';

// https://primevue.org/datatable/ //
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref } from 'vue';


const token = useLoginStore();
const students = ref();
const columns = [
  { field: 'student_id', header: 'Student ID' },
  { field: 'firstname', header: 'First Name' },
  { field: 'lastname', header: 'Last Name' },
  { field: 'majors', header: 'Major' },
  { field: 'credits', header: 'Credits' }
];

axios.interceptors.request.use(request => {
  console.log('--- AXIOS OUTGOING REQUEST ---');
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);
  console.log('Data (Body):', request.data);
  console.log('------------------------------');
  return request;
});

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
// const students = ref([
//   { id: 1, name: 'Steven Adams', major: 'Computer Science', credits: 30, status: true },
//   { id: 2, name: 'Cythia Baker', major: 'Computer Science', credits: 40, status: false },
//   { id: 3, name: 'Richard Condado', major: 'Cybersecurity', credits: 50, status: true }
// ]);
</script>


<template>
  <div class="container">
    <div class="about">
      <h1>Student List</h1>
    </div>

    <div class="primeVueTable">
      <DataTable v-model:selection="selectedStudent" :value="students" selectionMode="single"
        :metaKeySelection="metaKey" dataKey="id" removableSort table-style="border: 2px solid">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>

        <!-- <Column field="status" header="Status">
          <template #body="slotProps">
            <ToggleButton v-model="slotProps.data.status" class="w-6rem" onLabel="Active" offLabel="Inactive">
              <o-field>
                <o-switch v-model="slotProps.data.status">
                  {{ slotProps.data.status ? 'Active' : 'Inactive' }}
                </o-switch>
              </o-field>
            </ToggleButton>
          </template>
</Column> -->
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

.primeVueTable {
  display: flex;
  flex-direction: column;
  --p-datatable-header-cell-background: #ffcb71;
}

:deep(.p-datatable-tbody>tr>td) {
  padding: 5px;
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