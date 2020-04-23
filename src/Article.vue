<template>
  <div>
    <v-img class="white--text align-end" height="230px" :src="mediaImg">
      <v-chip class="my-2 mx-2">{{section.toUpperCase()}}</v-chip>
    </v-img>
    <v-card-title style="wordBreak: normal">{{title}}</v-card-title>
    <v-card-subtitle style="wordBreak: normal">{{author}}</v-card-subtitle>

    <v-card-text>
      <div style="wordBreak: normal">{{abstract}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="light-blue text--accent-4" :href="url == undefined ? '' : url" target="_blank" text block>
        View article
        <v-icon right>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "Article",
  components: {},
  props: {
    title: String,
    section: String,
    author: String,
    abstract: String,
    url: String,
    mediaImg: String
  }
};
</script>