<template>
  <div>
    <div class="main-vertify-container">
      <div class="main-vertify">
        <div class="vertify-content" id="vertify-input">
          <div class="vertify-header">
            <span>สมัครสมาชิก</span>
          </div>

          <div class="vertify-input">
          <div class="title">เบอร์โทรศัพท์</div>
            <input
              class="inputTel"
              type="text"
              placeholder="กรุณาใส่เบอร์โทรศัพท์"
              v-model="tel"
              @keypress="clsNumberOnly($event)"
              maxlength="10"
            />
            <div class="vertify-button">
              <button v-on:click="telnext()">ถัดไป</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      step: 1,
    };
  },

  mounted() {},

  methods: {
    clsNumberOnly(e) {
      var regex = new RegExp("^[0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        return true;
      }

      e.preventDefault();
      return false;
    },
    telnext() {
      console.log(this.tel);
    },
  },
  watch: {
    // tel() {
    //   if (this.tel.length == 3) {
    //     this.tel = this.tel + "-";
    //   }
    // },
  },
  computed: {},
};
</script>
