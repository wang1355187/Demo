<template>
    <div id="app">
        <div class="tab">
            <ul>
                <router-link tag="li" to="/">todoList</router-link>
                <router-link tag="li" to="/cheet">五子棋</router-link>
            </ul>
        </div>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>
<style lang="stylus" scoped>
@import './assets/styles/mixin.styl'
#app
  pos()
  background url('./assets/images/bg.jpg')
  background-size cover
  font-size 20px
  overflow hidden
  display flex
  align-items center
  justify-content center
.tab
    position absolute
    top 30px
    margin 0 auto
    ul
        li
            text-decoration none
            text-align center
            color #ffffff
            font-weight 600
            cursor pointer
            list-style none
            height 30px
            width 140px
            background-color #1874CD
            float left
            border-radius 6px
            margin-left 10px
</style>