<template>
  <div>
    <template v-if="loginShow == true">
      <LoginComp v-if="ChkLoginOrRegis == 1" @registerClick="registerClick" />
      <Tel v-else/>
    </template>
    <div class="bg-vertify">
      <div class="bg-b-vertify"></div>
    </div>
    <div class="vertify-main-content">
      <transition name="slide-fade">
        <div class="logo-vertify" v-if="show">
          <img src="@/assets/img/logo-vertify2.png" alt="" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import LoginComp from "../components/LoginRegister/LoginComp.vue";
import Tel from "../components/LoginRegister/Tel.vue";
export default {
  data() {
    return {
      token: "",
      show: false,
      loginShow: false,
      username: "",
      password: "",
      passwordType: "password",
      usernameStatus: false,
      passwordStatus: false,
      ChkLoginOrRegis: 1,
    };
  },
  mounted() {
    document.getElementById("footer-contener").style.display = "none";
    // document.getElementById("navbar").style.display = "none";
    // this.$route.params.access_key
    // this.goLogin();
    this.show = true;

    setTimeout(() => {
      this.loginShow = true;
    }, 500);
  },
  methods: {
    registerClick(val) {
        console.log(val);
      if (val) {
        this.ChkLoginOrRegis = 2;
      }
    },
    goLogin() {
      if (this.username) {
        this.usernameStatus = false;
        if (this.password) {
          this.passwordStatus = false;
          alert("login");
        } else {
          this.passwordStatus = true;
          document.getElementById("password").focus();
        }
      } else {
        this.usernameStatus = true;
        document.getElementById("username").focus();
      }
    },
    goHome() {
      window.location.href = "/";
    },
    ShowPassword() {
      if (this.passwordType == "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  watch: {},
  computed: {},
  components: { LoginComp, Tel },
};
</script>
