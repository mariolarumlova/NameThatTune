<template>
  <div>
    <HomeMenu />
    <div class="main-container">
      <div class="loginsuccess-container">
        <h2 class="heading">Tournament mode</h2>
        <div>
          <p>Hello! You are in tournament mode</p>
          <select v-model="selected">
            <option
              v-for="piece in pieces"
              v-bind:key="piece.id"
              v-bind:value="piece"
            >
              {{ piece.text }}
            </option>
          </select>
          <span>Selected: {{ selected }}</span>

          <div v-if="selected.multipart">
            <select v-model="selectedPart">
              <option disabled value="">Choose the part</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
            <span>Selected: {{ selectedPart }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/Menu";

export default {
  data() {
    return {
      pieces: [
        { id: "1", text: "Fryderyk Chopin - Waltz b-minor" },
        {
          id: "2",
          text: "Ludwig van Beethoven - The 5th Symphony",
          multipart: true
        },
        {
          id: "3",
          text: "Modest Musorgski - Pictures from the Exhibition",
          multipart: true
        },
        { id: "4", text: "Pedro Iturralde - Pequena Czarda" }
      ],
      selected: "",
      selectedPart: ""
    };
  },
  name: "tournament",
  components: {
    HomeMenu
  }
};
</script>
