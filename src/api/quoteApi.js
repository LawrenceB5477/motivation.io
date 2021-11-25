import axios from "axios";

const quoteApi = axios.create({
  baseURL: process.env.VUE_APP_QUOTE_API,
});

export default {
  async getRandomQuote() {
    console.log(quoteApi);
    console.log(process.env.VUE_APP_QUOTE_API);
    return quoteApi.get("/random");
  },
};
