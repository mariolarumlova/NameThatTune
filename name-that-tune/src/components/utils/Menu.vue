<template>
  <v-app-bar app color="white" flat>
    <v-tabs class="ml-n7" color="grey darken-1" v-model="activeTab" show-arrows>
      <v-tab v-for="tab in tabs" :to="tab.url" :key="tab.index">
        <v-avatar v-if="tab.label === 'Home'" size="60" tile>
          <img src="../../../public/img/icons/logo.png" />
        </v-avatar>
        <div v-else>
          {{ tab.label }}
        </div>
      </v-tab>
    </v-tabs>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          color="grey darken-1 shrink"
          size="54"
          v-bind="attrs"
          v-on="on"
        >
          <img :src="clientImageUrl" />
        </v-avatar>
      </template>
      <v-list v-if="this.$store.state.session">
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
import { signOut } from "@/repositories/firebase";

export default {
  data() {
    return {
      activeTab: 0,
      clientImageUrl: this.$store.state.session.user.photoURL,
      clientName: this.$store.state.session.user.displayName,
      items: [
        { title: "Settings", action: () => this.openSettings() },
        { title: "Log out", action: () => this.logout() }
      ],
      tabs: [
        { index: 0, label: "Home", url: "/choosemode" },
        { index: 1, label: "Training", url: "/training" },
        { index: 2, label: "Tournament", url: "/tournament" }
      ]
    };
  },
  methods: {
    logout() {
      if (this.$store.state.session.user) {
        signOut();
      }
      removeItem("user");
      router.push("/login");
    },
    openSettings() {
      router.push("/settings");
    }
  }
};
</script>
