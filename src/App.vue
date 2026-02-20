<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

</script>

<template>
  <!--Only show navbar if logged in-->
  <div v-if="$route.name !== 'home'" class="navContainer">
    <header class="navbar">
      <div class="logo">
        <img src="/assets/genevaLogo.png" width="80px">
      </div>
      <nav class="links">
        <ul>
          <li>
            <RouterLink to="/list" class="navTab">Student List</RouterLink>
          </li>
          <li>
            <RouterLink to="/main" class="navTab">Schedule View</RouterLink>
          </li>
        </ul>

      </nav>

      <div class="profileGroup">
        <p class="username">Scott Madeira</p>
        <div id="profileDropdown" style="padding-left: 1rem;">
          <o-dropdown position="bottom-right">
            <template #trigger="{ active }">
              <o-button style="background-color: #C99A2C;" label="Profile"></o-button>
            </template>
            <o-dropdown-item>
              <RouterLink to="/change" class="navTab">Change Password</RouterLink>
            </o-dropdown-item>
            <o-dropdown-item>
              <RouterLink to="/" class="navTab">Logout</RouterLink>
            </o-dropdown-item>
          </o-dropdown>
        </div>
      </div>




    </header>
  </div>



  <main class="content">
    <RouterView />
  </main>
</template>

<style scoped>
.navContainer {
  display: flex;
  flex-direction: column;
}


.logo {
  display: flex;
  align-items: center;
  margin-right: 5rem;
}

.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: lightslategray
}

.links ul {
  list-style-type: none;
}

.links li {
  display: inline-block;
  border: 1px solid;
  border-width: 0 1px 0 1px;
}

.links li a {
  font-size: large;
  display: block;
  padding: 20px 20px;
  color: white
}

/* This overrides Bulma's default .dropdown-item padding */
.dropdown-content .dropdown-item {
  padding: 0.1rem 0.1rem;
}

.navTab {
  display: block;
  padding: 0px 10px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

.profileGroup {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.username {
  color: white;
}

#profileButton {
  background-color: #C99A2C;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 8px;
  color: white;
}

.content {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  background-color: bisque
}


@media (min-width: 1024px) {

  header {
    display: flex;
  }
}
</style>
