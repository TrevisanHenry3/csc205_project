<!--https://stackoverflow.com/questions/41764184/post-form-data-with-axios-in-node-js-->
<!-- Remaining Workflow
- Setup change password function and save that as post request?
 -->

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
    token.first = response.data[0].firstname;
    token.last = response.data[0].lastname;
    token.currentPass = response.data[0].password;
    // Debug Printing
    console.log('storeToken:', token.userToken)
    console.log('currentPass', token.currentPass)
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
      </form>

    </section>


  </div>
</template>

<style>
.login {
  margin-top: 2rem;
}
</style>
