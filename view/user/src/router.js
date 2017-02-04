import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routers = [{
    path: '/user',
    name: 'user',
    component(resolve) {
        require.ensure(['./views/user'], () => {
            resolve(require('./views/user/index'))
        });
    }
}]

export default routers;