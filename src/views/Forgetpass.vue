<template>
  <div>
    <div class="bg-vertify">
      <div class="bg-b-vertify"></div>
    </div>

    <div class="vertify-main-content">
      <div class="logo-vertify">
        <img src="@/assets/img/logo-vertify2.png" alt="" />
      </div>
      <div class="main-vertify-bg" style="  height:80vh">
        <div class="main-vertify">
          <div class="vertify-content" id="vertify-input">
            <div class="vertify-header">
              <span>ลืมรหัสผ่าน</span>
            </div>
            <div class="vertify-nav row">
              <div
                id="title-phone"
                class="col-4 vertify-item "
                style="opacity: 1;"
              >
                <div class="number-nav">
                  <span>1</span>
                </div>

                <p>เบอร์</p>
                <p>โทรศัพท์</p>
              </div>
              <div
                id="title-otp"
                class="col-4 vertify-item "
                style="opacity: .5;"
              >
                <div class="number-nav">
                  <span>2</span>
                </div>

                <p>ยืนยัน</p>
                <p>OTP</p>
              </div>
              <div
                id="title-pass"
                class="col-4 vertify-item "
                style="opacity: .5;"
              >
                <div class="number-nav">
                  <span>3</span>
                </div>

                <p>สร้าง</p>
                <p>รหัสผ่าน</p>
              </div>
            </div>
            <div
              class="vertify-input"
              id="phone"
              style="display:
            "
            >
              <div class="phone-zone">
                <input
                  id="tel"
                  type="text"
                  placeholder="กรุณาใส่เบอร์โทรศัพท์"
                  @keypress="phoneOnly($event)"
                  maxlength="10"
                  v-model="tel"
                  style="display:block"
                />
                <div class="vertify-button">
                  <button v-on:click="phonenext()">ถัดไป</button>
                </div>
              </div>
            </div>
            <div class="vertify-input" id="otp" style="display:none">
              <div class="otp-zone">
                <v-otp-input
                  ref="otpInput"
                  input-classes="otp-input"
                  separator=""
                  :num-inputs="6"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  @on-complete="handleOnComplete"
                  v-model="otp"
                />

                <p>
                  Didn't receive the SMS?
                  <span @click="Sendagain()"> Send again</span>
                </p>
                <span>Reference : {{ refno }}</span>
                <!-- <a href="">Enter different phone number</a> -->
              </div>
              <div class="vertify-button">
                <button v-on:click="otpnext()">ถัดไป</button>
              </div>
            </div>

            <div class="vertify-input" id="pass" style="display:none">
              <div>
                <vuePassword
                  :type="passwordFieldType"
                  placeholder="สร้างรหัสผ่าน"
                  :disableStrength="true"
                  v-model="pass"
                />

                <vuePassword
                  :type="passwordFieldType"
                  placeholder="ยืนยันรหัสผ่าน"
                  :disableStrength="true"
                  v-model="passcon"
                />
              </div>
              <div class="alert_pass">
                <p>
                  **รหัสผ่านจะต้องประกอบไปด้วยตัวอักษร
                </p>
                <p>พิมพ์เล็ก,พิมพ์ใหญ่,และอักขระพิเศษ</p>
              </div>
              <div class="vertify-button">
                <button v-on:click="PassWnext()">ถัดไป</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      otp: "",
      pass: "",
      passcon: "",
      sendverify: "",

      token: "",
      token_otp: "",
      refno: "",
      phone: "",
      passwordFieldType: "password",
      forgetpass_verify_code: "",
    };
  },

  mounted() {
    document.getElementById("footer-contener").style.display = "none";

    let navbar = document.getElementById("navbar");
    
    // console.log(navbar);
    if (navbar) {
      navbar.style.display = "none";
    }
  },

  methods: {
    phonenext() {
      const self = this;
      if (this.tel) {
        let body = { phone_number: this.tel };

        this.axios
          .post(this.$API_URL + "/api/v1/frontend/checkmember", body)
          .then((response) => {
            if (response.data.code === 0) {
              self.sendotpforgetpasssword();
            } else {
              this.$alert(response.data.msg.th, "เกิดข้อผิดพลาด", "error");
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            // console.log(error.response);
            this.$alert(error.response.data.msg.th, "เกิดข้อผิดพลาด", "error");
          });
      }
    },

    sendotpforgetpasssword() {
      const self = this;
      if (this.tel) {
        let body = { phone: this.tel };
        this.axios
          .post(this.$API_URL + "/api/v1/otp/sendotp-forgetpassword", body)
          .then((response) => {
            if (response.data.code === 0) {
              self.forgetpass_verify_code =
                response.data.forgetpass_verify_code;

              self.axios
                .get(
                  self.$API_URL +
                    "/api/v1/otp/get-response-forgetpassword/" +
                    response.data.forgetpass_verify_code
                )
                .then((response) => {
                  self.refno = response.data.ref;
                  document.getElementById("otp").style.display = "block";
                  document.getElementById("phone").style.display = "none";
                  document.getElementById("title-otp").style.opacity = "1";
                  document.getElementById("title-phone").style.opacity = ".5";
                })
                .catch((error) => {
                  // const self = this;
                  this.errorMessage = error.message;
                  // console.log(error.response.data.msg.th);
                  if (error.response.data.code === 1421) {
                    this.$alert(
                      error.response.data.msg.th,
                      "เกิดข้อผิดพลาด",
                      "error"
                    );
                  }
                });
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            // console.log(error.response);
            this.$alert(error.response.data.msg.th, "เกิดข้อผิดพลาด", "error");
          });
      }
    },

    otpnext() {
      const self = this;
      if (this.otp) {
        if (this.forgetpass_verify_code) {
          let body = { unique_id: this.forgetpass_verify_code, pin: this.otp };
          this.axios
            .post(this.$API_URL + "/api/v1/otp/sendverify-forgetpassword", body)
            .then((response) => {
              if (response.data.code === 0) {
                self.sendverify = response.data.result;

                // console.log(self.sendverify);
                document.getElementById("otp").style.display = "none";
                document.getElementById("pass").style.display = "flex";
                document.getElementById("title-otp").style.opacity = ".5";
                document.getElementById("title-pass").style.opacity = "1";
              }
            })
            .catch((error) => {
              this.errorMessage = error.message;
              // console.log(error.response);
              this.$alert(
                error.response.data.msg.th,
                "เกิดข้อผิดพลาด",
                "error"
              );
              self.handleClearInput();
            });
        }
      }
    },

    PassWnext() {
      const self = this;
      if (this.pass && this.passcon) {
        if (this.pass === this.passcon) {
          this.$confirm("ยืนยัน การตั้งรหัสผ่าน").then(() => {
            let body = {
              phone: self.sendverify.phone,
              token: self.sendverify.token,
              new_password: this.pass,
            };

            this.axios
              .post(
                this.$API_URL + "/api/v1/frontend/updatepasswordmember",
                body
              )
              .then((response) => {
                if (response.data.code == 0) {
                  // console.log(response.data);
                  self.$router.push({
                    name: "Login",
                  });
                } else {
                  this.$alert(response.data.msg.th, "เกิดข้อผิดพลาด", "error");
                }
              })
              .catch((error) => {
                this.errorMessage = error.message;
                // console.log(error.response);
                this.$alert(
                  error.response.data.msg.th,
                  "เกิดข้อผิดพลาด",
                  "error"
                );
                self.handleClearInput();
              });
          });
        } else {
          this.$alert(
            "รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่",
            "เกิดข้อผิดพลาด",
            "error"
          );
        }
      }
    },
    phoneOnly(e) {
      // Accept only alpha numerics, no special characters
      var regex = new RegExp("^[0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        return true;
      }

      e.preventDefault();
      return false;
    },
    handleOnComplete(value) {
      this.otp = value;
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  watch: {},
  computed: {},
};
</script>
