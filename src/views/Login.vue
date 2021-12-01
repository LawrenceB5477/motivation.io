<template>
  <v-container>
    <v-card class="mx-auto mt-12" max-width="400">
      <form @submit.prevent="onLogin">
        <v-card-title class="justify-center text-h5 my-4">
          Login to Motivation.io
        </v-card-title>
        <v-card-subtitle class="justify-center text-center">
          Login to see your favorite quotes!
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="email"
            name="email"
            label="Email"
            outlined
            :error-messages="emailErrors"
            @blur="$v.email.$touch"
          />
          <v-text-field
            v-model="password"
            label="Password"
            name="password"
            outlined
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="passwordErrors"
            @click:append="showPassword = !showPassword"
            @blur="$v.password.$touch"
          />
          <v-btn type="submit" color="primary" block large class="d-flex">
            Login
            <v-icon class="ml-2"> mdi-login </v-icon>
          </v-btn>
          <div v-if="loginError" class="text-center red--text mt-2">
            <span>{{ loginError }}</span>
          </div>
        </v-card-text>
        <v-card-subtitle class="text-center">
          Don't have an account?
          <router-link :to="{ name: 'Create' }">Create Account</router-link>
        </v-card-subtitle>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "Login",
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      loginError: "",
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$error) return errors;
      if (!this.$v.email.required) {
        errors.push("Email is required");
      }
      if (!this.$v.email.email) {
        errors.push("Please enter a valid email");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$error) return errors;
      if (!this.$v.password.required) {
        errors.push("Password is required");
      }
      if (!this.$v.password.minLength) {
        errors.push("Password must be at least 8 characters");
      }
      return errors;
    },
  },
  methods: {
    ...mapActions(["login"]),
    resetForm() {
      this.password = "";
      this.$v.$reset();
    },
    async onLogin() {
      this.$v.$touch();
      if (!this.$v.$error) {
        try {
          await this.login({
            email: this.email,
            password: this.password,
          });
          await this.$router.push("/");
        } catch (e) {
          const errorMessage = e?.response?.data?.message;
          this.loginError = errorMessage || "Login failed!";
          this.resetForm();
        }
      }
    },
  }
};
</script>

<style scoped></style>
