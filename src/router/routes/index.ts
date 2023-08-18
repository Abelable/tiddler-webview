import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import shop from "./shop";
import scenic from "./scenic";
import hotel from "./hotel";

const routes: Array<RouteRecordRaw> = [
  ...agreements,
  ...shop,
  ...scenic,
  ...hotel,
];

export default routes;
