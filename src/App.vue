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
        <v-btn icon>
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    themeIcon() {
      return this.$vuetify.theme.dark
        ? "mdi-weather-night"
        : "mdi-weather-sunny-alert";
    },
    themeIconColor() {
      return this.$vuetify.theme.dark ? "purple darken-4" : "yellow";
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
