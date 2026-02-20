<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>

  <div id="login">
    <h1 style="margin-bottom: 2rem; font-size: 2rem;">Geneva Checksheets</h1>
    <img src="/assets/genevaLogo.png" width="120px">
    <h2 style="font-size: 1.5rem;">Login</h2>

    <section style="margin-top: 5rem;">
      <o-field label="Username">
        <o-input placeholder="Username" size="medium" />
      </o-field>

      <o-field label="Password">
        <o-input type="password" placeholder="Password" size="medium" password-reveal />
      </o-field>
    </section>

    <o-button class="login">Login</o-button>
  </div>
</template>

<style>
.login {
  margin-top: 2rem;
}
</style>
