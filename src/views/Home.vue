<template>
  <v-container>
    <div class="quote-block">
      <div class="boxes">
        <div class="box top-left"></div>
        <div class="box top-right"></div>
      </div>
      <div class="quote">
        <blockquote class="quote-text">
          {{ quote }}
        </blockquote>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          color="purple"
          indeterminate
          class="mb-4"
        />
        <span class="speaker">
          {{ author }}
        </span>
      </div>
      <div v-if="!loading" class="controls">
        <v-rating
          class="d-block d-sm-none"
          :value="rating"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          hover
          size="40"
          length="5"
          color="yellow darken-2"
          background-color="yellow darken-2"
          @input="rateQuote"
        />
        <v-rating
          class="d-none d-sm-block"
          :value="rating"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          hover
          size="64"
          length="5"
          color="yellow darken-2"
          background-color="yellow darken-2"
          @input="rateQuote"
        />
      </div>
      <div class="boxes">
        <div class="box bottom-left"></div>
        <div class="box bottom-right"></div>
      </div>
    </div>
  </v-container>
</template>

<script>
import motivationApi from "@/api/motivationApi";
import quoteApi from "@/api/quoteApi";

export default {
  name: "Home",
  data() {
    return {
      rating: 0,
      loading: true,
      errored: false,
      quoteData: {},
      ratedQuotes: [],
    };
  },
  async mounted() {
    await this.retrieveQuote();
  },
  computed: {
    quote() {
      if (this.loading) {
        return `"Good things come to those that wait"`;
      }
      return `"${this.quoteData.content}"`;
    },
    author() {
      if (this.loading) {
        return "(Quote is loading)";
      }
      return `~ ${this.quoteData.author}`;
    },
  },
  methods: {
    async retrieveQuote() {
      try {
        this.loading = true;
        const randomQuote = await quoteApi.getRandomQuote();
        this.quoteData = randomQuote.data;
      } catch (e) {
        // TODO handle error
        console.log(e);
        this.errored = true;
      } finally {
        this.loading = false;
      }
    },
    async rateQuote(rating) {
      this.rating = rating;
      const rateRequest = {
        quote: this.quoteData,
        rating,
      };
      try {
        this.loading = true;
        const res = await motivationApi.rateQuote(rateRequest);
        this.quoteData = res.data.quote;
        console.log(res);
      } catch (e) {
        // TODO handle error
        console.log(e);
      } finally {
        this.loading = false;
      }
      this.rating = 0;
    },
  },
};
</script>

<style scoped>
.quote-block {
  border: 1px solid black;
  margin: 0 auto;
  /*max-width: 500px;*/
  padding: 1rem;
  background: #fefefe;
  margin-top: 3rem;
}

.boxes {
  display: flex;
  justify-content: space-between;
}

.box {
  height: 60px;
  width: 60px;
}

.top-left {
  border-left: 1px solid black;
  border-top: 1px solid black;
}

.top-right {
  border-right: 1px solid black;
  border-top: 1px solid black;
}

.bottom-left {
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.bottom-right {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.quote {
  padding: 2rem 1.5rem;
  text-align: center;
}

.quote-text {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
}

.speaker {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: #333333;
}

.controls {
  display: flex;
  justify-content: center;
}

@media only screen and (min-width: 600px) {
  .quote-text {
    font-size: 4rem;
  }

  .speaker {
    font-size: 2.5rem;
  }
}
</style>
