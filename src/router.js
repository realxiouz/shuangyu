import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: () => import('@/views/Login'),
            hidden: true
        },
        {
            path: "/",
            name: "home",
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    name: 'Index',
                    component: () => import('@/views/Index'),
                    meta: {title: 'Index', icon: 'index'}
                },
                {
                    path: 'about',
                    name: 'About',
                    component: () => import('@/views/About'),
                    meta: {title: 'About', icon: 'about'}
                }]
        }
    ]
});
