// import css from './util/prefixfree.min.js'
import Vue from 'vue'
import App from './views/index'
import VueRouter from 'vue-router'
import VueRrsource from 'vue-resource'
import routes from './router.js'
import store from './vuex/store'
// import ElementUI from 'element-ui'
import './scss/base.scss'

// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI)
Vue.use(VueRrsource)

const router = new VueRouter({
    // mode: 'history',
    routes
})
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})