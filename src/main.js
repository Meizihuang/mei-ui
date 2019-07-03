import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./assets/css/reset.css";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render(h) {
        return h(App)
    }
}).$mount("#app")