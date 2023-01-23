<template>
  <div class="mainPage">
    <div class="bg-tradeDetail">
      <div class="content-marketplaceDetail">
        <div class="">
          <img
            src="@/assets/img/banner-myitem.png"
            alt=""
            style="width: 100%"
          />
        </div>
      </div>
    </div>

    <div class="bg-third" id="section-third" v-if="pageTeade == 1">
      <div class="container">
        <div class="Myitem-Search-area">
          <div class="Search-area">
            <div class="input-group-prepend">
              <span class="" id="basic-addon1"
                ><i class="fas fa-search"></i
              ></span>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search Product"
              />
            </div>
          </div>
          <div class="col-5 col-sm-5 col-md-3 myitems-fillter-title">
            <Select2
              v-model="sortGame"
              :options="listgame"
              :settings="{
                minimumResultsForSearch: Infinity,
                placeholder: 'All Game',
              }"
            />
          </div>
        </div>

        <div class="SelectOptionArea">
          <div class="left">
            <div class="switch-area">
              <label class="switch">
                <input type="checkbox" v-model="SelectOptionStatus" />
                <span class="slider"></span>
              </label>
              <div class="title">เลือกหลายรายการ</div>
            </div>
            <div class="switch-area SelectAll" v-if="SelectOptionStatus">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="SelectAll"
                  @click="SelectAllClick()"
                />
                <span class="slider"></span>
              </label>
              <div class="title">เลือกทั้งหมด</div>
            </div>
          </div>
          <div class="right">
            <div class="btnTrade" v-if="SelectOptionStatus">
              <button
                :disabled="SelectNum == 0 || SelectNum == ''"
                class="btn"
                @click="toTrade()"
              >
                Trade ({{ SelectNum }})
              </button>
            </div>
          </div>
        </div>

        <div class="content-third-area row">
          <Loader v-if="loader == true" />
          <template v-else>
            <div
              class="content-third-myI"
              id="content-third-myI"
              v-if="Allitem"
            >
              <div class="item-myI" v-for="(v, key) in Allitem" :key="key">
                <div
                  class="item-grid-myI"
                  :class="SelectOptionStatus ? 'selectMode' : ''"
                >
                  <div
                    class="static"
                    @click="
                      SelectOptionStatus
                        ? SelectOptionStatusClick(key, v.track_id)
                        : ClickHandlerItem(key, v.track_id)
                    "
                  >
                    <div class="row item-detail-price-myI">
                      <div class="price-myI" style="margin">
                        <img
                          src="@/assets/img/coin_icon.png"
                          alt=""
                          class="coin_icon"
                        />
                        <p>{{ v.receive_amount | number_format }} บ.</p>
                      </div>
                      <div style="position: relative" v-if="SelectOptionStatus">
                        <label class="chackboxContainer">
                          <input type="checkbox" v-model="v.selectStatus" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div class="item-img">
                      <img
                        :src="
                          v.picture ? $IMG_URL_ITEM + v.picture : $IMG_image
                        "
                      />
                    </div>
                    <div class="item-detail">
                      <h2 :style="v.star_level | color_sty">
                        {{ v.name.en }}
                      </h2>
                      <h1>{{ v.name.th }}</h1>
                      <div
                        style="
                          font-size: 14px;
                          color: #fdc217;
                          margin-bottom: 5px;
                        "
                      >
                        หมดอายุใน : {{ v.expired_at | getdatecontdown }}
                      </div>
                    </div>
                    <div
                      class="row item-detail-price"
                      v-if="SelectOptionStatus == false"
                    >
                      <button
                        class="btn"
                        data-toggle="modal"
                        data-target="#ModalConfirm"
                      >
                        Trade
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div style="color: #fff" class="text-center">
                <h1>คุณยังไม่มีไอเท็ม</h1>
              </div>
            </div>
          </template>
        </div>

        <div class="Pagination" v-if="pagiItem.max_page > 1">
          <div class="Pagination-item">
            <button
              class="btn"
              @click="PaginationFirst()"
              id="PaginationFirst"
              :disabled="pagiItem.hasprevPage == false ? true : false"
            >
              <i class="fas fa-angle-double-left"></i>
            </button>
          </div>
          <div class="Pagination-item">
            <button
              class="btn"
              @click="PaginationBack()"
              id="PaginationBack"
              :disabled="pagiItem.hasprevPage == false ? true : false"
            >
              <i class="fas fa-angle-left"></i>
            </button>
          </div>

          <div
            v-if="pagiItem.prevPage != null && pagiItem.prevPage - 1 >= 1"
            :class="Paginationitem(false)"
          >
            <button class="btn" @click="Pagination(pagiItem.prevPage - 1)">
              {{ pagiItem.prevPage - 1 }}
            </button>
          </div>
          <div v-if="pagiItem.prevPage" :class="Paginationitem(false)">
            <button class="btn" @click="Pagination(pagiItem.prevPage)">
              {{ pagiItem.prevPage }}
            </button>
          </div>

          <div :class="Paginationitem(true)">
            <button class="btn" @click="Pagination(pagi)">
              {{ pagi }}
            </button>
          </div>

          <div v-if="pagiItem.nextPage" :class="Paginationitem(false)">
            <button class="btn" @click="Pagination(pagiItem.nextPage)">
              {{ pagiItem.nextPage }}
            </button>
          </div>
          <div
            v-if="
              pagiItem.nextPage != null &&
              pagiItem.nextPage + 1 <= pagiItem.max_page
            "
            :class="Paginationitem(false)"
          >
            <button class="btn" @click="Pagination(pagiItem.nextPage + 1)">
              {{ pagiItem.nextPage + 1 }}
            </button>
          </div>

          <div class="Pagination-item">
            <button
              class="btn"
              @click="PaginationNext()"
              id="PaginationNext"
              :disabled="pagiItem.hasnextPage == false ? true : false"
            >
              <i class="fas fa-angle-right"></i>
            </button>
          </div>
          <div class="Pagination-item">
            <button
              class="btn"
              @click="PaginationEnd()"
              id="PaginationEnd"
              :disabled="pagiItem.hasnextPage == false ? true : false"
            >
              <i class="fas fa-angle-double-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <TradeConf
      :SelectItem="SelectItem"
      :pageTeade="pageTeade"
      @toBack="toBack"
    ></TradeConf>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import TradeConf from "../components/modal/TradeConf.vue";
