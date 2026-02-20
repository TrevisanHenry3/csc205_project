<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
</script>
<template>
  <div class="container">
    <div class="about">
      <h1>Student List</h1>
    </div>
    <table class="studentTable">
      <thead>
        <tr>
          <th>Name
            <FontAwesomeIcon :icon="faChevronDown" />
          </th>
          <th>
            <label for="major"></label>
            <select name="major" id="major">
              <option value="default">Major</option>
              <option value="cyber">Cybersecurity</option>
              <option value="compsci">Computer Science</option>
            </select>
          </th>
          <th>Credits
            <FontAwesomeIcon :icon="faChevronDown" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Adams, Steven</td>
          <td>Cybersecurity</td>
          <td>22</td>
        </tr>
        <tr>
          <td>Baker, Cynthia</td>
          <td>Computer Science</td>
          <td>16</td>
        </tr>
      </tbody>
    </table>

  </div>

</template>

<style>
.container {
  width: 100%;
  padding: 20px
}

.about {
  display: block;
  text-align: center;
  width: 100%;
}

.studentTable {
  width: 100%;
  border: 2px solid;
}

tr:hover {
  background-color: #ffcb71;
}

@media (min-width: 1024px) {
  .about {
    min-height: 0 !important;
    display: block !important;
  }
}
</style>
