<template>
  <v-app>
    <!-- Navigation menu -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense nav>
        <v-list-item-group active-class="light-blue--text text--accent-4">
          <v-list-item v-for="(topic, index) in newsTopics" :key="index" link>
            <v-list-item-content @click="loading=true;fetchData(topic);drawer=false;">
              <v-list-item-title>{{topic.toUpperCase()}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="amber darken-2" :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>Newsify</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        @change="loading=true;fetchSearchQuery($event)"
      />
      <v-spacer></v-spacer>
      <v-btn-toggle mandatory group>
        <v-btn icon @click="themeLight">
          <v-icon>mdi-white-balance-sunny</v-icon>
        </v-btn>
        <v-btn icon @click="themeDark">
          <v-icon>mdi-brightness-2</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="light-blue"
      ></v-progress-linear>
    </v-app-bar>

    <v-content>
      <v-container>
        <h1 v-for="(article, index) in searchedArticles" :key="index">{{article.abstract}}</h1>
        <!-- Render Article Cards -->
        <v-card
          v-for="(article, index) in articles"
          :key="index"
          class="mx-auto my-4"
          max-width="400"
          hover
        >
          <v-img
            class="white--text align-end"
            height="230px"
            :src="article['multimedia'][0]['url']"
          >
            <v-chip class="my-2 mx-2">{{article.section.toUpperCase()}}</v-chip>
          </v-img>
          <v-card-title style="wordBreak: normal">{{article.title}}</v-card-title>
          <v-card-subtitle style="wordBreak: normal">{{article.byline}}</v-card-subtitle>

          <v-card-text>
            <div style="wordBreak: normal">{{article.abstract}}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="light-blue text--accent-4" :href="article.url" target="_blank" text block>
              View article
              <v-icon right>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: null,
    loading: false,
    articles: "",
    searchedArticles: "",
    newsTopics: [
      "arts",
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
      "insider",
      "technology",
      "travel",
      "world"
    ]
  }),
  methods: {
    themeLight() {
      this.$vuetify.theme.dark = false;
    },
    themeDark() {
      this.$vuetify.theme.dark = true;
    },
    fetchData(topic) {
      this.searchedArticles = "";
      console.log(topic);
      let url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${process.env.VUE_APP_APIKEY}`;
      this.$axios.get(url).then(response => {
        this.articles = response.data.results;
        console.log(this.articles[0]["multimedia"][0]["url"]);
        console.log(this.articles[0]["title"]);
        console.log(this.articles[0]["byline"]);
        console.log(this.articles[0]["url"]);
        console.log(this.articles[0]["section"]);
        console.log(this.articles[0]["abstract"]);
        this.loading = false;
      });
    },
    fetchSearchQuery(query) {
      this.articles = "";
      console.log(query);
      let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.VUE_APP_APIKEY}`;
      this.$axios.get(url).then(response => {
        this.searchedArticles = response.data.response.docs;
        console.log(this.searchedArticles);
        this.loading = false;
      });
    }
  }
};
</script>