export default {
  data() {
    return {
      Allitem: [],
      pagiItem: [],
      SelectItem: [],
      listgame: [{ id: 0, text: "All Game" }],
      searchQuery: "",
      game_id: "",
      pagi: 1,
      pageTeade: 1,
      sortGame: 0,
      SelectNum: 0,
      content: 0,
      SelectAll: false,
      SelectOptionStatus: false,
      loader: true,
    };
  },
  mounted() {
    this.changeSelected(2);
    this.checkToken();
    this.getData();
    this.getlistgame();

    // if (this.$cookies.get("track_status") != "empty") {
    // }
  },
  methods: {
    toBack(i) {
      this.pageTeade = i;
    },

    toTrade() {
      this.pageTeade = 2;
    },
    getlistgame() {
      this.checkToken();

      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getlistmygame", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token_main")}`,
          },
        })
        .then((response) => {
          response.data.data.forEach((element) => {
            this.listgame.push({ id: element.id, text: element.game_name.th });
          });
        });
    },

    getData() {
      this.checkToken();

      this.loader = true;
      var body = new Object();
      const self = this;
      if (this.sortGame == 0) {
        body = {
          filter: {
            search: this.searchQuery,
          },
          perpage: 2000,
          page: this.pagi,
          pagination_on: false,
          sort_by: "asc",
        };
      } else {
        body = {
          filter: {
            game_id: this.sortGame ? this.sortGame : this.game_id,
            search: this.searchQuery,
          },
          perpage: 2000,
          page: this.pagi,
          pagination_on: false,
          sort_by: "asc",
        };
      }
      let config = {
        headers: { Authorization: `Bearer ${this.$cookies.get("token_main")}` },
      };
      this.axios
        .post(this.$API_URL + "/api/v1/frontend/listmyitems", body, config)
        .then((response) => {
          // console.log(response.data.data.list);
          this.Allitem = response.data.data.list;

          this.pagiItem["current_page"] = response.data.data.current_page;
          this.pagiItem["hasnextPage"] = response.data.data.hasnextPage;
          this.pagiItem["hasprevPage"] = response.data.data.hasprevPage;
          this.pagiItem["prevPage"] = response.data.data.prevPage;
          this.pagiItem["prevPage"] = response.data.data.prevPage;
          this.pagiItem["max_page"] = response.data.data.max_page;
          this.pagiItem["max_list"] = response.data.data.max_list;
          this.pagiItem["nextPage"] = response.data.data.nextPage;
          if (response.data.data.list) {
            this.setSelectOption(response.data.data.list.length);
          }

          if (this.$cookies.get("track_status") != "error") {
            if (this.$cookies.get("track_status") != "empty") {
              if (this.$cookies.get("track_status") == "all") {
                this.SelectAllClick();
                this.$nextTick(function () {
                  this.pageTeade = 2;
                  this.$cookies.set("track_status", "");
                  this.$cookies.set("track", "");
                  this.$cookies.set("track_status", "empty");
                });
              } else {
                this.autoSelect();
                this.$nextTick(function () {
                  this.pageTeade = 2;
                  this.$cookies.set("track_status", "");
                  this.$cookies.set("track", "");
                  this.$cookies.set("track_status", "empty");
                });
              }
            }
          }

          this.$nextTick(function () {
            self.loader = false;
          });
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.log("error");
          console.log(error);
          // alert(error);
        });
    },

    setSelectOption(index) {
      for (let i = 0; i < index; i++) {
        this.Allitem[i].selectStatus = false;
      }
    },
    autoSelect() {
      if (this.$cookies.get("track")) {
        var track = this.$cookies.get("track");
        var arraryTrack = track.split(",");

        for (let i = 0; i < arraryTrack.length; i++) {
          this.addSelectItemList(arraryTrack[i]);
        }
      }
    },

    SelectOptionStatusClick(k, track_id) {
      if (this.Allitem[k].selectStatus == true) {
        this.delSelectItemList(k, track_id);
      } else {
        this.addSelectItemList(track_id);
      }
    },
    addSelectItemList(track_id) {
      const indexOfObject = this.Allitem.findIndex((object) => {
        return object.track_id === track_id;
      });
      if (indexOfObject >= 0) {
        this.SelectNum += 1;
        this.Allitem[indexOfObject].selectStatus = true;
        this.SelectItem.push(this.Allitem[indexOfObject]);
      } else {
        this.$alert("ไม่มีไอเทมที่คุณเลีอก", "เกิดข้อผิดพลาด", "error").then(
          () => {
            location.reload();
          }
        );
      }
    },
    delSelectItemList(k, track_id) {
      const indexOfObject = this.SelectItem.findIndex((object) => {
        return object.track_id === track_id;
      });

      this.SelectNum -= 1;
      this.Allitem[k].selectStatus = false;
      this.SelectItem.splice(indexOfObject, 1);
    },
    SelectAllClick() {
      var bool = false;
      var index = this.Allitem.length;
      this.SelectNum = 0;
      if (this.SelectAll) {
        bool = false;
        this.SelectNum = 0;
        this.SelectItem = [];
      } else {
        bool = true;
        this.SelectNum = index;
        // this.SelectItem = this.Allitem;
        this.SelectItem = [];

        for (let i = 0; i < index; i++) {
          this.SelectItem.push(this.Allitem[i]);
        }
      }
      for (let i = 0; i < index; i++) {
        this.Allitem[i].selectStatus = bool;
      }
    },

    ClickHandlerItem(k, track_id) {
      var self = this;
      this.SelectItem = [];
      this.setSelectOption(this.Allitem.length);
      self.SelectNum = 0;

      this.$nextTick(function () {
        self.SelectNum += 1;
        self.loader = false;
        self.Allitem[k].selectStatus = true;
        self.addSelectItemList(track_id);
        self.toTrade();
      });
    },

    SetPagination() {
      let is = 0;
      while (is < this.pagiItem.max_page) {
        is++;
      }
    },
    Pagination(item) {
      this.pagi = item;
      this.getData();
      document.getElementById("section-third").scrollIntoView();
    },
    PaginationBack() {
      this.pagi = this.pagi - 1;
      this.getData();
      document.getElementById("section-third").scrollIntoView();
    },
    PaginationNext() {
      this.pagi = this.pagi + 1;
      this.getData();
      document.getElementById("section-third").scrollIntoView();
    },
    PaginationFirst() {
      this.pagi = this.pagi = 1;
      this.getData();
      document.getElementById("section-third").scrollIntoView();
    },
    PaginationEnd() {
      this.pagi = this.pagi = this.pagiItem.max_page;
      this.getData();
      document.getElementById("section-third").scrollIntoView();
    },
    Paginationitem(item) {
      if (item == true) {
        return "Pagination-item active";
      } else {
        return "Pagination-item";
      }
    },
  },
  computed: {
    Itemgames() {
      if (this.searchQuery) {
        return this.Allitem.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) =>
              (item.name_eng + item.name_thai + item.price)
                .toLowerCase()
                .includes(v)
            );
        });
      } else {
        return this.Allitem;
      }
    },
  },

  watch: {
    SelectNum() {
      this.SelectNum = this.SelectItem.length;
      if (this.SelectNum < 0) {
        this.SelectNum = 0;
      }
      if (this.SelectNum == this.Allitem.length) {
        this.SelectAll = true;
      } else {
        this.SelectAll = false;
      }
      this.$cookies.set("SelectNum", this.SelectNum);
    },

    sortGame() {
      const self = this;
      this.SelectAll = false;
      this.SelectItem = [];
      this.SelectNum = 0;

      if (this.sortGame != 0) {
        this.getData();
        return this.Allitem;
      } else {
        this.getData();
        self.sortGame = 0;
        return this.Allitem;
      }
    },
    searchQuery() {
      const self = this;
      this.SelectAll = false;
      this.SelectItem = [];
      this.SelectNum = 0;
      if (this.searchQuery) {
        this.getData();
        return this.Allitem;
      } else {
        this.getData();
        self.searchQuery = "";
        return this.Allitem;
      }
    },
  },
  components: { Loader, TradeConf },
};
</script>
