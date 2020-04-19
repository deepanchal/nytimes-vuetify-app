<template>
  <v-app>
    <v-app-bar app color="green" light>
      <div class="d-flex align-center">
        <h2>News Fetcher</h2>
      </div>
      <v-spacer></v-spacer>
      <v-btn-toggle color="white" mandatory group>
        <v-btn value="light">Light</v-btn>
        <v-btn v-on:click="themeDark" value="dark">Dark</v-btn>
      </v-btn-toggle>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-text-field label="Search..." single-line outlined></v-text-field>
          <v-btn-toggle v-for="topic in newsTopics" :key="topic" color="white" mandatory group>
            <v-btn @click="fetchData(topic)">{{topic}}</v-btn>
          </v-btn-toggle>
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
    url: `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${process.env.VUE_APP_APIKEY}`,
    appTheme: "",
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
    themeDark() {
      this.$Vuetify.theme.dark = true;
    },
    fetchData(topic) {
      console.log(topic);
      let url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${this.apiKey}`;
      this.$axios.get(url)
            .then(response => {
              let data = response.data;
              console.log(url);
              console.log(data.results[0]);
            })
    },
  }
};
</script>