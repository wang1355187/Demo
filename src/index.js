import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import createRouter from './router/router'
import Vuex from 'vuex'
import store from '../src/store/store'
import './assets/images/bg.jpg'
import './assets/styles/test.css'
import './assets/styles/global.styl'

const root = document.createElement('div')
const router = createRouter()
Vue.use(VueRouter)
Vue.use(Vuex)

document.body.appendChild(root)
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount(root)