<template>
  <div>
    <div
      class="modal fade"
      id="ModalConfirm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ModalConfirmLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <div class="user-text">
                <h4>ยืนยันการแลกเปลี่ยน</h4>
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
          <div class="modal-body show-lg ">
            <div class="row confirm-row ">
              <div class="col-3 "></div>
              <div class="col-3"></div>
              <div class="col-2  d-flex justify-content-center">
                <div>
                  <span>ราคาต่อชิ้น</span>
                </div>
              </div>
              <div class="col-2 d-flex justify-content-center">
                <span>จำนวน</span>
              </div>
              <div class="col-2  d-flex justify-content-center">
                <div>
                  <span>ราคารวม</span>
                </div>
              </div>
            </div>

            <div class="row confirm-row ">
              <div class="col-3 ">
                <div class="img-tradeDetail ">
                  <img
                    :src="
                      main_item.picture
                        ? $IMG_URL_ITEM + main_item.picture
                        : $IMG_image
                    "
                    class="item-img-detail"
                  />
                </div>
              </div>
              <div class="col-3">
                <h2 class="tradeDetail-name-eng" :style="'trade' | color_sty">
                  {{ main_item.name.en }}
                </h2>
                <h6>
                  {{ main_item.name.th }}
                </h6>
              </div>
              <div class="col-2  d-flex justify-content-center">
                <div>
                  <h5>{{ main_item.amount | number_format }}p</h5>
                </div>
              </div>
              <div class="col-2 d-flex justify-content-center">
                <h5>{{ selectcontItem }}</h5>
              </div>
              <div class="col-2 d-flex justify-content-center">
                <div>
                  <h5>
                    {{ (main_item.amount * selectcontItem) | number_format }}p
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-body show-sm">
            <div class="row confirm-row ">
              <div class="col-6">
                <div class="img-tradeDetail ">
                  <img
                    :src="
                      main_item.picture
                        ? $IMG_URL_ITEM + main_item.picture
                        : $IMG_image
                    "
                    class="item-img-detail"
                  />
                </div>
              </div>
              <div class="col-6">
                <h2 class="tradeDetail-name-eng" :style="'trade' | color_sty">
                  {{ main_item.name.en }}
                </h2>
                <h6>
                  {{ main_item.name.th }}
                </h6>
              </div>
            </div>

            <div class="row confirm-row ">
              <div class="col-5  d-flex justify-content-center">
                <div>
                  <span>ราคาต่อชิ้น</span>
                </div>
              </div>
              <div class="col-2 d-flex justify-content-center">
                <span>จำนวน</span>
              </div>
              <div class="col-5  d-flex justify-content-center">
                <div>
                  <span>ราคารวม</span>
                </div>
              </div>
            </div>

            <div class="row confirm-row ">
              <div class="col-5  d-flex justify-content-center">
                <div>
                  <h5>{{ main_item.amount | number_format }} p</h5>
                </div>
              </div>
              <div class="col-2 d-flex justify-content-center">
                <h5>{{ selectcontItem }}</h5>
              </div>
              <div class="col-5 d-flex justify-content-center">
                <div>
                  <h5>
                    {{ (main_item.amount * selectcontItem) | number_format }} p
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="row">
              <button
                data-dismiss="modal"
                id="dismiss"
                style="display:none"
              ></button>
              <button class="btn btn-confirm" @click="trade()">
                ขายไอเท็ม
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-tradeDetail">
      <div class="container-main content-tradeDetail ">
        <div class="row ">
          <div class="col-6  tradeDetail-left">
            <div class="img-tradeDetail ">
              <img
                :src="
                  main_item.picture
                    ? $IMG_URL_ITEM + main_item.picture
                    : $IMG_image
                "
                class="item-img-detail"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="text-tradeDetail ">
              <div class="tradeDetail-name">
                <h2
                  class="tradeDetail-name-eng"
                  :style="main_item.star_level | color_sty"
                >
                  {{ main_item.name.en }}
                </h2>
                <h2>{{ main_item.name.th }}</h2>
                <div id="tradeDetail-star" class="tradeDetail-star">
                  <span v-for="index in this.star" :key="index">
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <image
                        href="@/assets/img/Star-02 1.png"
                        height="20"
                        width="20"
                      />
                    </svg>
                  </span>
                  <span v-for="index in this.starempty" :key="index">
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <image
                        href="@/assets/img/Star-02 2.png"
                        height="20"
                        width="20"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div class="tradeDetail-price">
                <h3>Price</h3>
                <h2>{{ main_item.amount | number_format }} p</h2>
                <h6 v-if="maxcountItem != 0">
                  ( คุณมีไอเท็ม {{ maxcountItem }} ชิ้น )
                </h6>
              </div>

              <!-- <div class="tradeDetail-price row" v-if="maxcountItem != 0">
                <button
                  class="btn btn-stock "
                  style="background-color: #FF1A01; margin-left: 0px;"
                  id="delcount"
                  @click="delcountItem()"
                  :disabled="selectcontItem == 1"
                >
                  -
                </button>
                <span>{{ selectcontItem }}</span>
                <button
                  class="btn btn-stock "
                  style="background-color: #FDC018;"
                  id="addcount"
                  @click="addcountItem()"
                  :disabled="selectcontItem == maxcountItem"
                >
                  +
                </button>
              </div> -->
              <div class="" v-if="maxcountItem != 0">
                <button
                  class="btn-Trade"
                  data-toggle="modal"
                  data-target="#ModalConfirm"
                >
                  Trade
                </button>
              </div>

              <div style="color: #FF1A01; margin-left: 0px;" v-else>
                คุณไม่มีไอเทมชิ้นนี้
              </div>
            </div>
          </div>
        </div>
        <div class="line-top empty-space"></div>

        <div
          class="content-trade-orderGame ontainer-orderGame "
          style="min-height:40vh"
        >
          <div
            class="content-third-orderGame row"
            style=""
            v-if="other_item.length > 0"
          >
            <h2>ไอเท็มอื่นๆของคุณ จากเกมส์นี้</h2>
            <div class="row previous-next-zone" v-if="other_item.length > 5">
              <button
                class="previous-next-btn "
                aria-label="Previous"
                @click="previous(0)"
              >
                <i class="fas fa-angle-left"></i>
              </button>

              <button
                class="previous-next-btn "
                aria-label="Next"
                @click="next(0)"
              >
                <i class="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div class="content-third-item" id="Allitemswp">
            <Flickity
              class="main-caro "
              ref="flickity"
              :options="flickityOptions"
              v-if="other_item.length > 0"
            >
              <div
                class="carousel-cell-itemtread"
                v-for="(v, key) in other_item"
                :key="key"
              >
                <router-link
                  :to="{
                    path: '/trade/' + v.game_id + '/' + v.item_id,
                  }"
                  @click.native="loadOnce()"
                >
                  <div class="item-tread">
                    <div class="item-detail-tread">
                      <h1>{{ v.name.en }}</h1>
                    </div>
                  </div>
                </router-link>
                <div class="row item-detail-price-tread">
                  <p>{{ v.amount | number_format }} P</p>
                </div>

                <img
                  :src="v.picture ? $IMG_URL_ITEM + v.picture : $IMG_image"
                  class="item-img-tread"
                />
              </div>
            </Flickity>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from "vue-flickity";

