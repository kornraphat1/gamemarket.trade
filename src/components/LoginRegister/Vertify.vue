<template>
  <div>
    <div class="main-vertify-container">
      <div class="main-vertify">
        <div class="vertify-content" id="vertify-input">
          <div class="vertify-header">
            <span>ยืนยันตัวตน</span>
          </div>

          <div class="vertify-nav row">
            <div
              id="title-tel"
              class="col-4 vertify-item "
              :class="step == 1 ? 'op1' : ''"
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
              :class="step == 2 ? 'op1' : ''"
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
              :class="step == 3 ? 'op1' : ''"
            >
              <div class="number-nav">
                <span>3</span>
              </div>

              <p>สร้าง</p>
              <p>รหัสผ่าน</p>
            </div>
          </div>

          <div class="vertify-input" v-if="step == 1">
            <input
              class="inputTel"
              type="text"
              placeholder="กรุณาใส่เบอร์โทรศัพท์"
              v-model="tel"
              @keypress="clsNumberOnly($event)"
            />
            <div class="vertify-button">
              <button v-on:click="telnext()">ถัดไป</button>
            </div>
          </div>
          <div class="vertify-input" v-else-if="2">
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

          <div class="vertify-input" v-else-if="3">
            <div>
              <vuePassword
                :type="passwordFieldType"
                placeholder="สร้างรหัสผ่าน"
                :disableStrength="true"
                autocomplete="off"
                v-model="pass"
              />

              <vuePassword
                :type="passwordFieldType"
                placeholder="ยืนยันรหัสผ่าน"
                :disableStrength="true"
                autocomplete="off"
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
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      otp: "",
      pass: "",
      passcon: "",
      verify_link: "",
      token: "",
      token_otp: "",
      refno: "",
      phone: "",
      passwordFieldType: "password",
      step: 1,
    };
  },

  mounted() {
    document.getElementById("footer-contener").style.display = "none";

    // let navbar = document.getElementById("navbar");
    // if (navbar) {
    //   navbar.style.display = "none";
    // }

    this.verify_link = this.$route.query.verify_link;
    this.axios
      .get(
        this.$API_URL +
          "/api/v1/otp/get-response/" +
          this.$route.query.verify_link
      )
      .then((response) => {
        this.token_otp = response.data.result.token;
        this.phone = response.data.result.phone;
        this.refno = response.data.result.refno;
      })
      .catch((error) => {
        // const self = this;
        this.errorMessage = error.message;
        if (error.response.data.code === 1421) {
          this.$alert(error.response.data.msg.th, "เกิดข้อผิดพลาด", "error");
        }
      });
  },

  methods: {
    clsNumberOnly(e) {
      var regex = new RegExp("^[0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        return true;
      }

      e.preventDefault();
      return false;
    },
    telnext() {
      this.step = 2;
    },




    Sendagain() {
      const self = this;

      let Sendagain_body = { token: this.token_otp, phone: this.phone };

      this.axios
        .post(this.$API_URL + "/api/v1/otp/resend", Sendagain_body)
        .then((response) => {
          self.$router.push({
            name: "Vertify",
            query: { verify_link: response.data.res.unique_id },
          });
        })
        .catch((error) => {
          this.errorMessage = error.message;

          this.$alert(error.response.data.msg.th, "เกิดข้อผิดพลาด", "error");
        });
    },

    otpnext() {
      const self = this;
      if (this.otp) {
        if (this.token_otp) {
          let body = { token: this.token_otp, pin: this.otp };
          let config = {
            headers: { Authorization: `Bearer ${this.token}` },
          };

          this.axios
            .post(this.$API_URL + "/api/v1/otp/send-verify", body, config)
            .then((response) => {
              if (response.data.msg == "success") {
                if (response.data.result.register_success == true) {
                  self.$router.push({
                    name: "Login",
                  });
                }
              }
            })
            .catch((error) => {
              this.errorMessage = error.message;
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
              token: this.token_otp,
              password: this.pass,
              password_confirm: this.passcon,
            };
            let config = {
              headers: {},
            };

            this.axios
              .post(
                this.$API_URL + "/api/v1/otp/game-member-new-regis",
                body,
                config
              )
              .then((response) => {
                if (response.data.code == 0) {
                  self.$router.push({
                    name: "Login",
                  });
                } else {
                  this.$alert(response.data.msg.th, "เกิดข้อผิดพลาด", "error");
                }
              })
              .catch((error) => {
                this.errorMessage = error.message;
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
