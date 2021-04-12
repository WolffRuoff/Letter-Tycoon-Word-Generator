<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ setting.title }}</div>
      <div class="text-subtitle2">{{ setting.caption }}</div>
    </q-card-section>

    <q-card-section>
      <q-btn-toggle
        class="options"
        no-caps
        push
        no-wrap
        spread
        name="setting.title"
        toggle-color="primary"
        toggle-text-color="secondary"
        color="secondary"
        text-color="primary"
        v-model="selected"
        :options="setting.options"
        @click="updateSetting({ id: id, updates: {selected: selected}})"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Settings",
  data() {
    return {
      selected: 0
    }
  },
  props: ["setting", 'id'],
  methods: {
    ...mapActions ('setting', ['updateSetting'])
  }
};
</script>

<style scoped>
</style>