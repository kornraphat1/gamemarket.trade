<template>
  <div>
    <div class="LoginContainer">
      <transition name="slide-fade">
        <div class="LoginCard" v-if="loginShow == false">
          <div class="LoginZone">
            <div class="TopZone">
              <div class="Header">
                เข้าสู่ระบบ
              </div>

              <div class="Body">
                <div class="Text">เบอร์โทรศัพท์</div>
                <div class="InputZone">
                  <input
                    type="text"
                    v-model="username"
                    id="username"
                    class="Input"
                    :class="usernameStatus ? 'inputalert' : ''"
                    placeholder="กรุณากรอกเบอร์โทรศัพท์ที่ลงทะเบียนไว้"
                    :autofocus="usernameStatus ? true : true"
                    @keyup.enter="enter(1)"
                  />
                </div>
                <div v-if="usernameStatus" class="AlertZone">
                  **กรุณากรอก Username
                </div>

                <div class="Text">รหัสผ่าน</div>
                <div class="InputZone">
                  <input
                    :type="passwordType"
                    v-model="password"
                    id="password"
                    class="Input"
                    :class="passwordStatus ? 'inputalert' : ''"
                    placeholder="กรุณากรอกรหัสผ่าน"
                    :autofocus="passwordStatus ? true : ''"
                    @keyup.enter="enter(2)"
                  />

                  <div class="Eyeicon" @click="ShowPassword()">
                    <i v-if="passwordType == 'text'" class="fas fa-eye"></i>
                    <i v-else class="fas fa-eye-slash"></i>
                  </div>
                </div>
                <div v-if="passwordStatus" class="AlertZone">
                  **กรุณากรอก Password
                </div>
              </div>
            </div>

            <div class="Footer">
              <div class="notFound" v-if="notFound == true">
                ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง กรุณากรอกรหัสผ่านใหม่
              </div>
              <div class="buttonZone">
                <button class="btn btnRegister" @click="goRegister()">
                  Register
                </button>
                <button class="btn btnLogin" @click="goLogin()">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <img src="../../assets/img/loading.svg" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      show: false,
      loginShow: true,
      notFound: false,
      username: "",
      password: "",
      passwordType: "password",
      usernameStatus: false,
      passwordStatus: false,
    };
  },

  mounted() {
    document.getElementById("footer-contener").style.display = "none";
    // document.getElementById("navbar").style.display = "none";
    // this.$route.params.access_key
    // this.goLogin();
    this.show = true;
    setTimeout(() => {
      this.loginShow = false;
    }, 1800);
  },

  methods: {
    goLogin() {
      if (this.username) {
        this.usernameStatus = false;

        if (this.password) {
          this.passwordStatus = false;
          this.notFound = true;
          this.username = "";
          this.password = "";
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
    goRegister() {
      this.$emit("registerClick", true);
    },
    enter(e) {
      if (e == 1) {
        document.getElementById("password").focus();
      } else {
        this.goLogin();
      }
    },

    clsNumberOnly(e) {
      var regex = new RegExp("^[0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        return true;
      }

      e.preventDefault();
      return false;
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
  },
  watch: {},
  computed: {},
};
</script>
