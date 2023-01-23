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
          <div class="modal-body">
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
                <a href="#" @click="withdrawAdd(100)" class="q-withdraw">100</a>
              </div>
              <div class="q-col-3">
                <a href="#" @click="withdrawAdd(300)" class="q-withdraw">300</a>
              </div>
              <div class="q-col-3">
                <a href="#" @click="withdrawAdd(500)" class="q-withdraw">500</a>
              </div>
              <div class="q-col-3">
                <a href="#" @click="withdrawAdd(1000)" class="q-withdraw"
                  >1,000</a
                >
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
                  class="btn btn-withdraw"
                  id="Confirmwithdraw"
                  data-toggle="modal"
                  data-target="#ModalConfirmwithdraw"
                  :disabled="withdrawnum == null || withdrawnum == ''"
                >
                  ถอนเงิน
                </button>
                <!-- <button
                  v-if="userdetail.deposit_status == false"
                  class="btn btn-withdraw"
                  data-toggle="modal"
                  data-target="#ModaleditProfile"
                  :disabled="withdrawnum == null || withdrawnum == ''"
                >
                  ถอนเงิน
                </button> -->
              </div>
              <div class="col-12">
                <div class="withdraw-minimum-text">
                  <p>ถอนเงินขั้นต่ำ 100.00 บาท</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer ">
            <div class="row" style="width: 100%;">
              <div class="col-6">
                <!-- <button
                  class="btn btn-Profile"
                  data-toggle="modal"
                  data-target="#ModaleditProfile"
                >
                  Edit Profile
                </button> -->
              </div>
              <div class="col-6">
                <!-- <button
                  class="btn btn-logout"
                  data-dismiss="modal"
                  @click="logout()"
                >
                  Logout
                </button> -->
                <button
                  class="btn btn-logout"
                  id="History"
                  data-toggle="modal"
                  data-target="#ModalHistory"
                >
                  History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>   
    <history></history>
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
            <!-- <div class="form-group ">
              <div class="row confrimBankDetail">
                <h6>ธนาคาร :</h6>
                <h4>{{ ListBank[userdetail.bank_name] }}</h4>
              </div>

              <div class="row confrimBankDetail">
                <h6>เลขที่บัญชี :</h6>
                <h4>{{ userdetail.account_number | account_number_show }}</h4>
              </div>

              <div class="row confrimBankDetail">
                <h6>ชื่อบัญชี :</h6>
                <h4>
                  {{ userdetail.first_name + " " + userdetail.last_name }}
                </h4>
              </div>
            </div> -->
            <div class="form-group ">
              <div class="row confrimBankDetail">
                <h6>จำนวนเงิน :</h6>
                <h4 style="color: #E740EB;">
                  {{ withdrawnum | number_format }} บาท
                </h4>
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
  </div>
</template>

<script>
import History from "./History.vue";
// window.onscroll = function() {
//   myFunction();
// };

