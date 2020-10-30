<<template>
  <div class="item-box" v-show="stateShow()">
    <input
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label :class="['item-content',todo.completed?'completed':'']">{{todo.content}}</label>
    <button class="btn-cancel" @click="deleteItem(index)">删除</button>
  </div>
</template>
<script>
export default {
  name: 'item',
  props: [
    'todo',
    'index',
    'state'
  ],
  data () {
    return {

    }
  },
  methods: {
    deleteItem(index) {
      this.$emit('deleteItem', index)
    },
    stateShow () {
      switch(this.state) {
        case 'all':
          return true
        case 'active':
          return !this.todo.completed
        case 'completed':
          return this.todo.completed
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .item-box
    position relative
    background #fff
    height 50px
    width 500px
    overflow hidden
    font-size 22px
    display flex
    align-items center
    box-sizing border-box
    padding 8px
    border-top 1px solid rgba(20,20,20,0.1)
  .toggle
    margin-right 10px
    height 30px
    width 30px
    background #fff
  .btn-cancel
    float right
    width 50px
    background #fff
    border 0
    font-size 15px
    outline none
    cursor pointer
    &:hover
      color #333
      opacity 0.8
  .item-content
    flex 1
    margin-right 10px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
  .completed
    text-decoration line-through
</style>