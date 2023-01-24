<template>
  <div>
    <div class="bg-main">
      <div class="container">
        <div class="content-first">
          <!-- <img
            src="@/assets/img/LOLTFT/05115950015845122654900_Teamfight_Tactics_main.jpg"
            alt=""
            class="content-first-bg"
          /> -->
             <img
            src="@/assets/img/Background-content.png"
            alt=""
            class="content-first-bg"
          />
          <div id="content-first" class="content-first-area">
            <img
              src="@/assets/img/logo-name-market2.png"
              alt=""
              class="content-first-img"
            />

            <router-link
              class="content-first-btn btn"
              :to="{
                name: this.$cookies.get('token_main') ? 'Myitems' : 'Home',
              }"
            >
              TRADE NOW
            </router-link>
          </div>
          <img src="img/Rectangle.png" alt="" class="content-bg-connect" />
        </div>
      </div>
    </div>
    <div class="bg-second">
      <div class="container">
        <div class="content-second">
          <div class="content-second-area row">
            <div class="content-second-aboutme col-6">
              <h2>About</h2>
              <h1>Game Market Shop</h1>
              <p>
                Gamemarket.com เราเป็นศูนย์กลางร้านค้าแลกเปลี่ยน ไอเท็มต่างๆ
                จากเกมส์ออนไลน์เป็นเงิน ผ่านธรุกรรมที่น่าเชื่อถืออย่าง Wi Wallet
                กระเป๋าเงินอิเล็กทรอนิกส์ที่ตอบโจทย์ทุกไลฟ์สไตล์การใช้
                จ่ายช่วยยกระดับชีวิตคุณให้สะดวกสบายมากขึ้นด้วยบริการที่ครบครัน
              </p>
              <!-- <button class="content-btn-readmore btn">
                Read more About us
              </button>-->
            </div>

            <div class="content-second-logo col-6">
              <img
                src="@/assets/img/content-logo2.png"
                class="content-second-logo-img"
              />
            </div>
          </div>
        </div>
        <div class="empty-space"></div>
      </div>
    </div>
    <div class="bg-third" id="section-third">
      <Allgame @idgame="idgame"></Allgame>
      <template v-if="loadeing == 1">
        <div class="container">
          <div class="empty-space"></div>

          <div
            class="content-third-area row"
            v-if="!hotItem && !itemGoodPrice && !Allitem"
          >
            <div
              class="content-third-itile col-12"
              style="display: flex;
    justify-content: center;
    margin-bottom: 30px;"
            >
              <h2>ยังไม่มีไอเทม สำหรับเกมส์นี้</h2>
            </div>
          </div>

          <div class="content-third-area row" v-if="hotItem">
            <div class="content-third-itile col-12">
              <h2>ไอเท็มมาแรง 🔥</h2>
            </div>
            <div id="HotItem" style="" class="content-third-item row">
              <div
                class="item-grid col-3"
                v-for="(v, key) in hotItem"
                :key="key"
              >
              
                  <div class="item-img">
                    <img
                      :src="v.picture ? $IMG_URL_ITEM + v.picture : $IMG_image"
                    />
                  </div>
                  <div class="item-detail">
                    <h2 :style="v.star_level | color_sty">
                      {{ v.name.en }}
                    </h2>
                    <h1>{{ v.name.th }}</h1>
                  </div>
                  <div class="row item-detail-price">
                    <p>{{ v.receive_amount | number_format }} บ.</p>
                    <!-- <button class="btn">Trade</button> -->
                  </div>
            
              </div>
            </div>
          </div>

          <div class="content-third-area row" v-if="itemGoodPrice">
            <div class="content-third-itile col-12">
              <h2>รับซื้อราคาดี</h2>
            </div>
            <div class="content-third-item row" id="itemGoodPrice">
              <div
                class="item-grid col-3"
                v-for="(v, key) in itemGoodPrice"
                :key="key"
              >
              
                  <div class="item-img">
                    <img
                      :src="v.picture ? $IMG_URL_ITEM + v.picture : $IMG_image"
                    />
                  </div>
                  <div class="item-detail">
                    <h2 :style="v.star_level | color_sty">
                      {{ v.name.en }}
                    </h2>
                    <h1>{{ v.name.th }}</h1>
                  </div>
                  <div class="row item-detail-price">
                    <p>{{ v.receive_amount | number_format }} บ.</p>
                    <!-- <button class="btn">Trade</button> -->
                  </div>
               
              </div>
            </div>
          </div>
          <div
            class="content-third-area container-allitem-sm row"
            v-if="Allitem"
          >
            <div class="content-third-itile col-12">
              <h2>ไอเท็มทั้งหมด</h2>
            </div>
            <div class="content-third-item row" id="Allitemgrd">
              <div
                class="item-grid  col-3"
                v-for="(v, key) in Allitem"
                :key="key"
              >
                <router-link
                  class="static"
                  :to="{
                     path: '',
                  }"
                >
                  <div class="item-img">
                    <img
                      :src="v.picture ? $IMG_URL_ITEM + v.picture : $IMG_image"
                    />
                  </div>
                  <div class="item-detail">
                    <h2 :style="v.star_level | color_sty">
                      {{ v.name.en }}
                    </h2>
                    <h1>{{ v.name.th }}</h1>
                  </div>
                  <div class="row item-detail-price">
                    <p>{{ v.receive_amount | number_format }} บ.</p>
                    <!-- <button class="btn">Trade</button> -->
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="content-third-area container show-lg" v-if="Allitem">
          <div
            class="content-third-itile row"
            style="justify-content: space-between;"
          >
            <h2>ไอเท็มทั้งหมด</h2>
            <div class="col-6 previous-next-zone" v-if="Allitem.length > 4">
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
            <div
              class="main-carousel"
              id="main-carousel-allitem"
              v-if="Allitem.length > 0"
            >
              <div class="carousel-cell" v-for="(v, key) in Allitem" :key="key">
                <router-link
                  class="static"
                  :to="{
                    path: '',
                  }"
                >
                  <div class="item-img item-img-carousel">
                    <img
                      :src="v.picture ? $IMG_URL_ITEM + v.picture : $IMG_image"
                    />
                  </div>
                  <div class="item-detail">
                    <h2 :style="v.star_level | color_sty">
                      {{ v.name.en }}
                    </h2>

                    <h1>{{ v.name.th }}</h1>
                  </div>
                  <div class="row item-detail-price">
                    <p>{{ v.receive_amount | number_format }} บ.</p>
                    <!-- <router-link
                :to="{
                  path: '/trade/' + v.game_id + '/' + v.id,
                }"
                class="btn"
                >Trade</router-link
              > -->
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <Loader />
      </template>
    </div>
  </div>
