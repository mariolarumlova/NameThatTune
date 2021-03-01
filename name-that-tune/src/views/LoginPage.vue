<template>
  <v-main app>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card class="justify center">
          <v-avatar size="120" tile>
            <v-img src="../../public/img/icons/logo.png" />
          </v-avatar>
          <SocialLogin />
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SocialLogin from "@/components/utils/SocialLogin";
export default {
  name: "login",
  components: {
    SocialLogin
  }
};
</script>
