<template>
  <div>
    <HomeMenu />
    <div class="main-container">
      <div class="loginsuccess-container">
        <h2 class="heading">Settings</h2>
        <div>
          <svg
            :xmlns="clientImageUrl"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          ></svg>
          <p>{{ clientName }}</p>
          <p>First login date:</p>
          <p>Number of playlists:</p>
          <p>Random start of a piece</p>
          <p>Correct answers</p>
          <p>Correct piece, incorrect part score</p>
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
      clientImageUrl: this.$store.state.loginUser.google.wt.SJ,
      clientName: this.$store.state.loginUser.google.wt.Ad
    };
  },
  name: "settings",
  components: {
    HomeMenu
  }
};
</script>
