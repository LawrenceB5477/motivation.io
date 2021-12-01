import axios from "axios";

const motivationApi = axios.create({
  baseURL: process.env.VUE_APP_MOTIVATION_API,
});

export default {
  async createAccount(createAccountRequest) {
    return motivationApi.post("/auth/create", createAccountRequest, {
      withCredentials: true,
    });
  },
  async login(loginRequest) {
    return motivationApi.post("/auth/login", loginRequest, {
      withCredentials: true,
    });
  },
  async logout() {
    return motivationApi.post("/auth/logout");
  },
};
