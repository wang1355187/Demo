<template>
  <div class="helper">
    <span><span>{{num}}</span> items</span>
    <span class="tabs">
      <span
        v-for="state of states"
        :key="state"
        :class="[filter===state ? 'state-active' : '', 'state']"
        @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearCompleted">Clear completed</span>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    num: Number
  },
  data () {
    return {
      filter: 'all',
      states: [
        'all',
        'active',
        'completed'
      ]
    }
  },
  methods: {
    toggleFilter (state) {
      this.filter = state
      this.$emit('changeState', state)
    },
    clearCompleted () {
      this.$emit('clearCompleted')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .helper
    background-color #fff
    height 30px
    padding 8px
    font-size 16px
    border-top 1px solid rgba(20,20,20,0.1)
    display flex
    justify-content space-between
    align-items center
  .state
    display inline-block
    height 30px
    line-height 30px
    padding 0px 10px
    margin-right 8px
    cursor pointer
    box-sizing border-box
  .state-active
    border 1px solid rgba(230,40,40,0.5)
    border-radius 3px
    box-shadow red 1px 1px 1px 1px
  .clear
    cursor pointer
</style>