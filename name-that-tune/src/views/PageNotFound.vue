<template>
  <div>
    <v-app-bar app>
      <Menu />
    </v-app-bar>
    <v-main app>
      404 Page Not found
      <v-btn to="/login">Go back to login page</v-btn>
    </v-main>
  </div>
</template>
<script>
import Menu from "@/components/Menu";

export default {
  data() {
    return {
      message: ""
    };
  },
  name: "page_not_found",
  components: {
    Menu
  }
};
</script>
