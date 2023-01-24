<template>
  <div>
    <div
      class="collapse navbar-collapse navbar-menu-div fixed-top"
      id="navbarNavDropdown"
    >
      <ul class="navbar-nav nav-list-menu">
        <li class="nav-item pb-3">
          <router-link
            to="/"
            :class="{ selected: this.route_name == 'Home' }"
            @click.native="hideMenu()"
          >
            <span>Homepage</span></router-link
          >
        </li>
        <li class="nav-item pb-3">
          <router-link
            :class="{ selected: this.route_name == 'Marketplace' }"
            @click.native="hideMenu()"
            to="/marketplace"
            active-class="active"
          >
            <span>Marketplace</span></router-link
          >
        </li>
        <li class="nav-item pb-3" v-if="this.$cookies.get('token_main')">
          <router-link
            :class="{
              selected:
                this.route_name == 'Myitems' || this.route_name == 'Trade',
            }"
            @click.native="hideMenu()"
            to="/Myitems"
            active-class="active"
          >
            <span>My&nbsp;items</span></router-link
          >
        </li>
        <!-- <li class="nav-item pb-3">
          <a
            :class="{ selected: this.route_name == 'Contact' }"
            data-toggle="modal"
            data-target="#ModalContact"
            @click="hideMenu()"
          >
            <span>Contact&nbsp;Us</span>
          </a>
        </li> -->
        <li class="nav-item pb-3">
          <div class="loginWi">
            <a
              class=""
              href="https://wallet.wipay.co.th/how-to-onboard/"
              target="_blank"
            >
              <img
                src="@/assets/img/Frame 9.png"
                class="d-inline-block align-top logo"
                alt=""
              />
            </a>
          </div>
        </li>
      </ul>
    </div>
    <User></User>

    <div
      class="navbar navbar-expand-lg navbar-light "
      id="navbar"
      v-if="
        this.route_name != 'Vertify' &&
          this.route_name != 'Login' &&
          this.route_name != 'LoginItem' &&
          this.route_name != 'LoginPage' &&
          this.route_name != 'Forgetpass'
      "
    >
      <nav class="row col-9 ">
        <div class="menu-bar">
          <button
            class="navbar-tog"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @onclick="hamberBar(this)"
          >
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </button>

          <a class="navbar-brand" style=" max-width: 250px;" href="/">
            <img
            style="width: 100%;"
              src="@/assets/img/logo2.png"
              class="d-inline-block align-top logo"
              alt=""
          /></a>
        </div>

        <div class="collapse navbar-collapse navbar-menu-div">
          <ul class="navbar-nav nav-list-menu">
            <li class="nav-item">
              <router-link
                to="/"
                :class="{ selected: this.route_name == 'Home' }"
                @click.native="hideMenu()"
              >
                <span>Homepage</span></router-link
              >
            </li>
            <li class="nav-item ">
              <router-link
                :class="{ selected: this.route_name == 'Marketplace' }"
                @click="hideMenu()"
                to="/marketplace"
                active-class="active"
              >
                <span>Marketplace</span></router-link
              >
            </li>
            <li class="nav-item" v-if="this.$cookies.get('token_main')">
              <router-link
                :class="{
                  selected:
                    this.route_name == 'Myitems' || this.route_name == 'Trade',
                }"
                @click="hideMenu()"
                to="/Myitems"
                active-class="active"
              >
                <span>My&nbsp;items</span></router-link
              >
            </li>
            <!-- <li class="nav-item ">
              <a
                :class="{ selected: this.route_name == 'Contact' }"
                data-toggle="modal"
                data-target="#ModalContact"
                @click="hideMenu()"
              >
                <span>Contact&nbsp;Us</span>
              </a>
            </li> -->
          </ul>
        </div>
      </nav>
      <div
        class="navbar-register  col-3"
        style="display: flex; justify-content: flex-end;"
      >
        <div class="loginWi showWabOrly">
          <a
            class=""
            href="https://wallet.wipay.co.th/how-to-onboard/"
            target="_blank"
          >
            <img
              src="@/assets/img/Frame 9.png"
              class="d-inline-block align-top logo"
              alt=""
            />
          </a>
        </div>

        <div class=" cart " v-if="this.$cookies.get('token_main')">
          <a
            href="#"
            style="display: flex;align-items: center;"
            @click="check()"
            data-toggle="modal"
            data-target="#ModalUser"
          >
            <img src="@/assets/img/user.png" alt="" class="img_user"/>

            <i
              style="padding-left:5px; color:#8692A6"
              class="fas fa-sort-down"
            ></i
          ></a>
        </div>
        <div class=" cart " v-else>
      
<!-- 
        <router-link
                class="btn navBtnLogin"
                to="/Login"
               
              >
                <span>Login</span></router-link
              > -->
          <!-- <button class="btn navBtnLogin" @click="goLogin()">
            Login
          </button> -->
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
import User from "./User.vue";

export default {
  name: "Navbar",
  props: {
    msg: String,
  },

  data() {
    return {
      selected: this.$selected ? this.$selected : 0,
      image: "@/assets/img/cardd.png",
      userdetail: "",
      user_name: "",
      withdrawnum: null,
      passwordFieldType: "password",
      first_name: "",
      last_name: "",
      password: "",
      Bank: "",
      route: this.$route,
      // route_name: this.$route.name,
      account_number: "",
    };
  },

  mounted() {
    
    // this.checkNav(this.$route.name);
  },

  methods: {
    checkNav(route) {
      switch (route) {
        case "Home":
          this.changeSelected(0);
          break;
        case "Marketplace":
          this.changeSelected(1);
          break;
        case "Myitems":
          this.changeSelected(2);
          break;
        default:
          this.changeSelected(0);
      }
    },

    hideMenu() {
      let menu = document.getElementById("navbarNavDropdown");
      menu.classList.remove("show");
    },
    check() {
      this.checkToken();
    },
    changeSelected(k) {
      this.selected = k;
    },
    hamberBar(x) {
      x.classList.toggle("change");
    },
    gologin(){

    }
  },
  computed: {
    route_name() {
      return this.$route.name;
    },
  },
  watch: {},
  components: { User },
};
</script>

<style scoped></style>
