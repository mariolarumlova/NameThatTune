<template>
  <div>
    <HomeMenu />
    <div class="main-container">
      <div class="loginsuccess-container">
        <h2 class="heading">Training mode</h2>
        <div>
          <p>
            Hello! You are in a training mode. This page is not fully
            implemented yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/Menu";

export default {
  name: "training",
  components: {
    HomeMenu
  }
};
</script>
