import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import OtpInput from "@bachdgvn/vue-otp-input";
import VuePassword from "vue-password";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import VueSimpleAlert from "vue-simple-alert";
import Select2 from "v-select2-component";
import VueGoodTablePlugin from "vue-good-table";
import VueAnalytics from "vue-analytics";
import VueMeta from "vue-meta";
// import the styles
import "vue-good-table/dist/vue-good-table.css";
Vue.use(VueAnalytics, {
  id: "UA-229616286-1",
  router,
});
Vue.use(VueMeta);

Vue.use(VueSimpleAlert);
// Vue.config.productionTip = false
Vue.use(VueGoodTablePlugin);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.component("v-otp-input", OtpInput);
Vue.component("vuePassword", VuePassword);
Vue.component("Select2", Select2);

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.filter("number_format", function(
  number,
  decimals,
  dec_point,
  thousands_sep
) {
  if (number == 0) {
    return number;
  } else {
    number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      s = "",
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return "" + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
});
Vue.filter("getdatecontdown", function(t) {
  var xpday = new Date(t);
  // var xpday = new Date('2022-07-08T17:53:36.654764+07:00');
  var toDay = new Date();

  var Difference_In_Time = xpday.getTime() - toDay.getTime();

  var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  var Difference_In_H = Math.floor(Difference_In_Time / (1000 * 3600));
  var Difference_In_M = Math.floor(Difference_In_Time / (1000 * 60));
 
  if (Difference_In_Days > 0) {
    return Difference_In_Days + " วัน";
  } else if (Difference_In_H > 0) {
    return Difference_In_H + " ชั่วโมง";
  } else if (Difference_In_M > 0) {
    return Difference_In_M + " นาที";
  } else {
    return "";
  }
  
});

Vue.filter("color_sty", function(cls) {
  let color_sty = "";

  switch (cls) {
    case 1:
      color_sty = "color:#BDF101";
      break;
    case 2:
      color_sty = "color:#B3FCFE";
      break;
    case 3:
      color_sty = "color:#E740EB";
      break;
    case 4:
      color_sty = "color:#FFE107";
      break;
    case 5:
      color_sty = "color:#FF1A01";
      break;
    case "trade":
      color_sty = "color:#0c3175";
      break;
    default:
      color_sty = "color:#fff";
  }

  return color_sty;
});

Vue.filter("checksrc", function(path) {
  // console.log(path);
  if (path) {
    return path;
  } else {
    return "/src/assets/img/no-image.jpg";
  }
});
Vue.filter("account_number_show", function(account_number) {
  let count = account_number.length;

  let account_number_show =
    account_number.slice(0, 3) +
    "-" +
    account_number.slice(3, 4) +
    "-" +
    account_number.slice(4, 9) +
    "-" +
    account_number.slice(9, count);
  return account_number_show;
});
// Vue.filter("doesFileExist", function(urlToFile) {
//   const img = new Image();

//   img.src = urlToFile;

//   if (img.complete) {
//   } else {
//     img.onload = () => {
//       return "@/assets/img/no-image.jpg";
//     };

//     img.onerror = () => {
//       return urlToFile;
//     };
//   }
// });

const API_URL = process.env.VUE_APP_APP_URL;
const IMG_image = Vue.observable(require("@/assets/img/no-image.jpg"));
const IMG_URL = process.env.VUE_APP_IMG_URL;
const IMG_URL_ITEM = process.env.VUE_APP_IMG_URL_ITEM;
const LIMIT_WITHDRAW = process.env.VUE_APP_LIMIT_WITHDRAW;

Vue.prototype.$API_URL = API_URL;
Vue.prototype.$IMG_URL = IMG_URL;
Vue.prototype.$IMG_image = IMG_image;
Vue.prototype.$IMG_URL_ITEM = IMG_URL_ITEM;
Vue.prototype.$LIMIT_WITHDRAW = LIMIT_WITHDRAW;

// Vue.prototype.$actions = actions;
Vue.mixin({
  methods: {
    checkTokenTimeout() {
      console.log(this.$route.params);
      if (this.$route.params.token) {
        console.log("Tokenture");
      } else {
        this.$alert(
          "เซสชั่นหมดอายุ โปรดเข้าสู่ระบบใหม่",
          "เกิดข้อผิดพลาด",
          "error"
        );
      }
    },
    checkToken: function() {
      if (this.$cookies.get("token_main") == null) {
        this.$alert(
          "เซสชั่นหมดอายุ โปรดเข้าสู่ระบบ",
          "เกิดข้อผิดพลาด",
          "error"
        );
        setTimeout(function() {
          window.location.href = "/";
        }, 2000);
      }
    },

    changeSelected: function(k) {
      Vue.prototype.$selected = k;
      // document.getElementById("navbarNavDropdown").className =
      //   "navbar-collapse navbar-menu-div fixed-top collapse";
    },
  },
});

Vue.use(VueRouter);
new Vue({
  router,

  render: (h) => h(App),
}).$mount("#app");