// function myFunction() {
//   if (document.documentElement.scrollTop > 20) {
//     document.getElementById("navbar").className =
//       "navbar navbar-expand-lg navbar-light fixed-top nav-scoll";
//   } else {
//     document.getElementById("navbar").className =
//       "navbar navbar-expand-lg navbar-light";
//   }
// }

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
      ListBank: {
        BAAC: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
        BAY: "ธนาคารกรุงศรีอยุธยา",
        BBL: "ธนาคารกรุงเทพ",
        CIMB: "ธนาคารซีไอเอ็มบีไทย",
        CITI: "ธนาคารซิตี้แบงก์",
        GHB: "ธนาคารอาคารสงเคราะห์",
        GSB: "ธนาคารออมสิน",
        HSBC: "ธนาคารเอชเอสบีซี",
        IBANK: "ธนาคารอิสลามแห่งประเทศไทย",
        ICBC: "ธนาคารไอซีบีซี",
        KBANK: "ธนาคารกสิกรไทย",
        KKP: "ธนาคารเกียรตินาคิน",
        KTB: "ธนาคารกรุงไทย",
        LHBANK: "ธนาคารแลนด์",
        MIZUHO: "ธนาคารมิซูโฮ",
        SCB: "ธนาคารไทยพาณิชย์",
        SCBT: "ธนาคารสแตนดาร์ดชาร์เตอร์ด",
        TBANK: "ธนาคารธนชาต",
        TCD: "ธนาคารไทยเครดิตเพื่อรายย่อย",
        TISCO: "ธนาคารทิสโก้",
        TMB: "ธนาคารทหารไทย",
        TTB: "ธนาคารทีเอ็มบีธนชาต",
        UOB: "ธนาคารยูโอบี",
      },
      passwordFieldType: "password",
      first_name: "",
      last_name: "",
      password: "",
      Bank: "",
      route: this.$route,

      account_number: "",
    };
  },

  mounted() {
    this.getuserbalance();
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
    checkBank() {
      if (
        this.first_name &&
        this.last_name &&
        this.account_number &&
        this.Bank
      ) {
        if (this.account_number != "") {
          if (this.account_number.trim().length >= 10) {
            document.getElementById("input-bank").style.display = "none";
            document.getElementById("input-confirm").style.display = "block";
          }
        } else {
          this.$alert("เลขบัญชีไม่ถูกต้อง", "เกิดข้อผิดพลาด", "error");
        }
      } else {
        this.$alert("กรุณากรอกข้อมูลให้ครบถ้วน", "เกิดข้อผิดพลาด", "error");
      }
    },
    recheck() {
      document.getElementById("input-bank").style.display = "block";
      document.getElementById("input-confirm").style.display = "none";
    },
    confirmchanges() {
      const self = this;
      if (this.password) {
        var body = new Object();
        body = {
          first_name: this.first_name,
          last_name: this.last_name,
          phone_number: this.userdetail.phone_number,
          bank_name: this.Bank,
          account_number: this.account_number,
          confirm_password: this.password,
        };

        const config = {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token_main")}`,
          },
        };

        this.axios
          .post(
            this.$API_URL + "/api/v1/frontend/user/updateprofile",
            body,
            config
          )
          .then((response) => {
            // console.log(response.data);
            // this.Allitem = response.data.data.list;
            if (response.data.code === 0) {
              this.$alert("ยืนยันบัญชี", "Success", "success");
              document.getElementById("dismiss_modal").click();
              self.getuserbalance();
            } else {
              this.$alert(response.data.msg.th, "เกิดข้อผิดพลาด", "error");
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            console.log(error);
            this.$alert(error.data.msg, "เกิดข้อผิดพลาด", "error");
          });
      } else {
        this.$alert("กรุณายืนยันรหัสผ่าน", "เกิดข้อผิดพลาด", "error");
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
          // console.log(response.data.data);
          this.user_name = response.data.data.user_name;
          // this.user_name = user_name.slice(0, 6) + "xxxx";
          // response.data.data.user_name = user_name;

          this.userdetail = response.data.data;
          this.first_name = response.data.data.first_name;
          this.last_name = response.data.data.last_name;
        });
    },
    hideMenu() {
      let menu = document.getElementById("navbarNavDropdown");
      menu.classList.remove("show");
    },
    changeSelected(k) {
      this.selected = k;
      // document.getElementById("navbarNavDropdown").className =
      //   "navbar-collapse navbar-menu-div fixed-top collapse";
    },
    hamberBar(x) {
      x.classList.toggle("change");
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
      if (this.withdrawnum != null) {
        // console.log(this.withdrawnum);
        if (this.withdrawnum >= 10) {
          let body = {
            amount: parseInt(this.withdrawnum),
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
                // console.log(response.data.code);
                if (response.data.code === 0) {
                  this.$alert("", "ถอนเงินสำเร็จ", "success");
                  this.withdrawnum = "";
                  document.getElementById("refresh-btn").click();

                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                } else {
                  // console.log(response.data);
                    this.$alert(
                  "",
                "ไม่สามารถถอนเงินได้",
                  "error"
                );
                }

                // this.Allitem = response.data.data.list;
              })
              .catch((error) => {
                this.errorMessage = error.message;
                // console.log(error);

                this.$alert(
                  "กรุณารอสักครู่",
                  error.response.data.msg.th,
                  "error"
                );
                // alert(error);
              });
          });
        } else {
          this.$alert("กรุณาถอนขั้นต่ำ 100 บาท", "เกิดข้อผิดพลาด", "error");
        }
      }
    },

    // clsNumberaccount_number(e) {
    //   // Accept only alpha numerics, no special characters
    //   var regex = new RegExp("^[0-9]{0,10}$");
    //   var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    //   if (regex.test(str)) {
    //     return true;
    //   }

    //   e.preventDefault();
    //   return false;
    // },

    clsNumberOnly(e) {
      // Accept only alpha numerics, no special characters
      var regex = new RegExp("^[0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        return true;
      }

      e.preventDefault();
      return false;
    },
    logout() {
      const self = this;

      this.$cookies.remove("token_main");

      this.$nextTick(function() {
        self.$router.push({
          name: "Login",
        });
      });
    },

    refresh() {
      var btn = document.getElementById("refresh-btn");

      btn.children[0].classList.add("spin-animation");
      setTimeout(function() {
        btn.children[0].classList.remove("spin-animation");
      }, 500);

      this.getuserbalance();
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  watch: {
    withdrawnum() {
      if (this.userdetail.balance < this.withdrawnum) {
        // alert("เงินของคุณไม่เพียงพอ");
        this.$alert("เงินของคุณไม่เพียงพอ", "เกิดข้อผิดพลาด", "error");

        this.withdrawnum = this.userdetail.balance;
      }
    },
  },
  components: { History },
};
</script>

<style scoped></style>
