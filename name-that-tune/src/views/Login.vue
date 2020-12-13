<template>
  <v-main app>
    <v-layout column wrap align-center>
      <v-avatar size="120" tile>
        <v-img src="../../public/img/icons/logo.png" />
      </v-avatar>
      <div class="text-h4">
        Sign in
      </div>
      <!-- <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="nameRules"
          label="Password"
          required
        ></v-text-field>
        <v-btn
          block
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Sign in
        </v-btn>
        <v-divider pa-4></v-divider> -->
      <SocialLogin />
      <!-- </v-form> -->
      <!-- <div class="footer">
        <p color="black">
          Don't have an account? <a href="/signup"> Create one now</a>
        </p>
      </div> -->
    </v-layout>
  </v-main>
</template>

<script>
import SocialLogin from "@/components/SocialLogin";
export default {
  name: "login",
  components: {
    SocialLogin
  },
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>
