<template>
  <div>
    <v-app-bar app>
      <Menu />
    </v-app-bar>
    <v-main app>
      <Training />
    </v-main>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import Training from "@/components/Training";

export default {
  name: "training",
  components: {
    Menu,
    Training
  }
};
</script>
