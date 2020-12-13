<template>
  <div>
    <v-app-bar app>
      <Menu />
    </v-app-bar>
    <v-main app>
      <ChooseGameMode />
    </v-main>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import ChooseGameMode from "@/components/ChooseGameMode";

export default {
  data() {
    return {
      message: ""
    };
  },
  name: "home",
  components: {
    Menu,
    ChooseGameMode
  }
};
</script>
