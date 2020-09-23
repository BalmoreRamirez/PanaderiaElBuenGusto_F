import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MateriaPrima from '../components/MateriaPrima.vue'
import ConfigProduct from "@/components/ConfigProduct";
import EntradaMatPrima from "@/components/EntradaMatPrima";
import MigracionMatePrima from "@/components/MigracionMatePrima";
import Usuarios from "@/components/Usuarios";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/materiaPrima',
        name: 'materiaPrima',
        component: MateriaPrima
    },
    {
        path: '/configProduct',
        name: 'configProduct',
        component: ConfigProduct
    },
    {
        path: '/entradaMatPrima',
        name: 'entradaMatPrima',
        component: EntradaMatPrima
    },
    {
        path: '/migracionMatePrima',
        name: 'migracionMatePrima',
        component: MigracionMatePrima
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: Usuarios
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
