<template>
  <div class="panel">
    <h4>控制面板</h4>
    <ul>
      <li>
        <button @click="changeColor(true)" :class="{select:isBlack,isGaming:isGaming}">黑棋</button>
        <button @click="changeColor(false)" :class="{select:!isBlack,isGaming:isGaming}">白棋</button>
      </li>
      <li>
        <button @click="reSquence(true)" :class="{select:isFirst,isGaming:isGaming}">先手</button>
        <button @click="reSquence(false)" :class="{select:!isFirst,isGaming:isGaming}">后手</button>
      </li>
      <li>
        <button @click="toggleState">{{btn_state}}</button>
      </li>
    </ul>
    <label>{{message}}</label>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'ControlPanel',
  data () {
    return {
      btn_state: '开始',
      isBlack: true,   //是否使用黑色棋子
      isFirst: true,  //是否先手
      isGaming:false  //用于控制游戏中禁用按钮
    }
  },
  computed: {
    ...mapState(['message'])
  },
  methods: {
    ...mapMutations(['updateMessage']),
    //控制游戏开始或重玩
    toggleState () {
      if(this.btn_state == '开始'){
        this.btn_state = '重玩'
        this.isGaming = true
        this.updateMessage('游戏进行中')
        this.$emit('toggleState', {
          state: 'start',
          isBlack: this.isBlack,
          isFirst: this.isFirst
        })
      }
      else {
        this.btn_state = '开始'
        this.isGaming = false
        this.updateMessage('游戏尚未开始')
        this.$emit('toggleState', {
          state: 'replay',
          isBlack: this.isBlack,
          isFirst: this.isFirst
        })
      }
    },

    //设置棋子颜色
    changeColor (color) {
      if (color) {
        if (this.isBlack) {
          return
        }
        this.isBlack = !this.isBlack
      }
      else {
        if(this.isBlack) {
          this.isBlack = !this.isBlack
        }
      }
    },
    //设置下棋顺序
    reSquence (turn) {
      if (turn) {
        if (this.isFirst) {
          return
        }
        this.isFirst = !this.isFirst
      }
      else {
        if(this.isFirst) {
          this.isFirst = !this.isFirst
        }
      }      
    }

  }
}
</script>
<style lang="stylus" scoped>
  .panel
    position absolute
    width 300px
    height 450px
    top 0
    right 0
    text-align center
    user-select none
    ul
      padding 0
    li
      list-style none
      margin-top 10px
      button
        margin-right 15px
        padding 8px 30px
        background-color rgb(100, 167, 233)
        border 0
        cursor pointer
        transition background-color 0.3s ease
        &:hover
          background-color #3A5FCD
        &.select
          padding 3px 25px
          border 5px solid #F3C242
          background-color #3A5FCD
        &.isGaming
          pointer-events none
          opacity 0.5
</style>