<!--Get current password and check that user value matches on submit-->
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import { useLoginStore } from '@/stores/login';
import { useRouter } from 'vue-router';


const newPassword = ref('');
const router = useRouter();
const token = useLoginStore();
const changeSuccess = ref(false);
const passMatch = ref(true);

const inputPass = ref('');
const currentPass = 'writemedown'


const changePass = async () => {
  console.log('Running changePass');

  if (inputPass.value != currentPass) {
    passMatch.value = false;
    return;
  }

  try {
    const header = {
      headers: {
        'x-token': token.userToken
      }
    }
    const data = {
      password: newPassword.value
    }
    const response = await axios.put('https://checksheets.cscprof.com/auth/passwordreset', data, header);
    changeSuccess.value = true;
    passMatch.value = true;
    // Debug Printing
    console.log('changeSuccess:', changeSuccess)
    console.log('Rest password to:', newPassword)
    // Redirect upon login
    //router.push('/list')
  }

  catch (error) {
    console.log(error);
  }
}
</script>


<template>
  <div class="change" style="text-align: center;">
    <section style="margin-top: 5rem;">

      <form @submit.prevent="changePass" id="changePassForm">
        <o-field label="Current Password">
          <o-input v-model="inputPass" placeholder="" size="medium" />
          <span id="passwordAuth" v-if="inputPass.length > 0 && passMatch === false">Password Incorrect</span>
        </o-field>

        <o-field label="New Password">
          <o-input v-model="newPassword" placeholder="" size="medium" password-reveal />
        </o-field>
        <!-- <o-field label="Confirm New Password">
          <o-input placeholder="" size="medium" password-reveal />
        </o-field> -->

        <o-button class="change" type="submit" size="default" variant="info">Confirm and Update</o-button>
      </form>
    </section>
    <template v-if="changeSuccess">
      <div class="info">
        <span>Password changed successfully</span>
        <span>You may close this tab and continue working</span>
      </div>
    </template>
  </div>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.info {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: large;
}

#passwordAuth {
  display: flex;
  flex-direction: column;
  color: red;
}
</style>