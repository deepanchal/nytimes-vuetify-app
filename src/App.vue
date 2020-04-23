<template>
  <v-app>
    <!-- Navigation menu -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense nav>
        <v-list-item-group active-class="orange--text text--accent-4">
          <v-list-item
            @click="loading=true;fetchData(topic);drawer=false;"
            v-for="(topic, index) in newsTopics"
            :key="index"
            link
          >
            <v-list-item-content>
              <v-list-item-title>{{topic.toUpperCase()}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="cyan darken-2" dark :clipped-left="$vuetify.breakpoint.lgAndUp">
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
        color="orange"
      ></v-progress-linear>
    </v-app-bar>

    <v-content>
      <v-container>
        <!-- Render Article Cards -->
        <v-card
          v-for="(article, index) in searchedArticles"
          :key="index"
          class="mx-auto my-4"
          max-width="400"
          hover
        >
          <Article
            :section="article.section_name"
            :mediaImg="article['multimedia'].length === 0 ? 'https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png' : 'https://nytimes.com/' + article['multimedia'][0].url"
            :title="article.headline.main"
            :author="article.byline.original"
            :url="article.web_url"
            :abstract="article.abstract"
          ></Article>
        </v-card>

        <v-card
          v-for="(article, index) in articles"
          :key="index"
          class="mx-auto my-4"
          max-width="400"
          hover
        >
          <Article
            :section="article.section"
            :mediaImg="article['multimedia'][0]['url']"
            :title="article.title"
            :author="article.byline"
            :url="article.url"
            :abstract="article.abstract"
          ></Article>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Article from "./Article";
export default {
  name: "App",

  components: { Article },

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
      let url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${process.env.VUE_APP_APIKEY}`;
      this.$axios.get(url).then(response => {
        this.articles = response.data.results;
        this.loading = false;
      });
    },
    fetchSearchQuery(query) {
      this.articles = "";
      let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}?&api-key=${process.env.VUE_APP_APIKEY}`;
      this.$axios.get(url).then(response => {
        this.searchedArticles = response.data.response.docs;
        this.loading = false;
      });
    }
  }
};
</script>