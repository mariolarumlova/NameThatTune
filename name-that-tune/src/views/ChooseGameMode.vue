<template>
  <div>
    <HomeMenu />
    <div class="main-container">
      <div class="loginsuccess-container">
        <h2 class="heading">Choose game mode</h2>
        <div>
          <router-link to="/training" class="signIn">Training</router-link>
          <router-link to="/tournament" class="signIn">Tournament</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/Menu";

export default {
  name: "choosemode",
  components: {
    HomeMenu
  }
};
</script>
