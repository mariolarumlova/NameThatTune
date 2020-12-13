<template>
  <div>
    <v-app-bar app>
      <Menu />
    </v-app-bar>
    <v-main app>
      <Settings />
    </v-main>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import Settings from "@/components/Settings";

export default {
  data() {
    return {
      message: ""
    };
  },
  name: "settings",
  components: {
    Menu,
    Settings
  }
};
</script>
