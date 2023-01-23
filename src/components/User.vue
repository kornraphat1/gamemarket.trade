<template>
  <div>
    <div
      class="modal fade"
      id="ModalUser"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ModalUserLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-user modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h6 class="modal-title" id="ModalUserLabel">ชื่อผู้ใช้</h6>
              <div class="user-text">
                <h4>{{ user_name }}</h4>
                <!--<i class="far fa-edit "></i>-->
              </div>
            </div>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="closeWD == false">
            <div
              class="textInCrad"
              :style="{
                backgroundImage:
                  'url(' + require('@/assets/img/card.png') + ')',
              }"
            >
              <div class="row" style=" position: absolute; left: 40px;">
                <h4><i class="fas fa-wallet"></i> Wallet</h4>
              </div>
              <div
                class="row"
                style="justify-content: center;flex-direction: column; height: 100%; padding:20px;"
              >
                <div class="text-right">
                  <h3>
                    {{ userdetail.balance | number_format }}.00
                    <a id="refresh-btn" class="icon-btn" @click="refresh()">
                      <i class="fas fa-sync-alt" aria-hidden="true"></i>
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <!--  <img src="@/assets/img/card.png" alt="" style=" width:100%" />-->

            <div class="row">
              <div class="q-col-3">
                <a href="#" @click="withdrawAdd(10)" class="q-withdraw"
                  >10{{ "   " }}</a
                >
              </div>
              <div class="q-col-3">
                <a href="#" @click="withdrawAdd(100)" class="q-withdraw">100</a>
              </div>
              <div class="q-col-3">
                <a href="#" @click="withdrawAdd(300)" class="q-withdraw">300</a>
              </div>
              <div class="q-col-3">
                <a href="#" @click="withdrawAdd(500)" class="q-withdraw">500</a>
              </div>
            </div>
            <div class="row pd-top">
              <div class="col-7">
                <input
                  id="inputwithdraw"
                  type="text"
                  v-model="withdrawnum"
                  class="input-withdraw"
                  placeholder="0.00 ฿"
                  @keypress="clsNumberOnly($event)"
                />
              </div>

              <div class="col-4 p-0">
                <button
                  v-if="is_verify_otp == true"
                  class="btn btn-withdraw"
                  id="Confirmwithdraw"
                  data-toggle="modal"
                  data-target="#ModalConfirmwithdraw"
                  :disabled="withdrawnum == null || withdrawnum == ''"
                >
                  ถอนเงิน
                </button>
                <button
                  v-else
                  class="btn btn-withdraw"
                  id="editProfile"
                  data-toggle="modal"
                  data-target="#ModaleditProfile"
                  :disabled="withdrawnum == null || withdrawnum == ''"
                  @click="checkStatusWi()"
                >
                  ถอนเงิน
                </button>
              </div>
              <div class="col-12">
                <div class="withdraw-minimum-text">
                  <p>
                    ถอนเงินขั้นต่ำ 10.00 พอยท์ และต้องลงท้ายด้วย 0
                  </p>
                </div>
                <div style="font-size: 12px;">
                  <div>
                    ระบบการแลก พอยท์ จะสิ้นสุดในวันที่
                    <span style="color: red;">{{ timeoutWDDate }}</span>
                  </div>
                  <div>
                    เหลือเวลา อีก
                    <span style="color: red;">{{ countdowntime }}</span>
                  </div>
                  <div>
                    <span style="color: red;"
                      >**กรุณาแลก พอยท์ ออกก่อนวันที่กำหนด**</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer ">
            <div class="row" style="width: 100%;">
              <div class="col-6">
                <button
                  class="btn btn-history"
                  id="History"
                  data-toggle="modal"
                  data-target="#ModalHistory"
                >
                  History
                </button>
              </div>
              <div class="col-6">
                <button
                  class="btn btn-logout"
                  data-dismiss="modal"
                  @click="logout()"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <history :user_percent="user_percent"></history>
    <div
      class="modal fade"
      id="ModalConfirmwithdraw"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ModalConfirmwithdrawLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div
          class="modal-content  modal-content-editProfilemodal"
          id="input-bank"
          style="display:block"
        >
          <div class="modal-header editProfilemodal-header">
            <div class="backward-editProfilemodal col-2">
              <!-- <button
                type="button"
                class="btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"
                  ><i class="fas fa-angle-left"></i
                ></span>
              </button> -->
            </div>
            <div class=" col-8 text-center">
              <h5 class="modal-title" id="ModaleditProfileLabel ">
                ยืนยันการถอนเงิน
              </h5>
            </div>
            <div class=" col-2">
              <div class="close-editProfilemodal">
                <button
                  type="button"
                  class="btn"
                  data-dismiss="modal"
                  id="dismissConf"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <div class="form-group ">
              <div class="confrimBankDetail">
                <div class="confrimBankDetail-col">
                  <h6>จำนวน :</h6>
                  <h4 style="color: #E740EB;">
                    {{ withdrawnum | number_format }} พอยท์
                  </h4>
                </div>
                <div class="confrimBankDetail-col">
                  <h6>เป็นเงิน :</h6>
                  <h4 style="color: #E740EB;">{{ user_money }} บาท</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-confirm-editProfile"
              @click="withdraw()"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
    <bank
      :is_verify_otp="is_verify_otp"
      :is_verify_wiwallet="is_verify_wiwallet"
      :wistatus_frist="wistatus"
    ></bank>
  </div>
