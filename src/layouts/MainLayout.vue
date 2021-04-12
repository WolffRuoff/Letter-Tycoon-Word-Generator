<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Letter Tycoon Word Generator </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
      :content-style="{ backgroundColor: '#F1E5B3' }"
    >
      <div class="q-pa-md items-start q-gutter-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Gameplay Settings</div>
            <div class="text-subtitle2">
              Please select the correct settings in order to find the best word
            </div>
          </q-card-section>
        </q-card>
        <setting
          v-for="(setting, key) in settings"
          v-bind:key="key"
          :setting="setting"
          :id="key"
        ></setting>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapGetters("setting", ["settings"]),
  },
  components: {
    setting: require("components/Settings.vue").default,
  },
};
</script>

<style scoped>
.options {
  overflow: hidden;
}
.bg {
  background-image: url("../assets/back-main.webp");
}
</style>
