<template>
  <v-app-bar app color="white" flat>
    <v-avatar size="60" tile>
      <img src="../../public/img/icons/logo.png" />
    </v-avatar>

    <v-tabs centered class="ml-n9" color="grey darken-1">
      <v-tab v-for="link in links" :to="link.url" :key="link.label">
        {{ link.label }}
      </v-tab>
    </v-tabs>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="60"
          v-bind="attrs"
          v-on="on"
        >
          <img :src="clientImageUrl" />
        </v-avatar>
      </template>
      <v-list v-if="this.$store.state.loginUser">
        <v-list-item
          v-for="(item, index) in items"
          :to="item.url"
          :key="index"
          @click.prevent="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import router from "@/router/router";
import { removeItem } from "@/config/utils";

export default {
  data() {
    return {
      clientImageUrl: this.$store.state.loginUser.google.wt.SJ,
      clientName: this.$store.state.loginUser.google.wt.Ad,
      items: [
        { title: "Settings", action: () => this.openSettings() },
        { title: "Log out", action: () => this.logout() }
      ],
      links: [
        { label: "Sign in", url: "/login" },
        { label: "Sign up", url: "/signup" }
      ]
    };
  },
  name: "signup_header",
  methods: {
    logout() {
      removeItem("user");
      router.push("/login");
    },
    openSettings() {
      router.push("/settings");
    }
  }
};
</script>
