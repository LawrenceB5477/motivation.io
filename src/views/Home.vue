<template>
  <v-container>
    <div class="quote-block mb-5">
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
    <v-row v-if="stats" class="align-content-stretch">
      <v-col cols="12" sm="6">
        <v-card class="fill-height">
          <v-card-title> Rating Stats </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <span class="font-weight-bold ml-4">Star Totals:</span>
                <v-list dense>
                  <v-list-item
                    v-for="(stars, index) in stats.rateNumberTotals"
                    l
                    :key="index"
                  >
                    <v-list-item-content>
                      {{ `${index + 1} ${index > 0 ? "Stars" : "Star"}:` }}
                    </v-list-item-content>
                    <v-list-item-content class="justify-end">
                      {{ stars }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col>
                <span class="font-weight-bold ml-4">Total Quotes Rated:</span>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <span>{{ stats.ratedQuoteTotal }}</span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title> Tag Stats </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols>
                <span class="font-weight-bold ml-4">Totals: </span>
                <v-list dense>
                  <v-list-item
                    v-for="([tag, num], index) in Object.entries(
                      stats.tagTotals.tagTotals
                    ).slice(0, 5)"
                    l
                    :key="index"
                  >
                    <v-list-item-content>
                      {{ tag }}
                    </v-list-item-content>
                    <v-list-item-content class="justify-end">
                      {{ num }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col>
                <div class="d-flex justify-space-between">
                  <span class="font-weight-bold ml-4">Most Liked tag: </span>
                </div>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <span>{{ stats.tagTotals.max }}</span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
      stats: undefined,
    };
  },
  async mounted() {
    await this.retrieveQuote();
    const stats = await motivationApi.getUserStats();
    this.stats = stats.data;
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
        const stats = await motivationApi.getUserStats();
        this.quoteData = res.data.quote;
        this.stats = stats.data;
        console.log(res);
      } catch (e) {
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
