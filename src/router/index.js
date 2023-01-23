import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Marketplace from "../views/Marketplace.vue";


import Trade from "../views/Trade.vue";
// import Vertify from "../views/Vertify.vue";
import Myitems from "../views/Myitems.vue";
import Payment from "../views/Payment.vue";
import Login from "../views/AutoLogin.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Forgetpass from "../views/Forgetpass.vue";
import LoginPage from "../views/LoginPage.vue";
// import Closeapp from "../views/Closeapp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    component: Marketplace,
  },
  {
    path: "/marketplace/:idgame",
    name: "Marketplace-idgame",
    component: Marketplace,
  },
  {
    path: "/trade/:gameid/:id",
    name: "Trade",
    component: Trade,
  },

  // {
  //   path: "/Vertify",
  //   name: "Vertify",
  //   component: Vertify,
  // },
  {
    path: "/Payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/Login/:access_key/:username/:timestamp/:token",
    name: "Login",
    component: Login,
  },
  {
    path: "/Login/:access_key/:username/:timestamp/:token/:item",
    name: "LoginItem",
    component: Login,
  },
  {
    path: "/Login/",
    name: "LoginPage",
    component: LoginPage,
  },

  {
    path: "/Forgetpassword",
    name: "Forgetpass",
    component: Forgetpass,
  },
  // {
  //   path: "/Closeapp",
  //   name: "Closeapp",
  //   component: Closeapp,
  // },
  {
    path: "/Myitems",
    name: "Myitems",
    meta: {
      reload: true,
    },
    component: Myitems,
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach(async () => {
//   if (process.env.VUE_APP_CLOSE === 1) {
//     return { name: "Closeapp" };
//   }
// });
export default router;
