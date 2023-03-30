import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import shop from "./shop";

const routes: Array<RouteRecordRaw> = [...agreements, ...shop];

export default routes;
