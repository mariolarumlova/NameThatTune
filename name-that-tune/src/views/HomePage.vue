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
import Menu from "@/components/utils/Menu";
import ChooseGameMode from "@/components/utils/ChooseGameMode";

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
