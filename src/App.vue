<template>
  <v-app>
    <v-app-bar app color="green">
      <div class="d-flex align-center">
        <h2>News Fetcher</h2>
      </div>
      <v-spacer></v-spacer>
      <v-btn-toggle color="white" mandatory group>
        <v-btn @click="themeLight" value="light">Light</v-btn>
        <v-btn @click="themeDark" value="dark">Dark</v-btn>
      </v-btn-toggle>
    </v-app-bar>

    <v-content>
      <v-container>
        <!-- Rendering buttons for all news categories -->
        <v-text-field label="Search..." single-line outlined></v-text-field>
        <div>
          <v-btn-toggle class="d-flex justify-center align-center" text mandatory group>
            <v-btn v-for="topic in newsTopics" :key="topic" @click="fetchData(topic)">{{topic}}</v-btn>
          </v-btn-toggle>
        </div>

        <!-- Render Article Cards -->
        <v-card
          v-for="article in articles.results"
          :key="article"
          class="mx-auto my-4"
          max-width="400"
          hover
          :href="article.url"
          target="_blank"
        >
          <v-img class="white--text align-end" height="230px" :src="article.multimedia[0].url">
            <v-chip class="my-2 mx-2">{{article.section}}</v-chip>
          </v-img>
          <v-card-title>{{article.title}}</v-card-title>
          <v-card-subtitle>{{article.byline}}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{article.abstract}}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" :href="article.url" target="_blank" text block>
              View article
              <v-icon right>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- ----------------------------------------------------------------------- -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    apiKey: process.env.VUE_APP_APIKEY,
    url: "",
    articles: "",
    newsTopics: [
      "arts",
      "automobiles",
      "business",
      "fashion",
      "food",
      "health",
      "home",
      "movies",
      "politics",
      "realestate",
      "science",
      "sports",
      "technology",
      "travel",
      "world"
    ]
  }),
  methods: {
    themeLight() {this.$vuetify.theme.dark = false},
    themeDark() {this.$vuetify.theme.dark = true},
    fetchData(topic) {
      console.log(topic);
      let url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${this.apiKey}`;
      this.$axios.get(url).then(response => {
        let data = response.data;
        console.log(data.results);
        this.articles = data;
      });
    }
  },
};
</script>