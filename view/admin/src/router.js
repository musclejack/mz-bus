import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routers = [{
    path: '/login',
    name: 'login',
    component(resolve) {
        require.ensure(['./views/login'], () => {
            resolve(require('./views/login/index.vue'));
        });
    }
},{
    path: '/list/:id',
    name: 'list',
    component(resolve) {
        require.ensure(['./views/list'], () => {
            resolve(require('./views/list/index.vue'));
        });
    }
},{
    path: '/carlist',
    name: 'car-list',
    component(resolve) {
        require.ensure(['./views/car-list'], () => {
            resolve(require('./views/car-list/index.vue'));
        });
    }
}];

export default routers;