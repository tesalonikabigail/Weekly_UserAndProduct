import Vue from 'vue'
import Router from 'vue-router' // createRouter, createWebHistory
import { interopDefault } from './.nuxt/utils'

const Ind = () => interopDefault(import('~/pages/index.vue'))
const Register = () => interopDefault(import('~/pages/register.vue'))
const Login = () => interopDefault(import('~/pages/login.vue'))
const Users = () => interopDefault(import('~/pages/users.vue'))
const Products = () => interopDefault(import('~/pages/product.vue'))
const InputNewProduct = () => interopDefault(import('~/pages/inputNewProduct.vue'))

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: 'history',
        linkActiveClass: 'nuxt-link-active',
        linkExactActiveClass: 'nuxt-link-exact-active',
        // history: createWebHistory(), // kyknya itu udh ada di atas
        routes: [
            {
                path: "/",
                name: "home",
                component: Ind
            },
            {
                path: "/regis",
                component: Register,
                name: "regis"
            },
            {
                path: "/login",
                component: Login,
                name: "login"
            },
            {
                path: "/users",
                component: Users,
                name: "usersData"
            },
            {
                path: '/products',
                component: Products,
                name: 'product'
            },
            {
                path: '/products/addnew',
                component: InputNewProduct,
                name: 'inputNewProduct'
            }
        ]
    })
}

// Ndak bisa
// Router.beforeEach((to, from, next) => {
//     if(to.name == 'usersData' && !localStorage.getItem('token')) {
//         next({ name: 'login' });
//     }
//     else if(to.name == 'login' && localStorage.getItem('token')) {
//         next({ name: 'usersData' });
//     }
//     else{
//         next();
//     }
// })