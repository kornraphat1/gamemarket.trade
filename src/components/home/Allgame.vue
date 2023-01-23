<template>
  <div>
    <div id="section-third">
      <div class="empty-space"></div>
      <div class="container ">
        <div class="content-third-itile row">
          <div class="col-6">
            <h2>เกมส์ทั้งหมด</h2>
          </div>

          <div class="col-6 previous-next-zone"  v-if="Allgame.length > 0">
            <button class="previous-next-btn " aria-label="Previous" @click="previous(0)">
              <i class="fas fa-angle-left"></i>
            </button>

            <button class="previous-next-btn " aria-label="Next" @click="next(0)">
              <i class="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="content-game-area container" id="main-carousel-allgame">
        <flickity
          class="main-caro "
          ref="flickity"
          :options="flickityOptions"
          v-if="Allgame.length > 0"
        >
          <div
            class="carousel-cell-game"
            :id="'game' + v.id"
            v-for="(v, key) in Allgame"
            :key="key"
            @click="sentIdgame(v.id)"
          >
          
            <div class="img-game">
              <!-- <img :src="v.logo ? $IMG_URL + v.logo : $IMG_image" /> -->
                   <img src="@/assets/img/LOLTFT/05115950015845122654900_Teamfight_Tactics_main.jpg" />

            </div>
          </div>
        </flickity>
     
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from "vue-flickity";
export default {
  data() {
    return {
      Allgame: [],
      // IMG_URL:this.$IMG_URL,
      flickityOptions: {
        // lazyLoad: 3,
        cellAlign: "left",
        contain: true,
        groupCells: "50%",
        // freeScroll: true,
        wrapAround: true,
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
    this.getData();
    //  let next = document.getElementsByClassName("next");
    setTimeout(() => {
      
      document.querySelector('.previous').disabled = false;
      document.querySelector('.next').disabled = false;
     
    }, 1000);
    
  },
  components: {
    Flickity,
  },
  methods: {
    getData() {
      const self = this;
 
      this.axios
        .get(this.$API_URL + "/api/v1/frontend/getlistgame")
        .then((response) => {
          this.Allgame = response.data.data;

          this.$nextTick(function() {
            
             self.sentIdgame(response.data.data[0].id);
            var element = document.getElementById("game1");
            if(element){

              element.classList.add("game-select");
            }
          });
        });
    },
    sentIdgame(id) {
      // console.log(id);
      this.$emit("idgame", id);
    },
     next(k) {

     
      document.getElementById("main-carousel-allgame").getElementsByClassName("next")[k].click();
    },

    previous(k) {
      

      document.getElementById("main-carousel-allgame").getElementsByClassName("previous")[k].click();
    },
  },
};
</script>
