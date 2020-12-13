<template>
  <div>
    <v-app-bar app>
      <Menu />
    </v-app-bar>
    <v-main app>
      <Tournament />
    </v-main>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import Tournament from "@/components/Tournament";

export default {
  data() {
    return {
      message: ""
    };
  },
  name: "tournament",
  components: {
    Menu,
    Tournament
  }
};
</script>
