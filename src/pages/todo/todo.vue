<template>
  <div>
    <section>
      <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下来要做什么？"
        v-model="content"
        @keyup.enter="addTodo(content)"
      >
      <todo-item
        v-for="(item,index) of todoList"
        :todo="item" :key="index"
        :index="index"
        :state="state"
        @deleteItem="deleteList"
      >
      </todo-item>
      <todo-tabs
        :num="state_num"
        @changeState="changeState"
        @clearCompleted="clearCompleted"
      >
      </todo-tabs>
    </section>
  </div>
</template>
<script>
import TodoItem from './item.vue'
import TodoTabs from './tabs.vue'
export default {
  name: 'Todo',
  components: {
    TodoItem,
    TodoTabs
  },
  data () {
    return {
      content: '',
      todoList: [],
      state: 'all',
      state_num: 0
    }
  },
  methods: {
    addTodo (content) {
      this.todoList.push({
        completed: false,
        content
      })
      this.content = ''
      this.state_num = this.getNum()
    },
    deleteList (index) {
      this.todoList.splice(index,1)
      this.state_num = this.getNum()
    },
    getNum () {
      let num = 0;
      switch(this.state) {
        case 'all':
          return this.todoList.length
        case 'active':
          this.todoList.forEach( (item) => {
            if(!item.completed){
              num++;
            }
          })
          return num
        case 'completed':
          this.todoList.forEach( (item) => {
            if(item.completed){
              num++;
            }
          })
          return num
      }
    },
    changeState (state) {
      this.state = state
      this.state_num = this.getNum()
    },
    clearCompleted () {
      this.todoList = this.todoList.filter( (item) => {
        return item.completed === false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .add-input
    box-sizing border-box
    padding 10px
    height 60px
    width 500px
    outline none
    border 0
    font-size 24px
</style>