export default {
  data() {
    return {
      main_item: [],
      Allitem: [],
      other_item: [],
      gameid: this.$route.params.gameid,
      id: this.$route.params.id,
      maxcountItem: "",
      selectcontItem: 1,
      game_id: "",
      item_id: "",
      star: 0,
      starempty: 0,
      flickityOptions: {
        // lazyLoad: 3,
        cellAlign: "left",
        contain: true,
        groupCells: "50%",
        // freeScroll: true,
        // wrapAround: true,
        prevNextButtons: true,
        pageDots: false,
        on: {
          dragStart: () => {
            document.querySelector(".main-caro").style.pointerEvents = "none";
          },
          dragEnd: () => {
            document.querySelector(".main-caro").style.pointerEvents = "all";
          },
        },
        // any options from Flickity can be used
      },
    };
  },

  mounted() {
    // const self = this;
    this.checkToken();
    this.changeSelected(2);
    this.getData();

    // console.log(this.$route.params.id);
  },
  components: {
    Flickity,
  },
  methods: {
    loadOnce() {
      location.reload();
    },
    getData() {
      // const self = this;
      this.axios
        .get(
          this.$API_URL +
            "/api/v1/frontend/getdetailtrade/" +
            this.$route.params.gameid +
            "/" +
            this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token_main")}`,
            },
          }
        )
        .then((response) => {
          // console.log(response.data.data);
          this.main_item = response.data.data.main_item;
          this.game_id = response.data.data.main_item.game_id;
          this.item_id = response.data.data.main_item.item_id;
          this.maxcountItem = response.data.data.main_item.qty;
          this.other_item = response.data.data.other_item;
          this.star = response.data.data.main_item.star_level;
          this.starempty = 5 - parseInt(this.star);

          if (parseInt(this.item_id) === 0) {
            this.$alert("คุณไม่มีไอเท็มชิ้นนี้", "เกิดข้อผิดพลาด", "warning");

            this.$nextTick(function() {
              // location.replace("/Myitems");
              // self.$router.push({
              //   name: "Myitems",
              // });
            });
          }
          this.$nextTick(function() {
            if (this.other_item) {
              // self.flkty();
            }
          });
        });
    },
    next(k) {
      let btnn = document
        .getElementById("Allitemswp")
        .getElementsByClassName("next");
      btnn[k].click();
    },

    previous(k) {
      let btnp = document
        .getElementById("Allitemswp")
        .getElementsByClassName("previous");

      btnp[k].click();
    },
    // trade() {
    //   // const self = this;
    //   var body = new Object();

    //   body = {
    //     game_id: parseInt(this.game_id),
    //     item_id: parseInt(this.item_id),
    //     trade_qty: parseInt(this.selectcontItem),
    //   };

    //   let config = {
    //     headers: { Authorization: `Bearer ${this.$cookies.get("token_main")}` },
    //   };
    //   this.$confirm("ยืนยันการแลกเปลี่ยน").then(() => {
    //     this.axios

    //       .post(this.$API_URL + "/api/v1/frontend/trademyitem", body, config)
    //       .then((response) => {
    //         if (response.data.code === 0) {
    //           console.log(response.data.code);
    //           this.$alert("", "แลกเปลี่ยนสำเร็จ", "success");
    //           document.getElementById("dismiss").click();
    //           setTimeout(() => {
    //             location.replace("/Myitems");
    //           }, 1000);
    //           // self.$router.push({
    //           //   name: "Myitems",
    //           // });
    //         } else {
    //           console.log(response.data.code);
    //           this.$alert("ไม่สามารถแลกเปลี่ยนไอเท็มได้ กรุณาติดต่อแอดมิน", "เกิดข้อผิดพลาด", "error");
    //         }
    //       })
    //       .catch((error) => {
    //         this.errorMessage = error.message;
    //         console.log(error.response);
    //         alert(error);
    //       });
    //   });
    // },

    addcountItem() {
      if (this.selectcontItem < this.maxcountItem) {
        this.selectcontItem = parseInt(this.selectcontItem) + 1;
      } else {
        // alert("ไม่สามารถเพื่มไอเท็มได้ ไอเท็มของคุณไม่เพียงพอ ");
        this.$alert(
          "ไม่สามารถเพื่มไอเท็มได้ ไอเท็มของคุณไม่เพียงพอ ",
          "เกิดข้อผิดพลาด",
          "error"
        );
      }
    },
    delcountItem() {
      if (this.selectcontItem <= this.maxcountItem && this.selectcontItem > 1) {
        this.selectcontItem = this.selectcontItem - 1;
      }
    },

    // flkty() {
    //   var elem = document.querySelector(".main-carousel");
    //   new Flickity(elem, {
    //     // options
    //     // groupCells: true,
    //     cellAlign: "left",
    //     contain: true,
    //     groupCells: 2,
    //     wrapAround: true,
    //     prevNextButtons: true,

    //     pageDots: true,
    //     // draggable: false,
    //     on: {
    //       dragStart: () => {
    //         elem.style.pointerEvents = "none";
    //       },
    //       dragEnd: () => {
    //         elem.style.pointerEvents = "all";
    //       },
    //     },
    //   });
    // },
  },
};
</script>
