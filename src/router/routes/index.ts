import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import shop from "./shop";
import scenic from "./scenic";

const routes: Array<RouteRecordRaw> = [...agreements, ...shop, ...scenic];

export default routes;
