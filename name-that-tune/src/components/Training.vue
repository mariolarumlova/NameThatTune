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
          <span>Notes:</span>
          <p style="white-space: pre-line;">{{ message }}</p>
          <br />
          <textarea
            v-model="message"
            placeholder="add multiple lines"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/Menu";

export default {
  data() {
    return {
      message: ""
    };
  },
  name: "training",
  components: {
    HomeMenu
  }
};
</script>
