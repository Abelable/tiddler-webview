import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import merchant from "./merchant";
import shop from "./shop";

const routes: Array<RouteRecordRaw> = [...agreements, ...merchant, ...shop];

export default routes;
