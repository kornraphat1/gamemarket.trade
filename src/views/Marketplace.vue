<template>
  <div class="mainPage">
    <div class="bg-tradeDetail">
      <div class="content-marketplaceDetail  ">
        <div style="width: 100%;">
          <img
            src="@/assets/img/Rectangle 270.png"
            alt=""
            style="width: 100%;"
          />
        </div>
      </div>
    </div>

    <div class="bg-third" id="section-third">
      <div class="container">
        <div class="marketplace-Search-area row">
          <div class=" col-xs-12 col-md-12 col-lg-7">
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
          <div class="row col-xs-12 col-md-12 col-lg-5 sm-market-sort">
            <div
              class="col-6 marketplace-fillter-title"
              style="  padding-right:5px"
            >
              <Select2
                v-model="sortGame"
                :options="Allgame"
                :settings="{
                  // minimumResultsForSearch: Infinity,
                  placeholder: 'All Game',
                }"
              />
              <!--   <select
                class=" marketplace-fillter-title"
                aria-label="Default select example"
                v-model="sortGame"
              >
                <option class="dropd-item" selected value="">All Game</option>
                <option
                  v-for="(v, key) in Allgame"
                  :key="key"
                  class="dropd-item"
                  :value="v.id"
                  >{{ v.short_name }}</option
                >
              </select>-->
            </div>

            <div
              class="col-6 marketplace-fillter-title"
              style=" padding-left:5px  "
            >
              <Select2
                v-model="sortPriceselect"
                :options="sortPriceitem"
                :settings="{
                  minimumResultsForSearch: Infinity,
                  placeholder: 'Sort by',
                }"
              />

              <!--<select
                class=" js-example-basic-single "
                aria-label="Default select example"
                v-model="sortPrice"
              >
                <option class="dropd-item" selected value="">Sort by</option>
                <option class="dropd-item" value="asc"
                  >Price: Low to high</option
                >
                <option class="dropd-item" value="desc"
                  >Price: higt to low</option
                >
              </select>-->
            </div>
          </div>
        </div>
        <div class="content-third-area row">
          <div class="content-third-item " id="allitem">
            <div class="row" v-if="Allitem.length > 0">
              <div
                class="item-grid col-3"
                v-for="(v, key) in Allitem"
                :key="key"
              >
                <!-- <router-link
                  class="static"
                  :to="{
                    path: '/trade/' + v.game_id + '/' + v.id,
                  }"
                > -->
                <div>
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
                <!-- </router-link> -->
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
                  <button
                    class="btn"
                    @click="Pagination(pagiItem.prevPage - 1)"
                  >
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
                  <button
                    class="btn"
                    @click="Pagination(pagiItem.nextPage + 1)"
                  >
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

            <Loader v-else-if="loader == 0" />
            <div v-else>
              <div style="color: #fff;" class="text-center">
                <h1>ไม่พบไอเท็มที่ ค้นหา</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
export default {
  data() {
    return {
      Allitem: [],
      Allgame: [{ id: 0, text: "All Game" }],
      loader: 0,
      pagiItem: [],
      searchQuery: "",
      sortGame: "",
      sortPrice: "",
      sortPriceselect: "",
      token: "",
      pagi: 1,
      pagishow: [],
      // myValue: "",
      sortPriceitem: [
        { id: "0", text: "Sort by" },
        { id: "asc", text: "Price: Low to high" },
        { id: "desc", text: "Price: higt to low" },
      ],
    };
  },
  mounted() {
    // const tis = this;
    this.changeSelected(1);
    // this.checkToken();
    this.getAllgame();
    this.getData();
  },
  computed: {},
  methods: {
    getAllgame() {
      // const self = this;
      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getlistgame")
        .then((response) => {
          // this.Allgame = response.data.data;
          response.data.data.forEach((element) => {
            // this.Allgame.push({ id: 0, text: "All Game" });
            this.Allgame.push({ id: element.id, text: element.short_name });
          });
          // console.log(this.Allgame);
        });
      // this.$nextTick(function() {
      //   self.loader = 1;
      // });
    },
    getData() {
      const self = this;
      var body = new Object();
      if (this.sortGame != 0) {
        body = {
          filter: {
            game_id: self.sortGame,
            search: self.searchQuery,
          },
          perpage: 16,
          page: this.pagi,
          pagination_on: false,
          sort_by: self.sortPrice,
        };
      } else {
        body = {
          filter: {
            search: self.searchQuery,
          },
          perpage: 16,
          page: this.pagi,
          pagination_on: false,
          sort_by: self.sortPrice,
        };
      }
      // const config = {
      //   headers: { Authorization: `Bearer ${this.$cookies.get("token_main")}` },
      // };
      // console.log(this.$cookies.get("token"));
      this.axios
        .post(
          this.$API_URL + "/api/v1/frontend/marketplace/listitem",
          body
          // config
        )
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
          this.$nextTick(function() {
            self.loader = 1;
            self.SetPagination();
          });
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.log(error);
          // alert(error);
        });
    },
    SetPagination() {
      let is = 0;
      while (is < this.pagiItem.max_page) {
        // console.log(is);
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
  watch: {
    searchQuery() {
      const self = this;
      if (this.searchQuery) {
        this.getData();
        return this.Allitem;
      } else {
        this.getData();
        self.searchQuery = "";
        return this.Allitem;
      }
    },
    sortGame() {
      console.log(this.sortGame);
      const self = this;
      if (this.sortGame != 0) {
        this.getData();
        return this.Allitem;
      } else {
        this.getData();
        self.sortGame = "";
        return this.Allitem;
      }
    },
    sortPriceselect() {
      const self = this;
      if (this.sortPriceselect != "0") {
        self.sortPrice = self.sortPriceselect;
        this.getData();
        return this.Allitem;
      } else {
        this.getData();
        self.sortPrice = "";
        return this.Allitem;
      }
    },
  },
  components: { Loader },
};
</script>
