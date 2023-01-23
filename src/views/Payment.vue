<template>
  <div>
    <div class="bg-third-payment pd-b" id="section-third">
      <div class="container-content">
        <div class="marketplace-Search-area-payment row">
          <div class="col-12 col-xs-12 col-md-12 col-lg-12">
            <div class="pay-back">
              <i class="fas fa-chevron-left pd-t-b-back-payment"></i> ย้อนกลับ
            </div>

            <div class="row bg-tab-1 b-radius">
              <div class="col-1 ">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label class="form-check-label" for="defaultCheck1"></label>
                </div>
              </div>
              <div class="col-6 pd-custom">
                <div class="d-lg-flex d-md-flex">
                  <div class="f-size-vmin">Superslot</div>
                </div>
              </div>

              <div class="col-2 pd-custom">
                <div class="f-size-vmin">ราคาต่อชิ้น</div>
              </div>
              <div class="col-2 pd-custom">
                <div class="f-size-vmin r-sell-item">
                  แอคชัน
                </div>
              </div>
            </div>

            <br />

            <div class="row  bg-tab-2 b-radius">
              <div class="col-1 ">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label class="form-check-label" for="defaultCheck1"></label>
                </div>
              </div>
              <div class="col-6 pd-custom">
                <div class="d-lg-flex d-md-flex">
                  <img
                    src="@/assets/img/item/Classic Pipe.png"
                    class="img-items-p"
                    alt=""
                  />

                  <div class="f-size-vmin">
                    <p class="n-items p-items ">Classic Pipe</p>
                    <p class="d-items p-items">ซิกกาดูสเทพเจ้า</p>
                    <div class="point-item">
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-2 pd-custom">
                <div class="f-size-vmin">฿10,000.00</div>
              </div>
              <div class="col-2 pd-custom">
                <a class="btn-del-item r-sell-item f-size-vmin f-white">ลบ</a>
              </div>
            </div>
            <br />

            <div class="row bg-tab-3  b-radius">
              <div class="col-1 ">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label class="form-check-label" for="defaultCheck1"></label>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-4 pd-custom">
                <div class="d-lg-flex d-md-flex">
                  <div class="f-size-vmin">Superslot</div>
                </div>
              </div>

              <div class="col-lg-2 col-md-2 col-3 pd-custom">
                <div class="f-size-vmin">เลือกทั้งหมด 1</div>
              </div>
              <div class="col-lg-2 col-md-2 col-3 pd-custom">
                <div class="f-size-vmin r-sell-item">
                  <div class="f-size-vmin r-sell-item">
                    รวมทั้งหมด (1ไอเท็ม)
                  </div>
                  <br />
                  <div class="r-sell-item ">
                    <a class="btn-sell-item f-size-vmin f-black">ขายไอเท็ม</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="content-third-area row"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Allitem: [],
      Allgame: [],
      searchQuery: "",
      sortGame: "",
      sortPrice: "",
      token: "",
    };
  },

  mounted() {
    const tis = this;
    // this.gettoken();
    this.getAllgame();
    this.$nextTick(function() {
      tis.getData();
    });
  },

  methods: {
    gettoken() {
      this.axios.get(this.$API_URL + "/api/v1/token/new").then((response) => {
        // console.log(response.data.access_token);
        let D = new Date();
        D.setHours(D.getHours() + 1);

        console.log(D);
        this.token = response.data.access_token;

        //  this.$cookie.set("token", response.data.access_token, D)

        document.cookie = "token=" + response.data.access_token + ";" + D;
        // let x = this.$cookies.get("token");
        // console.log(x);
      });
    },
    getAllgame() {
      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getlistgame")
        .then((response) => {
          this.Allgame = response.data.data;
          // console.log(this.Allgame);
        });
    },
    getData() {
      const self = this;
      var body = new Object();
      if (this.sortGame != "") {
        body = {
          filter: {
            game_id: self.sortGame,
            search: self.searchQuery,
          },
          perpage: 20,
          page: 1,
          pagination_on: false,
          sort_by: self.sortPrice,
        };
      } else {
        body = {
          filter: {
            search: self.searchQuery,
          },
          perpage: 20,
          page: 1,
          pagination_on: false,
          sort_by: self.sortPrice,
        };
      }
      const config = {
        headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
      };
      // console.log(body);
      this.axios
        .post(
          this.$API_URL + "/api/v1/frontend/marketplace/listitem",
          body,
          config
        )
        .then((response) => {
          // console.log(response.data.data.list);
          this.Allitem = response.data.data.list;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          // console.log(error.response);

          this.$alert(error.response.data.msg.th, "เกิดข้อผิดพลาด", "error");
        });
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
      // console.log(this.sortGame);
      const self = this;
      if (this.sortGame != "") {
        this.getData();
        return this.Allitem;
      } else {
        this.getData();
        self.sortGame = "";
        return this.Allitem;
      }
    },

    sortPrice() {
      const self = this;
      if (this.sortPrice != "") {
        this.getData();
        return this.Allitem;
      } else {
        this.getData();
        self.sortPrice = "";
        return this.Allitem;
      }
    },
  },
};
</script>