</template>

<script>
import Flickity from "flickity";
import Allgame from "../components/home/Allgame.vue";
import Loader from "../components/Loader.vue";
export default {
  data() {
    return {
      hotItem: [],
      itemGoodPrice: [],
      Allitem: [],
      idGame: "",
      loadeing: 0,
    };
  },

  mounted() {
    this.changeSelected(0);
    // const self = this;
    this.gatgameFT();
    // this.checkToken();
    // setTimeout(() => {
    //   document.getElementsByClassName("previous")[1].disabled = false;
    //   document.getElementsByClassName("next")[1].disabled = false;
    // }, 1000);
  },

  components: {
    Allgame,
    Loader,
  },
  methods: {
    gatgameFT() {
      const self = this;

      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getlistgame/")
        .then((response) => {
          // console.log();
          this.idGame = response.data.data[0].id;
          this.$nextTick(function() {
            self.idgame(response.data.data[0].id);
            // self.getData();
          });
        });
    },
    getData() {
      const self = this;

      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getlistitem/" + this.idGame)
        .then((response) => {
          this.hotItem = response.data.datahot;
          this.itemGoodPrice = response.data.databestprice;
          this.Allitem = response.data.dataall;
          this.$nextTick(function() {
            self.flkty();
            self.loadeing = 1;
          });
        });
    },
    next(k) {
      var a = document
        .getElementById("main-carousel-allitem")
        .getElementsByClassName("next");

      a[k].click();
    },

    previous(k) {
      var a = document
        .getElementById("main-carousel-allitem")
        .getElementsByClassName("previous");
      a[k].click();
    },
    idgame(val) {
      // const self = this;
      // console.log(val);
      this.idGame = val;
      let gamesl = document.getElementsByClassName("game-select");

      if (gamesl.length > 0) {
        gamesl[0].classList.remove("game-select");
      }

      var element = document.getElementById("game" + val);
      element.classList.add("game-select");

      this.Allitem = [];
      this.getData();
    },
    flkty() {
      var elem = document.querySelector(".main-carousel");

      new Flickity(elem, {
        cellAlign: "left",
        contain: true,
        groupCells: 4,

        wrapAround: true,
        prevNextButtons: true,
        pageDots: false,
        on: {
          dragStart: () => {
            elem.style.pointerEvents = "none";
          },
          dragEnd: () => {
            elem.style.pointerEvents = "all";
          },
        },
      });
    },
  },
};
</script>
