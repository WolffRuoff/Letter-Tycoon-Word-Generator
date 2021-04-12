<template>
  <q-page padding>
    <div class="q-gutter-md">
      <div style="text-align: center">
        <q-btn
          size="xl"
          color="secondary"
          label="Find The Best Words"
          text-color="black"
          push
          @click="findWords"
        />
      </div>
      <q-card class="standardCard text-subtitle1" style="width: 40%">
        <q-item v-if="!wordRank.length"
          >You haven't searched for anything yet!</q-item
        ></q-card
      >
      <div class="q-pa-md">
        <q-table
        grid
        expanded
        table-colspan="12"
        hide-no-data
        :data="wordRank"
        :columns="columns"
        row-key="name"
        :card-style="{backgroundColor: 'rgba(241, 229, 179, 1)'}"
        >

        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

const columnData = [
  {
    name: 'word',
    required: true,
    label: 'Word',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  {name:'money', label: 'Money', field: 'money', sortable: true},
  {name:'stock', label: 'Stock', field: 'stock', sortable: true},
  {name:'definition', label: 'Definition', field: 'defin', sortable: false}
]
export default {
  data() {
    return {
      wordRank: [],
      dic: null,
      columns: columnData
    };
  },
  props: ["letters"],
  computed: {
    ...mapGetters("patent", ["patents"]),
    ...mapGetters("setting", ["settings"]),
  },
  methods: {
    isEmpty() {
      return this.wordRank.isEmpty();
    },
    findWords() {
      if (this.settings["Dictionary"].selected == 0) {
        this.dic = require("assets/NWLDefs.json");
      } else {
        this.dic = require("assets/CollinsDefs.json");
      }
      var letters = this.letters.replace(/\s/g, "");
      letters = letters.replace(/_/g, "");
      //Starting length for words
      let sle = 3;
      let le = letters.length;

      //If you have the z patent, add one to length since you can add an s to words
      if (this.patents["Z"].owns) {
        le += 1;
      }
      //If you have the x patent, add one to length since you can duplicate 1 letter
      if (this.patents["X"].owns) {
        le += 1;
      }
      this.wordRank = [];
      while (sle <= le) {
        this.dic[sle].forEach((word) => {
          let wordU = word[0].toUpperCase();
          if (this.canBeMade(wordU, letters)) {
            let pts = this.getPoints(wordU);
            this.wordRank.push({name: wordU, money: pts[0], stock: pts[1], defin: word[1]});
          }
        });
        sle += 1;
      }
      /*
      console.log(this.letters);
      let word = "alla".toUpperCase();
      if (this.canBeMade(word, letters)) {
        let pts = this.getPoints(word);
        this.wordRank.push([word, pts[0], pts[1]]);
      } */

      //sort array
      this.wordRank.sort(function (a, b) {
        if (a["money"] + a["stock"] < b["money"] + b["stock"]) return 1;
        if (a["money"] + a["stock"] > b["money"] + b["stock"]) return -1;
        return 0;
      });
    },
    canBeMade(word, letters) {
      //If X is active allow a letter to be reused
      var usedX = true;
      if (this.patents["X"].owns) {
        usedX = false;
      }

      //If z is active and word ends with s exists remove it
      if (this.patents["Z"].owns && word.endsWith("S")) {
        word = word.substring(0, word.length - 1);
      }

      var used = [];
      let lettersUsing = letters.split("");
      //For each letter in the word
      for (const c of word.split("")) {
        //If the letter is in the list of letters typed
        if (lettersUsing.includes(c)) {
          used.push(c);
          lettersUsing.splice(lettersUsing.indexOf(c), 1);
        }
        //If you have the X patent and the letter has been used already
        else if (used.includes(c) && usedX == false) {
          usedX = true;
        } else {
          return false;
        }
      }
      return true;
    },

    getPoints(word) {
      let le = word.length;
      let money = 0;
      let stck = 0;

      let num = 3;
      while (num <= le) {
        if (num <= 5) {
          money += 1;
        } else if (num == 6) {
          money += 1;
          stck += 1;
        } else if (num == 7) {
          money += 2;
        } else {
          stck += 1;
        }
        num += 1;
      }

      let mult = this.getMultiplier(word);
      return [money * mult, stck * mult];
    },

    getMultiplier(word) {
      let vowels = ["A", "E", "I", "O", "U", "Y"];
      var mult = 0;
      if (this.settings["Ability"].selected == 0) {
        mult = 1;
      }
      //Check for q ability (q automatically doubles points)
      if (word.includes("Q")) {
        if (this.settings["Ability"].selected == 0) {
          mult *= 2;
        } else if (this.settings["Ability"].selected == 1) {
          mult += 2;
        } else if (this.settings["Ability"].selected == 2) {
          return 2;
        }
      }

      //Check for b ability (start and end in vowel)
      if (
        this.patents["B"].owns &&
        vowels.includes(word.substring(0, 1)) &&
        vowels.includes(word.substring(word.length - 1, word.length))
      ) {
        if (this.settings["Ability"].selected == 0) {
          mult *= 2;
        } else if (this.settings["Ability"].selected == 1) {
          mult += 2;
        } else if (this.settings["Ability"].selected == 2) {
          return 2;
        }
      }

      if (this.patents["J"].owns || this.patents["K"].owns) {
        var vowelCount = this.countVowels(word, vowels);
      }
      //Check for j ability (at least half vowels)
      if (this.patents["J"].owns) {
        if (vowelCount >= word.length / 2) {
          if (this.settings["Ability"].selected == 0) {
            mult *= 2;
          } else if (this.settings["Ability"].selected == 1) {
            mult += 2;
          } else if (this.settings["Ability"].selected == 2) {
            return 2;
          }
        }
      }
      //Check for k ability (only 1 vowel)
      if (this.patents["K"].owns) {
        word = word.replace(/y/g, "");
        if (vowelCount == 1) {
          if (this.settings["Ability"].selected == 0) {
            mult *= 2;
          } else if (this.settings["Ability"].selected == 1) {
            mult += 2;
          } else if (this.settings["Ability"].selected == 2) {
            return 2;
          }
        }
      }
      if (mult == 0) {
        return 1;
      }
      return mult;
    },

    countVowels(word, vowels) {
      let vowelCount = 0;
      for (let char of word) {
        if (vowels.includes(char)) {
          vowelCount++;
        }
      }
      return vowelCount;
    },
  },
};
</script>

<style scoped>
</style>