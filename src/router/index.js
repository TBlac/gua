import Vue from "vue";
import Router from "vue-router";
// import Home from "@/components/Home";
// import Login from "@/components/Login";
// import NotFound from "@/components/NotFound";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      hidden: true,
      component: () => import("@/components/Login") //实现页面懒加载
    },
    {
      path: "/home",
      name: "员工管理",
      //进入home页默认初始化的页面
      // redirect: "/home/empList",
      icon: "fa fa-user-o",
      component: () => import("@/components/Home"),
      children: [
        {
          path: "/home/empInfo",
          name: "员工信息",
          icon: "fa fa-info",
          component: () => import("@/components/emps/EmpInfo")
        },
        {
          path: "/home/empList",
          name: "员工列表",
          icon: "fa fa-list",
          component: () => import("@/components/emps/EmpList")
        },
        {
          path: "/home/empWork",
          name: "员工工作信息",
          component: () => import("@/components/emps/EmpWork"),
          icon: "fa fa-steam-square"
        }
      ]
      // component: resolve => require(["@/components/Home"], resolve) //实现页面懒加载
    },
    {
      path: "/divination",
      name: "算卦篇",
      component: () => import("@/components/Home"), //实现页面懒加载
      children: [
        {
          path: "/divination/gossip",
          name: "八卦篇",
          component: () => import("@/components/divination/Gossip")
        }
      ]
    },
    {
      path: "*",
      name: "notFound",
      hidden: true,
      component: () => import("@/components/NotFound") //实现页面懒加载
    }
  ],
  mode: "history"
});
