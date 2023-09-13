import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import shop from "./shop";
import scenic from "./scenic";
import hotel from "./hotel";
import catering from "./catering";

const routes: Array<RouteRecordRaw> = [
  ...agreements,
  ...shop,
  ...scenic,
  ...hotel,
  ...catering,
];

export default routes;
