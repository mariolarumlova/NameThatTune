<template>
  <div>
    <HomeMenu />
    <div class="main-container">
      <div class="loginsuccess-container">
        <h2 class="heading">Choose playlist</h2>
        <div>
          <YoutubePlaylistChooser />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/Menu";
import YoutubePlaylistChooser from "@/components/YTPlaylistChooser";

export default {
  name: "chooseplaylist",
  components: {
    HomeMenu,
    YoutubePlaylistChooser
  }
};
</script>
