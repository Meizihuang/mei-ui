import Vue from "vue";
import Router from "vue-router";
import IndexView from "@/views/IndexView";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/index",
            name: "index",
            component: IndexView
        },
        {
            path: "/about/:id",
            name: "about",
            component: () => import( /* webpackChunkName: "about" */ "@/views/AboutView"),
            props: true
        },
        {
            path: "/",
            redirect: {
                name: "index"
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})