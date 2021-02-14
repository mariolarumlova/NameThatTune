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
import Menu from "@/components/utils/Menu";
import Training from "@/components/core/Training";

export default {
  name: "training",
  components: {
    Menu,
    Training
  }
};
</script>
