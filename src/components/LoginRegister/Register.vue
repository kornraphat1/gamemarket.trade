<template>
  <div>
    <div class="LoginContainer">
      <transition name="slide-fade">
        <div class="LoginCard" v-if="loginShow">
          <div class="LoginZone">
            <div class="TopZone">
              <div class="Header">
                Register
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
                    placeholder="Username"
                    :autofocus="usernameStatus ? true : true"
                    @keypress="clsNumberOnly($event)"
                  />
                </div>
                <div v-if="usernameStatus" class="AlertZone">
                  **กรุณากรอก Username
                </div>
 
                <div class="Border"></div>
                <div class="Text">สร้างรหัสผ่านใหม่</div>
                <div class="InputZone">
                  <input
                    :type="passwordType"
                    v-model="password"
                    id="password"
                    class="Input"
                    :class="passwordStatus ? 'inputalert' : ''"
                    placeholder="Password"
                    :autofocus="passwordStatus ? true : ''"
                    @keypress="clsNumberOnly($event)"
                  />

                  <div class="Eyeicon" @click="ShowPassword()">
                    <i v-if="passwordType == 'text'" class="fas fa-eye"></i>
                    <i v-else class="fas fa-eye-slash"></i>
                  </div>
                </div>
                <div v-if="passwordStatus" class="AlertZone">
                  **กรุณากรอก Password
                </div>
                <div class="Text"> ยืนยันรหัสผ่าน</div>
                <div class="InputZone">
                  <input
                    :type="passwordType"
                    v-model="password"
                    id="password"
                    class="Input"
                    :class="passwordStatus ? 'inputalert' : ''"
                    placeholder="Password"
                    :autofocus="passwordStatus ? true : ''"
                    @keypress="clsNumberOnly($event)"
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
            

              <button class="btn btn-login" @click="goLogin()">
                ยืนยัน
              </button>
            </div>
          </div>
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
      loginShow: false,
      username: "",
      password: "",
      passwordType: "password",
      comfirmpasswordType: "password",
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
      this.loginShow = true;
    }, 800);
  },

  methods: {
  
    
  },
  watch: {},
  computed: {},
};
</script>