</template>

<script>
import History from "./History.vue";
import Bank from "./Bank.vue";

export default {
  name: "User",
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
      is_verify_wiwallet: "",
      is_verify_otp: "",
      passwordFieldType: "password",
      first_name: "",
      last_name: "",
      password: "",
      Bank: "",
      route: this.$route,
      user_percent: 0,
      user_money: 0,
      account_number: "",
      wistatus: "",
      countdowntime: "",
      closeWD: false,
      timeoutWDDate: "31/08/2022",
    };
  },

  mounted() {
    if (this.$cookies.get("token_main")) {
      this.getuserbalance();
      this.checkStatusWi();
      this.timeoutWD();
    }
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

    getuserbalance() {
      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getuserbalance", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token_main")}`,
          },
        })
        .then((response) => {
          this.user_name = response.data.data.user_name;
          this.userdetail = response.data.data;
          this.first_name = response.data.data.first_name;
          this.last_name = response.data.data.last_name;
          this.user_percent = response.data.data.percent;
          this.is_verify_wiwallet = response.data.data.is_verify_wiwallet;
          this.is_verify_otp = response.data.data.is_verify_otp;

          this.$cookies.set("isVerifyOTP", response.data.data.is_verify_otp);

          this.$cookies.set(
            "isVerifyWiwallet",
            response.data.data.is_verify_wiwallet
          );
        });
    },

    checkStatusWi() {
      let config = {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token_main")}`,
        },
      };

      this.axios
        .get(this.$API_URL + "/api/v1/frontend/checkedwiwalletverify", config)
        .then((response) => {
          if (response.data.status === "pending") {
            this.wistatus = "pending";
          } else if (response.data.status === "checking") {
            this.wistatus = "checking";
          } else if (response.data.status === "success") {
            this.wistatus = "success";
          } else if (response.data.status === "fail") {
            this.wistatus = "fail";
          }
          this.$cookies.set("Wistatus", this.wistatus);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.wistatus = 0;
        });
    },
    withdrawAdd(num) {
      if (this.withdrawnum == null || this.withdrawnum == "") {
        this.withdrawnum = 0;
        this.withdrawnum = parseInt(this.withdrawnum) + num;
      } else {
        this.withdrawnum = parseInt(this.withdrawnum) + num;
      }
    },
    withdraw() {
      this.checkTokenTimeout();
      let withdrawnum = "";
      if (Number.isInteger(this.withdrawnum) == false) {
        withdrawnum = parseInt(this.withdrawnum.replace(",", ""));
      } else {
        withdrawnum = this.withdrawnum;
      }

      // console.log(parseInt(withdrawnum));
      if (withdrawnum != null) {
        if (this.$LIMIT_WITHDRAW == 1) {
          if (withdrawnum >= 10) {
            const lastDigit1Str = String(withdrawnum).slice(-1);
            const lastDigit1Num = Number(lastDigit1Str);
            if (lastDigit1Num == 0) {
              let body = {
                amount: parseInt(withdrawnum),
              };
              let config = {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("token_main")}`,
                },
              };
              this.$confirm("ยืนยันการถอนเงิน").then(() => {
                document.getElementById("dismissConf").click();
                this.axios
                  .post(
                    this.$API_URL + "/api/v1/frontend/member/withdraw",
                    body,
                    config
                  )
                  .then((response) => {
                    if (response.data.code === 0) {
                      this.$alert(
                        "การร้องขอสำเร็จ กรุณารอเงินเข้าระบบภายใน 20 นาที",
                        "ยืนยันถอนเงินสำเร็จ",
                        "success"
                      );
                      withdrawnum = "";
                      document.getElementById("refresh-btn").click();

                      setTimeout(() => {
                        location.reload();
                      }, 7000);
                    } else {
                      this.$alert(
                        response.data.msg.th,
                        "ไม่สามารถถอนเงินได้",
                        "error"
                      );
                    }
                  })
                  .catch((error) => {
                    this.errorMessage = error.message;
                    this.$alert(
                      error.response.data.msg.th,
                      "ไม่สามารถถอนเงินได้",
                      "error"
                    );
                  });
              });
            } else {
              this.$alert(
                "จำนวนพอยท์ที่ถอน กรุณาลงท้ายด้วย 0",
                "เกิดข้อผิดพลาด",
                "error"
              );
            }
          } else {
            this.$alert("กรุณาถอนขั้นต่ำ 10 พอยท์", "เกิดข้อผิดพลาด", "error");
          }
        } else {
          let body = {
            amount: parseInt(withdrawnum),
          };
          let config = {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token_main")}`,
            },
          };
          this.$confirm("ยืนยันการถอนเงิน").then(() => {
            document.getElementById("dismissConf").click();
            this.axios
              .post(
                this.$API_URL + "/api/v1/frontend/member/withdraw",
                body,
                config
              )
              .then((response) => {
                if (response.data.code === 0) {
                  this.$alert("", "ยืนยันถอนเงินสำเร็จ", "success");
                  withdrawnum = "";
                  document.getElementById("refresh-btn").click();

                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                } else {
                  this.$alert(
                    response.data.msg.th,
                    "ไม่สามารถถอนเงินได้",
                    "error"
                  );
                }
              })
              .catch((error) => {
                this.errorMessage = error.message;
                this.$alert(
                  error.response.data.msg.th,
                  "ไม่สามารถถอนเงินได้",
                  "error"
                );
              });
          });
        }
      }
    },

    number_format(number, decimals, dec_point, thousands_sep) {
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
        // console.log(s.join(dec));
        this.withdrawnum = s.join(dec);
        return s.join(dec);
      }
    },

    logout() {
      const self = this;

      this.$cookies.remove("token_main");

      this.$nextTick(function() {
        self.$router.push({
          name: "Home",
        });
      });
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
    refresh() {
      var btn = document.getElementById("refresh-btn");

      btn.children[0].classList.add("spin-animation");
      setTimeout(function() {
        btn.children[0].classList.remove("spin-animation");
      }, 500);

      this.getuserbalance();
    },
    calpercent() {
      this.user_money = (this.withdrawnum * this.user_percent) / 100;
    },

    timeoutWD() {
      var xpday = new Date("2022-08-31T00:01:00.654764+07:00");
      // var xpday = new Date('2022-07-08T17:53:36.654764+07:00');
      var toDay = new Date();

      var Difference_In_Time = xpday.getTime() - toDay.getTime();

      var Difference_In_Days = Math.floor(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      var Difference_In_H = Math.floor(Difference_In_Time / (1000 * 3600));
      var Difference_In_M = Math.floor(Difference_In_Time / (1000 * 60));

      if (Difference_In_Days > 0) {
        this.countdowntime = Difference_In_Days + " วัน";
      } else if (Difference_In_H > 0) {
        this.countdowntime = Difference_In_H + " ชั่วโมง";
      } else if (Difference_In_M > 0) {
        this.countdowntime = Difference_In_M + " นาที";
      } else {
        this.countdowntime = "";
        this.closeWD = true;
      }
    },
  },
  watch: {
    wistatus() {
      this.$cookies.set("Wistatus", this.wistatus);
    },
    withdrawnum() {
      this.calpercent();

      if (this.userdetail.balance < this.withdrawnum) {
        // alert("เงินของคุณไม่เพียงพอ");
        this.$alert("เงินของคุณไม่เพียงพอ", "เกิดข้อผิดพลาด", "error");

        // this.withdrawnum = this.number_format(this.userdetail.balance);
      }
    },
  },
  components: { History, Bank },
};
</script>

<style scoped></style>
