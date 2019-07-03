import Vue from "vue";
import Router from "vue-router";
import IndexView from "@/views/IndexView";
import {
    isAbsolute
} from "path";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "index",
            component: IndexView
        },
        {
            path: "/about",
            name: isAbsolute,
            component: () => import( /* webpackChunkName: "about" */ "@/views/AboutView")
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