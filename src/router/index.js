import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import MateriaPrima from '../components/MateriaPrima.vue'
import ConfigProduct from "@/components/ConfigProduct";
import EntradaMatPrima from "@/components/EntradaMatPrima";
import MovimientoMatePrima from "@/components/MovimientoMatePrima";
import Usuarios from "@/components/Usuarios";
import Proveedores from "@/components/Proveedores/Proveedores";
import HistorialMovimientomateriaPrima from "@/components/HistorialMovimientomateriaPrima";
import Inventario from "@/components/Inventario";
import Empleados from "@/components/Empleados";
import Login from '@/views/Login';
import Inicio from "@/views/Inicio";

import Sucursal from "@/components/Sucursarles/Sucursal";

Vue.use(VueRouter, Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {requireAuth: true}
        },
        {
            path: '/inicio',
            name: 'inicio',
            component: Inicio,
            meta: {requireAuth: true}
        },
        {
            path: '/proveedor',
            name: 'proveedor',
            component: Proveedores,
            meta: {requireAuth: true}
        },
        {
            path: '/materiaPrima',
            name: 'materiaPrima',
            component: MateriaPrima,
            meta: {requireAuth: true}
        },
        {
            path: '/configProduct',
            name: 'configProduct',
            component: ConfigProduct,
            meta: {requireAuth: true}
        },
        {
            path: '/entradaMatPrima',
            name: 'entradaMatPrima',
            component: EntradaMatPrima,
            meta: {requireAuth: true}
        },
        {
            path: '/MovimientoMatePrima',
            name: 'movimientoMatePrima',
            component: MovimientoMatePrima,
            meta: {requireAuth: true}
        },
        {
            path: '/historialMovimientomateriaPrima',
            name: 'historialMovimientomateriaPrima',
            component: HistorialMovimientomateriaPrima,
            meta: {requireAuth: true}
        },
        {
            path: '/usuarios',
            name: 'usuarios',
            component: Usuarios,
            meta: {requireAuth: true}
        },
        {
            path: '/inventario',
            name: 'inventario',
            component: Inventario,
            meta: {requireAuth: true}
        },
        {
            path: '/empleados',
            name: 'empleados',
            component: Empleados,
            meta: {requireAuth: true}
        },
      
        {
            path: '/sucursal',
            name: 'sucursal',
            component: Sucursal,
            meta: {requireAuth: true}
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/about',
            name: 'About',
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
    ]
})
router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth)
    if (rutaProtegida && store.state.token === '') {
        next({name: 'login'})
    }else{
        next();
    }
})


export default router;
