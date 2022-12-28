import { RouteRecordRaw } from "vue-router";
import merchant from "./merchant";
import shop from "./shop";

const routes: Array<RouteRecordRaw> = [...merchant, ...shop];

export default routes;
