import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vant/lib/index.css";
import "./utils/resize";

createApp(App).use(router).mount("#app");
