<template>
  <div class="container">
    <checker-board :game_info="game_info"></checker-board>
    <control-panel @toggleState="toggleState"></control-panel>
  </div>
</template>
<script>
import CheckerBoard from './CheckerBoard.vue'
import ControlPanel from './ControlPanel.vue'
export default {
  name: 'cheet',
  components: {
    CheckerBoard,
    ControlPanel
  },
  data () {
     return {
       game_info: null
     }
  },
  methods: {
    toggleState (obj) {
      this.game_info = obj
    }
  }
}
</script>
<style lang="stylus" scoped>
  .container
    position relative
    height 450px
    width 750px
    background-color #fff
</style>