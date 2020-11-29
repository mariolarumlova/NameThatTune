<template>
  <div>
    <HomeMenu />
    <div class="main-container">
      <div class="loginsuccess-container">
        <h2 class="heading">Settings</h2>
        <div class="center">
          <img :src="clientImageUrl" />
          <p>{{ clientName }}</p>
          <p>First login date:</p>
          <p>Number of playlists:</p>

          <p>Random start of a piece</p>
          <input
            type="radio"
            id="randomStartYes"
            value="Yes"
            v-model="pickedRandomStart"
          />
          <label for="randomStartYes">Yes</label>
          <input
            type="radio"
            id="randomStartNo"
            value="No"
            v-model="pickedRandomStart"
          />
          <label for="randomStartNo">No</label>
          <span>Picked: {{ pickedRandomStart }}</span>

          <p>Correct answers</p>
          <input
            type="radio"
            id="answerEach"
            value="After each piece"
            v-model="pickedAnswer"
          />
          <label for="answerEach">After each piece</label>
          <input
            type="radio"
            id="answerEnd"
            value="At the end of the tournament"
            v-model="pickedAnswer"
          />
          <label for="answerEnd">At the end of the tournament</label>
          <span>Picked: {{ pickedAnswer }}</span>

          <p>Correct piece, incorrect part score</p>
          <input
            type="radio"
            id="halfScore"
            value="0.5 p."
            v-model="pickedScoring"
          />
          <label for="halfScore">0.5 p.</label>
          <input
            type="radio"
            id="noScore"
            value="0 p."
            v-model="pickedScoring"
          />
          <label for="noScore">0 p.</label>
          <span>Picked: {{ pickedScoring }}</span>

          <p>Limited answer time</p>
          <br />
          <input type="checkbox" id="checkbox" v-model="checked" />
          <p v-if="checked">
            <input v-model="timeLimit" placeholder="30" /> sec.
          </p>
          <p>{{ checked }} {{ timeLimit }}</p>
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
      clientName: this.$store.state.loginUser.google.wt.Ad,
      pickedRandomStart: "No",
      pickedAnswer: "After each piece",
      pickedScoring: "0.5 p.",
      checked: false,
      timeLimit: 0
    };
  },
  name: "settings",
  components: {
    HomeMenu
  }
};
</script>
