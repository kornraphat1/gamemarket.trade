<template>
  <div>
    <div class="bg-third" id="section-third" v-if="pageTeade == 2">
      <div class="container">
        <div class="toBackContainer">
          <div class="toBack" @click="goBack()">
            <i
              style="padding-left:5px; color:#e740eb"
              class="fas fa-angle-left"
            ></i>
            ย้อนกลับ
          </div>
        </div>
        <div class="headerContainer">
          <div class="left"></div>
          <div class="right">
            <div class="title">ราคาต่อชิ้น</div>
            <div class="title">จำนวน</div>
            <div class="title">ราคารวม</div>
          </div>
        </div>
        <div class="bodyContainer">
          <div class="itemList" v-for="(v, key) in ItemShow" :key="key">
            <div class="left">
              <div class="imgTrade">
                <img
                  :src="v.picture ? $IMG_URL_ITEM + v.picture : $IMG_image"
                  class="item-img-detail"
                />
              </div>
              <div class="deteilItem">
                <div class="tradeDetail-name-eng" :style="'trade' | color_sty">
                  {{ v.name.en }}
                </div>
                <div class="tradeDetail-name-thai">
                  {{ v.name.th }}
                </div>
              </div>
            </div>
            <div class="right">
              <div class="title">{{ v.receive_amount }}</div>
              <div class="title">{{ v.qty }}</div>
              <div class="title">{{ v.allamount }}</div>
            </div>
          </div>
        </div>

        <div class="footerContainer">
          <!-- <div class="footer">
            <div class="left"></div>
            <div class="right">
              <div class="title">ราคารวม(ไอเทม)</div>
              <div class="num">{{ allamount }} บ.</div>
            </div>
          </div> -->
          <!-- <div class="footer">
            <div class="left"></div>
            <div class="right">
              <div class="title">ฟรีค่าธรรมเนียมการถอนจาก Wi Wallet</div>
              <div class="num">{{ this.fee }} บ.</div>
            </div>
          </div> -->
          <!-- <div class="footer alertWiwallet" v-if="this.fee == 0">
            <div class="left"></div>
            <div class="right">
              <div class="title">
                (ยอดขายต้องเกิน 400บ. เพื่อรับค่าธรรมเนียม 20บ.)
              </div>
              <div class="num"></div>
            </div>
          </div> -->

          <div class="footer allsum">
            <div class="left"></div>
            <div class="right">
              <div class="title">ราคารวม</div>
              <div class="num">{{ allamount_fee }} บ.</div>
            </div>
          </div>
        </div>

        <div class="buttonContainer">
          <div>
            <button
              class="btn Tradebtn"
              id="editProfile"
              data-toggle="modal"
              data-target="#ModalVertify"
              v-if="TradeStetus == false"
            >
              Trade
            </button>
            <button
              class="btn Tradebtn"
              @click="trade()"
              v-else-if="TradeStetus == true"
            >
              Trade
            </button>
          </div>
        </div>
      </div>
    </div>

    <Vertify
      :wistatus_frist="Wistatus"
      :is_verify_otp="isVerifyOTP"
      :is_verify_wiwallet="isVerifyWiwallet"
      v-on:gotrade="gotrade"
    ></Vertify>
  </div>
</template>

