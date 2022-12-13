import { RouteRecordRaw } from "vue-router";
import merchant from "./merchant";
import common from "./common";

const routes: Array<RouteRecordRaw> = [...common, ...merchant];

export default routes;
