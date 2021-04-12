<template>
  <div 
    v-bind:class="{ notOwned: !patent.owns }"
    :style="{'background-position-x': patent.x, 'background-position-y':patent.y}"
    class="patenta"
    @click="updatePatent({ id: letter, updates: {owns: !patent.owns}})"
    ></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Patent',
  props: ['patent','letter'],
  data () {
    return {
      owns: false
    }
  },
  methods: {
    ...mapActions ('patent', ['updatePatent'])
  }
}
</script>

<style>
.patenta {
  background-size: 200% auto;
  border-radius: 8px;
  top: 50px;
  width: 10.7vw;
  height: 7.045vw;
  background-image: url('../assets/patents.webp');
  border: 0.1vw black solid;
  box-shadow: 0 0.2vw 0.4vw 0 rgba(0, 0, 0, 0.2), 0 0.3vw 1vw 0 rgba(0, 0, 0, 0.19);
}
.notOwned {
  filter: grayscale();
}

</style>
