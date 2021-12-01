<template>
  <v-app
    :style="{ backgroundImage: `url(${require('@/assets/bg1.jpg')})` }"
    class="app"
  >
    <v-app-bar app color="primary" dark dense>
      <v-app-bar-title class="font-weight-bold">
        Motivation.io
      </v-app-bar-title>
      <v-spacer />
      <div class="d-flex align-center">
        <!--        <v-icon :color="themeIconColor" class="mr-4">{{ themeIcon }}</v-icon>-->
        <!--        <v-switch-->
        <!--          color="purple darken-4"-->
        <!--          v-model="$vuetify.theme.dark"-->
        <!--          hide-details-->
        <!--        />-->
        <v-menu v-if="isLoggedIn" v-model="menuOpen" offset-y tile>
          <template #activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs">
              <v-icon color="white">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-card width="250" tile>
            <v-card-text>
              <span>Email: <br />{{ user.email }}</span>
            </v-card-text>
            <v-btn block color="secondary" large tile @click="onLogout">
              Logout
            </v-btn>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isLoggedIn"]),
    themeIcon() {
      return this.$vuetify.theme.dark
        ? "mdi-weather-night"
        : "mdi-weather-sunny-alert";
    },
    themeIconColor() {
      return this.$vuetify.theme.dark ? "purple darken-4" : "yellow";
    },
  },
  methods: {
    ...mapActions(["logout"]),
    async onLogout() {
      try {
        await this.logout();
        await this.$router.push({ name: "Login" });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
.app {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
