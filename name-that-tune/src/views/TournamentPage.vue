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
import Menu from "@/components/utils/Menu";
import Tournament from "@/components/core/Tournament";

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
