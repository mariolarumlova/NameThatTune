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
import Menu from "@/components/utils/Menu";
import Settings from "@/components/utils/Settings";

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