<script>
// import Bank from "../Bank.vue";
import Vertify from "../Vertify.vue";
export default {
  props: {
    SelectItem: {
      type: Array,
      //   default: [],
    },
    pageTeade: Number,
  },
  components: {
    //  Bank,
    Vertify,
  },
  data() {
    return {
      ItemShow: [],
      allamount: 0,
      allamount_fee: 0,
      fee: 0,
      isVerifyOTP: "",
      isVerifyWiwallet: "",
      Wistatus: "",
      TradeStetus: false,
    };
  },

  mounted() {
    this.checkStatusWi();
    this.getVerifyStatus();
    if (this.SelectItem) {
      this.$emit("toBack", 1);
    }
  },
  methods: {
    gotrade(value) {
      if (value) {
        this.trade();
      }
    },
    goBack() {
      this.$emit("toBack", 1);
      // console.log(5);
    },
    setShowItem(group) {
      let index = 0;
      let self = this;
      this.ItemShow = [];
      for (let g in group) {
        this.ItemShow[index] = group[g][0];

        this.ItemShow[index].allamount = 0;

        this.ItemShow[index].qty = group[g].length;
        for (let i = 0; i < group[g].length; i++) {
          this.ItemShow[index].allamount += group[g][i].receive_amount;
        }

        index++;
      }
      this.$nextTick(function() {
        self.setAllamount(this.ItemShow);
      });
    },
    setAllamount() {
      this.allamount = 0;
      for (let i = 0; i < this.ItemShow.length; i++) {
        this.allamount += this.ItemShow[i].allamount;
      }

      this.$nextTick(function() {
        this.fee = 0;
        if (this.allamount >= 400) {
          this.fee = 20;
        }
         this.allamount_fee = this.allamount ;

        // this.allamount_fee = this.allamount + this.fee;
        // เอาค่าธรรมเนียมออก
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
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.wistatus = 0;
        });
    },

    getVerifyStatus() {
      let self = this;

      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getuserbalance", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token_main")}`,
          },
        })
        .then((response) => {
          // console.log(response.data.data);

          this.isVerifyWiwallet = response.data.data.is_verify_wiwallet;
          this.isVerifyOTP = response.data.data.is_verify_otp;
          this.$nextTick(function() {
            // console.log("iswiwallet--" + this.isVerifyWiwallet);
            // console.log("isotp--" + this.isVerifyOTP);
            // console.log("Wistatus--" + this.Wistatus);
            if (self.isVerifyOTP == true && self.isVerifyWiwallet == true) {
              self.TradeStetus = true;
            }
          });
        });
    },
    trade() {
      // const self = this;

      console.log("trade success");
      console.log(this.SelectItem);
      this.$cookies.set("SelectNum", "");

      var memberStoreId = [];

      this.SelectItem.length;
      for (let i = 0; i < this.SelectItem.length; i++) {
        memberStoreId.push(this.SelectItem[i].track_id);
      }
      console.log(memberStoreId);
      var body = new Object();

      body = {
        member_store_id: memberStoreId,
      };

      let config = {
        headers: { Authorization: `Bearer ${this.$cookies.get("token_main")}` },
      };
      this.$confirm("ยืนยันการแลกเปลี่ยน")
        .then(() => {
          this.axios

            .post(
              this.$API_URL + "/api/v1/frontend/member/withdraw-item",
              body,
              config
            )
            .then((response) => {
              if (response.data.code === 0) {
                document.getElementById("dismiss").click();
                this.$alert(
                  "ระบบกำลังโอนเงินเข้า WiWallet ภายใน 30 นาที",
                  "แลกเปลี่ยนสำเร็จ",
                  "success"
                ).then(() => {
                  location.replace("/Myitems");
                });
                setTimeout(() => {
                  location.replace("/Myitems");
                }, 3000);
                // self.$router.push({
                //   name: "Myitems",
                // });
              } else {
                console.log();
                if (response.data.verify_error == 1) {
                  this.$alert(response.data.msg, "เกิดข้อผิดพลาด", "error");
                } else {
                  this.$alert(
                    "ไม่สามารถแลกเปลี่ยนไอเท็มต่อเนื่องได้ กรุณารอ 30 วินาที",
                    "เกิดข้อผิดพลาด",
                    "error"
                  );
                }
              }
            })
            .catch((error) => {
              this.errorMessage = error.message;
              console.log(error.response);
              alert(error);
            });
        })
        .catch(() => {
          return false;
        });
    },
  },

  computed: {},

  watch: {
    SelectItem() {
      let group = [];
      group = this.SelectItem.reduce((group, item) => {
        const { item_id } = item;
        group[item_id] = group[item_id] ?? [];
        group[item_id].push(item);
        return group;
      }, {});

      this.setShowItem(group);
    },
    // VerifyStatus() {
    //   console.log(this.VerifyStatus);
    // },
  },
};
</script>
