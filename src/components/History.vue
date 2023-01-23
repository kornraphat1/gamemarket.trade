<template>
  <div
    class="modal fade"
    id="ModalHistory"
    tabindex="-1"
    role="dialog"
    aria-labelledby="ModalHistoryLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div
        class="modal-content  modal-content-Historymodal"
        id="input-bank"
        style="display:block"
      >
        <div class="modal-header Historymodal-header">
          <h5 class="modal-title" id="ModalHistoryLabel">
            History Trade / Withdraw
          </h5>
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
          <!-- <div class="row history-header">
            <div class="input-group col-12">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"
                  ><i class="fas fa-search"></i
                ></span>
              </div>
              <input
                v-model="searchselect"
                type="text"
                class="form-control"
                placeholder="Item Name Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div> -->
          <div class="row history-header">
            <div class="history-fillter-group">
              <div class=" history-fillter">
                <Select2
                  v-model="sortTypeselect"
                  :disabled="sortGameselect != 0 ? true : false"
                  :options="sorttype"
                  :settings="{
                    minimumResultsForSearch: Infinity,
                    placeholder: 'Sort by Type',
                  }"
                />
              </div>
              <div class=" history-fillter">
                <Select2
                  v-model="sortGameselect"
                  :disabled="sortTypeselect == 'withdraw' ? true : false"
                  :options="listgame"
                  :settings="{
                    minimumResultsForSearch: Infinity,
                    placeholder: 'Sort by Game',
                  }"
                />
              </div>
            </div>
            <div class="history-fillter-group history-fillter-group-sm">
              <div style="margin: auto 5px;"><span>Date:</span></div>

              <div class=" history-fillter history-fillter-sm">
                <datepicker :language="en" v-model="startdate"></datepicker>
              </div>
              <div style="margin: auto 5px;"><span>TO</span></div>
              <div class=" history-fillter history-fillter-sm">
                <datepicker
                  :language="en"
                  v-model="enddate"
                  :disabled-dates="disabledDates"
                ></datepicker>
              </div>
            </div>
          </div>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
            max-height="65vh"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.row.type == 'withdraw'">{{
                props.formattedRow[props.column.field]
              }}</span>

              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>

            <div slot="emptystate">
              {{
                loader == 1
                  ? "This will show up when there are no rows"
                  : "Loading..."
              }}
            </div></vue-good-table
          >
        </div>

        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-confirm-editProfile">
            ยืนยัน
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { en, th } from "vuejs-datepicker/dist/locale";
export default {
  name: "History",

  props: ["user_percent"],

  data() {
    return {
      en: en,
      th: th,
      startdate: "",
      enddate: "",
      sortTypeselect: "",
      sortGameselect: "",
      searchselect: "",
      loader: 0,

      sorttype: [
        { id: "0", text: "Sort by Type" },
        { id: "sale", text: "Sale" },
        { id: "withdraw", text: "Withdraw" },
      ],
      currentDate: "",
      disabledDates: {
        to: "", // Disable all dates up to specific date
        from: "", // Disable all dates after specific date
      },
      body: {
        perpage: 100,

        page: 1,
        filter: {
          // search: "",
          // game_id: 1,
          // type: "withdraw",
        },
        start_date: "",
        end_date: "",
      },
      columns: [
        {
          label: "Game Name",
          field: "game_name",
          tdClass: "text-center ",
          thClass: "thClass ",
        },
        {
          label: "Item Name",
          field: "item_name",
          tdClass: "text-center ",
          thClass: "thClass ",
          // type: "text",
        },

        {
          label: "Amount / fee",
          field: "amount",
          tdClass: "",
          thClass: "thClass ",
          type: "number",
        },
        {
          label: "Date",
          field: "created_at",
          thClass: "thClass ",
          tdClass: "text-center ",
          // type: "text",
        },
        {
          label: "Type",
          field: "type",
          thClass: "thClass ",
          tdClass: this.tdClassFunc,
          // type: "text",
        },
        {
          label: "Status",
          field: "status",
          thClass: "thClass ",
          tdClass: this.tdClassFuncStatus,
          // type: "text",
        },
      ],
      listgame: [],
      rows: [],
    };
  },
  mounted() {
    this.setupdate();

    const self = this;
    this.$nextTick(function() {
      if (this.$cookies.get("token_main")) {
        self.getData();
      }
    });
  },

  methods: {
    setupdate() {
      var today = new Date();
      var fristDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      var lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      this.body.start_date = this.setDate(fristDayOfMonth);
      this.body.end_date = this.setDate(lastDayOfMonth);
      this.startdate = this.body.start_date;
      this.enddate = this.body.end_date;
    },
    setDate(date) {
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
      let mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

      return ye + "-" + mo + "-" + da;
    },
    getData() {
      this.rows = [];
      const self = this;
      this.$nextTick(function() {
        self.getDataAPT();
      });
    },
    getDataAPT() {
      const config = {
        headers: { Authorization: `Bearer ${this.$cookies.get("token_main")}` },
      };
      this.axios
        .post(this.$API_URL + "/api/v1/frontend/listhistory", this.body, config)
        .then((response) => {
          this.loader == 1;
          if (this.listgame == "") {
            this.listgame.push({
              id: 0,
              text: "AllGame",
            });
            response.data.listgame.forEach((listgame) => {
              this.listgame.push({
                id: listgame.id,
                text: listgame.game_name.en,
              });
            });
          }
          if (this.rows != []) {
            this.rows = [];
          }
          // console.log(response.data.data.list);
          this.$nextTick(function() {
            response.data.data.list.forEach((element) => {
              let date = new Date(element.created_at);
              let ye = new Intl.DateTimeFormat("en", {
                year: "numeric",
              }).format(date);
              let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
                date
              );
              let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                date
              );
              let Hours = ("0" + date.getHours()).slice(-2);
              let Minutes = ("0" + date.getMinutes()).slice(-2);
              let Seconds = ("0" + date.getSeconds()).slice(-2);

              let dateshow = `${da}-${mo}-${ye}`;
              let timeshow = `${Hours}:${Minutes}:${Seconds}`;
              let amount_val = "";

              let money = "";
              const self = this;

              if (this.user_percent == 0) {
                amount_val = self.number_format(element.amount) + " P";
              } else {
                money = self.calpercent(element.amount);
                if (element.type == "sale") {
                  amount_val = self.number_format(element.amount) + " P";
                } else {
                  amount_val = money + " บ.";
                }
              }

              var showType = "";
              var fee = "";
              let amount_show = amount_val;
              if (element.wiwallet_fee > 0) {
                fee = " / 20 บ.";
              }
              if (element.type == "sale") {
                showType = "sale";
              } else if (element.type == "sale_item") {
                showType = "sale";
              } else if (element.type == "withdraw") {
                showType = "withdraw";
                amount_show = amount_val + fee;
              } else if (element.type == "withdraw_item") {
                showType = "withdraw";
                amount_show = amount_val + fee;
              }

              this.rows.push({
                game_name: element.game_name.en ? element.game_name.en : "-",
                item_name: element.item_name.en ? element.item_name.en : "-",
                amount: amount_show,
                type: showType,
                status: element.tranfer_status,
                created_at: `${dateshow} | ${timeshow}`,
              });
            });
          });
        })
        .catch((error) => {
          this.errorMessage = error.message;
          // console.log(error);
          // alert(error);
        });
    },
    calpercent(amount) {
      return (amount * this.user_percent) / 100;
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

        return s.join(dec);
      }
    },
    tdClassFunc(row) {
      if (row.type == "withdraw") {
        return "bg-withdraw  tdClass";
      }

      return "tdClass vgt-right-align";
    },
    tdClassFuncStatus(row) {
      if (row.status == "pending") {
        return "bg-pending  tdClass";
      } else if (row.status == "success") {
        return "bg-success-col  tdClass";
      } else {
        return "tdClass vgt-right-align";
      }
    },
  },
  watch: {
    user_percent() {
      this.getData();
    },

    startdate() {
      this.disabledDates.to = new Date(this.startdate);
      if (this.startdate) {
        this.body.start_date = this.startdate;
      } else {
        this.body.start_date = "";
      }
      if (this.enddate) {
        this.body.end_date = this.enddate;
      } else {
        this.body.end_date = "";
      }
      const self = this;
      this.rows = [];
      this.$nextTick(function() {
        self.getData();
      });
    },
    enddate() {
      // this.disabledDates.from = new Date(this.enddate);
      if (this.startdate) {
        this.body.start_date = this.startdate;
      } else {
        this.body.start_date = "";
      }
      if (this.enddate) {
        this.body.end_date = this.enddate;
      } else {
        this.body.end_date = "";
      }
      const self = this;
      this.rows = [];
      this.$nextTick(function() {
        self.getData();
      });
    },
    sortTypeselect() {
      // console.log(this.sortTypeselect);

      if (this.sortTypeselect != 0) {
        this.body.filter.type = this.sortTypeselect;
      } else {
        delete this.body.filter["type"];
      }
      if (this.sortGameselect != 0) {
        this.body.filter.game_id = this.sortGameselect;
      } else {
        delete this.body.filter["game_id"];
      }
      if (this.searchselect) {
        this.body.filter.search = this.searchselect;
      } else {
        delete this.body.filter["search"];
      }

      const self = this;
      this.rows = [];
      this.$nextTick(function() {
        self.getData();
      });
    },
    sortGameselect() {
      // console.log(this.sortGameselect);
      if (this.sortTypeselect != 0) {
        this.body.filter.type = this.sortTypeselect;
      } else {
        delete this.body.filter["type"];
      }
      if (this.sortGameselect != 0) {
        this.body.filter.game_id = this.sortGameselect;
      } else {
        delete this.body.filter["game_id"];
      }
      if (this.searchselect) {
        this.body.filter.search = this.searchselect;
      } else {
        delete this.body.filter["search"];
      }

      const self = this;
      this.rows = [];
      this.$nextTick(function() {
        self.getData();
      });
    },
    searchselect() {
      // console.log(this.searchselect);
      if (this.sortTypeselect != 0) {
        this.body.filter.type = this.sortTypeselect;
      } else {
        delete this.body.filter["type"];
      }
      if (this.sortGameselect != 0) {
        this.body.filter.game_id = this.sortGameselect;
      } else {
        delete this.body.filter["game_id"];
      }
      if (this.searchselect) {
        this.body.filter.search = this.searchselect;
      } else {
        delete this.body.filter["search"];
      }
      const self = this;
      this.rows = [];
      this.$nextTick(function() {
        self.getData();
      });
    },
  },
  components: {
    Datepicker,
  },
};
</script>

<style scoped></style>