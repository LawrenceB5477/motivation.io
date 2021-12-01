<template>
  <v-container>
    <v-card class="mx-auto mt-12" max-width="400">
      <form @submit.prevent="create">
        <v-card-title class="justify-center text-h5 my-4">
          Create a Motivation.io account
        </v-card-title>
        <v-card-subtitle class="justify-center text-center">
          Sign up to record your favorite quotes!
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
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            outlined
            :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showConfirmPassword ? 'text' : 'password'"
            :error-messages="confirmPasswordErrors"
            @click:append="showConfirmPassword = !showConfirmPassword"
            @blur="$v.confirmPassword.$touch"
          />
          <v-btn type="submit" color="primary" block large class="d-flex">
            <v-icon class="mr-2"> mdi-lock-outline </v-icon>
            Create Account
          </v-btn>
          <div v-if="createAccountError" class="text-center red--text mt-2">
            <span>{{ createAccountError }}</span>
          </div>
        </v-card-text>
        <v-card-subtitle class="text-center">
          Have an account already?
          <router-link :to="{ name: 'Login' }">Sign in</router-link>
        </v-card-subtitle>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "CreateAccount",
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      email: "",
      password: "",
      confirmPassword: "",
      createAccountError: "",
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
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$error) return errors;
      if (!this.$v.confirmPassword.required) {
        errors.push("Confirm password is required");
      }
      if (!this.$v.confirmPassword.sameAsPassword) {
        errors.push("Passwords must match");
      }
      return errors;
    },
  },
  methods: {
    ...mapActions(["createAccount"]),
    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.$v.$reset();
    },
    async create() {
      this.$v.$touch();
      if (this.$v.$error) {
        console.log("Errors!");
      } else {
        try {
          await this.createAccount({
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          });
          await this.$router.push("/");
        } catch (e) {
          const errorMessage = e?.response?.data?.message;
          this.createAccountError =
            errorMessage || "An error occurred creating an account.";
          this.resetForm();
        }
      }
    },
  },
};
</script>

<style scoped></style>
