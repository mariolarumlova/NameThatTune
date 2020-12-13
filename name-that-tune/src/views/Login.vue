<template>
  <v-main app class="flex-direction: column justify-center">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card class="justify center">
          <v-avatar size="120" tile>
            <v-img src="../../public/img/icons/logo.png" />
          </v-avatar>
          <div class="text-h4 pa-6">
            Sign in with Google
          </div>
          <SocialLogin />
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SocialLogin from "@/components/SocialLogin";
export default {
  name: "login",
  components: {
    SocialLogin
  }
};
</script>
