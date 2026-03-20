<template>
  <div class="change" style="text-align: center;">
    <section style="margin-top: 5rem;">
      <o-field label="Current Password">
        <o-input placeholder="" size="medium" />
      </o-field>

      <o-field label="New Password">
        <o-input placeholder="" size="medium" password-reveal />
      </o-field>
      <o-field label="Confirm New Password">
        <o-input placeholder="" size="medium" password-reveal />
      </o-field>

      <o-button size="default" variant="info">Confirm and Update</o-button>
      <!-- /auth/password_reset (POST) -->
    </section>
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
</style>