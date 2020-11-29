<template>
  <div>
    <HomeMenu />
    <div class="main-container">
      <div class="loginsuccess-container">
        <h2 class="heading">Tournament mode</h2>
        <div>
          <p>Hello! You are in tournament mode</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/Menu";

export default {
  name: "tournament",
  components: {
    HomeMenu
  }
};
</script>
