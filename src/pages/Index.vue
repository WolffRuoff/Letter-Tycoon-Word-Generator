<template>
  <q-page padding>
    <div class="q-gutter-md">
      <q-card class="standardCard">
        <q-card-section>
          <q-input
            class="letter-input"
            v-model="letters"
            v-autofocus
            color="primary"
            hide-bottom-space
            fill-mask="_"
            @keyup.enter="searchWords"
            label="Letters"
            mask=" A A A A A A A A A A"
          />
        </q-card-section>
      </q-card>

      <q-card
        class="standardCard"
      >
        <q-card-section>
          <div class="text-h4">Select The Patents You Own</div>
          <div class="text-subtitle1">Owned patents should be colored</div>
        </q-card-section>
        <ul class="pat">
          <li
            class="pat"
            v-for="(patent, key) in patents"
            v-bind:key="key"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :class="{ hovering: hover }"
          >
            <Patent :letter="key" :patent="patent" />
          </li>
        </ul>
      </q-card>
    </div>
    <WordFinder :letters="this.letters" ref="wordfinder"/>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      letters: null,
      hover: false,
      words: [],
    };
  },
  methods: {
    searchWords() {
      this.$refs.wordfinder.findWords();
    },
  },
  filters: {
    messageUppercase(val) {
      return val.toUpperCase();
    },
  },
  computed: {
    ...mapGetters("patent", ["patents"]),
  },
  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  components: {
    Patent: require("components/Patent.vue").default,
    Settings: require("components/Settings.vue").default,
    WordFinder: require("components/WordFinder.vue").default,
  },
};
</script>

<style>
html {
  background-image: url("../assets/back-main.webp");
}
input,
button {
  font-size: 2em;
}
.pat {
  display: inline-block;
  margin: 0.5vw;
}
.standardCard {
  background-color: rgba(241, 229, 179, 1);
}

ul {
  width: 100%;
}

.hovering {
  cursor: pointer;
}
.letter-input {
  font-size: 3.6vw;
}
.q-field__control,
.q-field__marginal {
  height: auto !important;
}
</style>
