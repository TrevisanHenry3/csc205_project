<!--https://stackoverflow.com/questions/41764184/post-form-data-with-axios-in-node-js-->
<!-- Remaining Workflow
- Setup change password function and save that as post request?
- Dynamically add data to table 
- Create multiple students and loop through returned data arrays for each student? -->

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import { useLoginStore } from '@/stores/login';
import { useRouter } from 'vue-router';


//Form variables
const username = ref('');
const password = ref('');
// Using Pinia variable
const token = useLoginStore();
// Vue Router variable
const router = useRouter();


// DEBUG WORK from Gemini //
axios.interceptors.request.use(request => {
  console.log('--- AXIOS OUTGOING REQUEST ---');
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);
  console.log('Data (Body):', request.data);
  console.log('------------------------------');
  return request;
});
///////////////

const login = async () => {
  try {
    const response = await axios.post('https://checksheets.cscprof.com/auth/login', {
      username: username.value,
      password: password.value,
    });

    token.userToken = response.data[0].user_guid;
    // Debug Printing
    console.log('storeToken:', token.userToken)
    // Redirect upon login
    router.push('/list')
  }

  catch (error) {
    console.log(error);
  }
}

</script>



<template>

  <div id="login">
    <h1 style="margin-bottom: 2rem; font-size: 2rem;">Geneva Checksheets</h1>
    <img src="/assets/genevaLogo.png" width="120px">
    <h2 style="font-size: 1.5rem;">Login</h2>



    <section style="margin-top: 5rem;">
      <form @submit.prevent="login" id="loginForm">
        <o-field label="Username">
          <o-input v-model="username" placeholder="Username" size="medium" />
        </o-field>

        <o-field label="Password">
          <o-input v-model="password" type="password" placeholder="Password" size="medium" password-reveal />
        </o-field>

        <o-button class="login" type="submit">Login</o-button>
        <!--@click="$router.push('list')"-->
      </form>

    </section>


  </div>
</template>

<style>
.login {
  margin-top: 2rem;
}
</style>




<!-- Placeholder for a single major -->
<!-- <p id="datablock">Basic content waiting for a major to show up</p>

        <button class="button is-success is-small" onclick="fetchAMajor()">
          Get A Major
        </button>
        <button class="button is-danger is-small" onclick="resetParagraph()">
          Reset
        </button>
      </section>

      <section class="mt-3">
        <h2 class="is-size-4">List of Majors</h2>
        <!-- Placeholder for list of majors-->
<!-- <ul id="majorlist"></ul>
      </section>
    </div> -->

<!-- Import the axios librarry -->
<!-- <script src="./node_modules/axios/dist/axios.min.js"></script>

    <script>

      // Define variable to hold the paragraph with ID=datablock
      const DataBlock = document.getElementById("datablock");

      // Define variable to hold the empty list of majors
      const MajorList = document.getElementById("majorlist");

      // Process an array of data and append the values to a list on the page
      function fetchMajors() {
        var data;

        console.log("---------- 1. Entering axios ----------");

        // Make a request for a course with a given ID
        // .get() and .then() will execute the .get.  .then() is called when the promise is fulfilled
        axios
          .get("https://checksheets.cscprof.com/majors")
          //Then function -- now that we have data, what do we do
          .then(function (response) {
            // handle success
            console.log("---------- 2. in .then() ----------");

            majors = response.data;

            console.log(majors);
            //Shortcut forEach loop (what do you want forEach to do in ())
            majors.forEach((major) => {
              data = major.major_abbreviation + " - " + major.major_name;

              var li = document.createElement("li");
              li.textContent = data;

              MajorList.appendChild(li);
            });
          })

          .catch(function (error) {
            console.log("In error()");
            // handle error
            console.log(error);
          })
          .finally(function () {
            console.log("---------- 3. in finally() ---------- ");
            // always executed
          });

        console.log("---------- 4. After axios call ---------- ");
      } -->
