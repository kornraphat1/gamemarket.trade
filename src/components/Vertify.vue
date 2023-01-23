<template>
  <div
    class="modal  fade"
    id="ModalVertify"
    tabindex="-2"
    role="dialog"
    aria-labelledby="ModalVertifyLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog " role="document">
      <div
        class="modal-content modal-content-editProfilemodal"
        id="input-bank"
        style="display:block"
      >
        <div class="modal-header editProfilemodal-header">
          <button type="button" class="close" id="close"></button>
          <h5 class="modal-title" id="ModaleditProfileLabel">
            รายละเอียดบัญชี Wi Wallet
          </h5>
          <div class="close-editProfilemodal">
            <button
              type="button"
              id="dismiss"
              class="btn"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <div v-if="pagestatus == 0">
            <div class="form-group editProfile-form-group">
              <div class="alert">
                ** ข้อมูลจะต้องตรงกับ ข้อมูลที่ลงทะเบียนกับ Wi Wallet เท่านั้น
                **
              </div>
            </div>

            <div class="form-group editProfile-form-group">
              <label for="first_name">ชื่อ(ที่ลงทะเบียนกับ Wi Wallet)</label>
              <br />
              <div class="gender-select">
                <div class="mr">
                  <input type="radio" id="mr" value="mr" v-model="picked" />
                  <label for="mr">นาย</label>
                </div>
                <div class="mrs">
                  <input type="radio" id="mrs" value="mrs" v-model="picked" />
                  <label for="mrs">นาง/นางสาว</label>
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                id="first_name"
                placeholder="ชื่อ"
                v-model="first_name"
                maxlength="15"
              />
            </div>

            <div class="form-group editProfile-form-group">
              <label for="last_name">นามสกุล(ที่ลงทะเบียนกับ Wi Wallet)</label>
              <input
                type="text"
                class="form-control"
                id="last_name"
                placeholder="นามสกุล"
                v-model="last_name"
              />
            </div>

            <div class="form-group editProfile-form-group">
              <label for="phone_number"
                >เบอร์โทรศัพท์ (ที่ลงทะเบียนกับ Wi Wallet)</label
              >
              <input
                type="text"
                class="form-control"
                id="phone_number"
                placeholder="เบอร์โทรศัพท์"
                v-model="phone_number"
                @keypress="clsNumberOnly($event)"
                maxlength="10"
              />
            </div>
            <div class="form-group editProfile-form-group">
              <div class="wiLoad-container" style="margin-bottom: 10px;">
                <div>
                  ถ้าคุณยังไม่มี Wi Wallet กรุณาโหลด :
                </div>
                <a
                  style="width: 36%; "
                  href="https://wallet.wipay.co.th/"
                  target="_blank"
                >
                  <img
                    style="width:100%;"
                    src="@/assets/img/wiwallet-logo.png"
                    alt=""
                  />
                </a>
              </div>
              <div class="wiLoad-container">
                <div class="wiLoad">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.wipaytech.wiwallet"
                    target="_blank"
                  >
                    <img src="@/assets/img/Untitled-2.png" alt="" />
                  </a>
                </div>
                <div class="wiLoad">
                  <a
                    href=" https://apps.apple.com/th/app/wi-wallet-%E0%B9%84%E0%B8%A7-%E0%B8%A7%E0%B8%AD%E0%B8%A5%E0%B9%80%E0%B8%A5-%E0%B8%97/id1566988494"
                    target="_blank"
                  >
                    <img src="@/assets/img/Untitled-1.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="form-group editProfile-form-group">
              <p>ชื่อ : {{ first_name }}</p>
            </div>
            <div class="form-group editProfile-form-group">
              <p>นามสกุล : {{ last_name }}</p>
            </div>
            <div class="form-group editProfile-form-group">
              <p>เบอร์โทร : {{ phone_number }}</p>
            </div>
          </div>

          <div
            class="vertify-status"
            id="otp"
            v-if="pagestatus === 1 || pagestatus === 2"
          >
            สถานะ :
            <span :style="'color : ' + colorstatus + ';'">
              {{ wistatusText }}
            </span>
          </div>

          <div class="vertify-input" id="otp" v-if="pagestatus === 3">
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
              <div class="Sendagain">
                <div class="Sendagaintext">
                  Didn't receive the SMS?
                </div>
                <div
                  class="counttrue"
                  @click="sentOTP()"
                  v-if="otpCountDown == 0"
                >
                  Send again
                </div>
                <div class="countfalse" v-else>
                  Send again ({{ otpCountDown }})
                </div>
              </div>
              <span>Reference : {{ refno }}</span>
              <!-- <a href="">Enter different phone number</a> -->
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            v-if="pagestatus === 3"
            type="button"
            class="btn btn-confirm-editProfile"
            autocomplete="off"
            @click="confirmOTP()"
          >
            ยืนยัน OTP
          </button>
          <button
            v-if="pagestatus === 2"
            type="button"
            class="btn btn-confirm-editProfile"
            autocomplete="off"
            @click="sentOTP()"
          >
            ส่ง OTP
          </button>

          <button
            v-if="pagestatus === 0"
            type="button"
            class="btn btn-confirm-editProfile"
            autocomplete="off"
            @click="sentWiWallet()"
          >
            ยืนยัน
          </button>
          <div v-if="pagestatus === 1" class="lodebarcontriner">
            <div class="lodebar">
              <div
                class="lodebar-line"
                :style="'width:' + lodebarline + '%;'"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Bank",
  props: ["is_verify_otp", "is_verify_wiwallet", "wistatus_frist"],

  data() {
    return {
      refno: "",
      otp: "",
      tokenOTP: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      wistatus: "",
      wistatusText: "",
      picked: "",
      otpCountDown: 0,
      lodebarline: 0,
      pagestatus: 0,
      colorstatus: "#000",
    };
  },

  mounted() {
    if (this.$cookies.get("token_main")) {
      this.getnameWiWallet();
    }
    this.checkStatusWi();

    // console.log("is_verify_wiwallet--" + this.is_verify_wiwallet);
    // console.log("is_verify_otp--" + this.is_verify_otp);
    // console.log("wistatus_frist--" + this.wistatus_frist);

    this.wistatus = this.wistatus_frist;
    console.log(this.wistatus);
    if (this.wistatus) {
      if (this.wistatus == "fail" || this.wistatus == "success") {
        return false;
      } else {
        this.StatusWiCountDown();
      }
    }
    if (this.is_verify_wiwallet == "true") {
      if (this.is_verify_otp == "false") {
        this.pagestatus = 2;
      }
    }

    // console.log(this.pagestatus);
  },

  methods: {
    getnameWiWallet() {
      let config = {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token_main")}`,
        },
      };

      this.axios
        .get(this.$API_URL + "/api/v1/frontend/checkedwiwalletverify", config)
        .then((response) => {
          // console.log(response.data);

          this.first_name = response.data.registerdata.first_name;
          this.last_name = response.data.registerdata.last_name;
          this.phone_number = response.data.registerdata.phone;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.wistatus = 0;
        });
    },

    sentWiWallet() {
      let t = this;

      if (this.first_name && this.last_name && this.phone_number) {
        if (this.phone_number != "") {
          if (this.phone_number.trim().length >= 10) {
            let body = {
              phone: this.phone_number.trim(),
              first_name: this.first_name.trim(),
              last_name: this.last_name.trim(),
            };
            let config = {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token_main")}`,
              },
            };

            this.axios
              .post(this.$API_URL + "/api/v1/verify/wiwallet", body, config)
              .then((response) => {
                if (response.data.code === 0) {
                  this.pagestatus = 1;
                  this.StatusWiCountDown();

                  // this.sentOTP();
                } else {
                  setTimeout(() => {
                    t.$alert(
                      "โปรดตรวจสอบความถูกต้อง หรือ ติดต่อ Admin",
                      "ไม่สามารถยืนยัน Wi Wallet ได้",
                      "error"
                    );
                  }, 2000);
                }
              })
              .catch((error) => {
                this.errorMessage = error.message;
                setTimeout(() => {
                  t.$alert(
                    "โปรดตรวจสอบความถูกต้อง หรือ ติดต่อ Admin",
                    "ไม่สามารถยืนยัน Wi Wallet ได้",
                    "error"
                  );
                }, 2000);
              });
          } else {
            this.$alert("เบอร์โทรศัพท์ไม่ถูกต้อง", "เกิดข้อผิดพลาด", "error");
          }
        } else {
          this.$alert("กรุณากรอกข้อมูลให้ครบถ้วน", "เกิดข้อผิดพลาด", "error");
        }
      } else {
        this.$alert("กรุณากรอกข้อมูลให้ครบถ้วน", "เกิดข้อผิดพลาด", "error");
      }
    },

    checkStatusWi() {
      if (this.$cookies.get("token_main")) {
        let config = {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token_main")}`,
          },
        };

        this.axios
          .get(this.$API_URL + "/api/v1/frontend/checkedwiwalletverify", config)
          .then((response) => {
            // console.log(response.data.status);
            this.first_name = response.data.registerdata.first_name;
            this.last_name = response.data.registerdata.last_name;
            this.phone_number = response.data.registerdata.phone;
            if (response.data.status === "pending") {
              this.wistatus = "pending";
            } else if (response.data.status === "checking") {
              this.wistatus = "checking";
            } else if (response.data.status === "success") {
              this.wistatus = "success";
            } else if (response.data.status === "fail") {
              this.wistatus = "fail";
            }
            console.log(this.wistatus);
          })
          .catch((error) => {
            this.errorMessage = error.message;
            // console.log(error);
            this.wistatus = 0;
            this.$alert(
              "โปรดตรวจสอบความถูกต้อง หรือ ติดต่อ Admin",
              "ไม่สามารถยืนยัน Wi Wallet ได้",
              "error"
            );
            return false;
          });
      }
    },
    StatusWiCountDown() {
      this.checkStatusWi();
      let self = this;
      this.$nextTick(function() {
        // console.log("1");

        const Inter = setInterval(function() {
          if (self.wistatus != "fail" || self.wistatus != "success") {
            if (this.wistatus != 0 || !this.wistatus) {
              self.checkStatusWi();
            } else {
              clearInterval(Inter);
              return false;
            }
          } else {
            clearInterval(Inter);
            return false;
          }
        }, 10000);
      });
    },

    test() {
      // console.log("custom");
      this.$emit("Test", "444");
    },

    sentOTP() {
      this.pagestatus = 3;
      this.CountDownotp();

      let body = {
        phone: this.phone_number,
      };
      let config = {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token_main")}`,
        },
      };

      this.axios
        .post(this.$API_URL + "/api/v1/otp/send-request", body, config)
        .then((response) => {
          console.log(response.data);

          if (response.data.code === 0) {
            this.refno = response.data.result.refno;
            this.tokenOTP = response.data.result.token;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleOnComplete(value) {
      this.otp = value;
      this.confirmOTP();
    },
    confirmOTP() {
      let body = {
        token: this.tokenOTP,
        pin: this.otp,
      };
      let config = {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token_main")}`,
        },
      };

      this.axios
        .post(this.$API_URL + "/api/v1/otp/send-verify", body, config)
        .then((response) => {
          if (response.data.code === 0) {
            this.$alert("", "ยืนยัน Wi Wallet สำเร็จ", "success");
            if (this.$cookies.get("SelectNum")) {
              document.getElementById("dismiss").click();
              this.$emit("gotrade", true);
            } else {
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          } else {
            this.$alert("", "OTP  ไม่ถูกต้อง", "error");
            this.handleClearInput();
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.$alert("", "OTP  ไม่ถูกต้อง", "error");
          this.handleClearInput();
        });
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
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
    CountDownotp() {
      this.otpCountDown = 10;
      let self = this;
      setInterval(function() {
        if (self.otpCountDown != 0) {
          self.otpCountDown = self.otpCountDown - 1;
        }
      }, 1000);
    },
  },
  watch: {
    wistatus_frist() {
      this.wistatus = this.wistatus_frist;
      // console.log("wistatus----" + this.wistatus);
      if (this.wistatus == "fail" || this.wistatus == "success") {
        return false;
      } else {
        this.StatusWiCountDown();
      }
    },
    wistatus() {
      if (this.wistatus === "pending") {
        this.wistatusText = "กำลังรอการตรวจสอบ";
        this.pagestatus = 1;
        this.colorstatus = "#eb9334";

        this.lodebarline = 50;
      } else if (this.wistatus === "checking") {
        this.wistatusText = "กำลังตรวจสอบสถานะ";
        this.pagestatus = 1;
        this.colorstatus = "#FFE107";

        this.lodebarline = 75;
      } else if (this.wistatus === "success") {
        this.pagestatus = 2;
        this.wistatusText = "ตรวจสอบสถานะสำเร็จ";
        this.colorstatus = "#54b325";

        this.lodebarline = 100;
      } else if (this.wistatus === "fail") {
        this.wistatusText = "ตรวจสอบสถานะไม่สำเร็จ โปรดตรวจสอบความถูกต้อง";
        this.pagestatus = 0;
        this.lodebarline = 0;

        this.$alert(
          "โปรดตรวจสอบความถูกต้อง หรือ สมัครแอปพลิเคชัน Wi Wallet",
          "ไม่สามารถยืนยัน Wi Wallet ได้",
          "error"
        );
      } else {
        this.pagestatus = 0;
      }
    },
  },
  // components: { History },
};
</script>
