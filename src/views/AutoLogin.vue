<template>
  <div>
    <div class="bg-vertify">
      <div class="bg-b-vertify"></div>
    </div>

    <div class="vertify-main-content">
      <transition name="slide-fade">
        <div class="logo-vertify" v-if="show">
          <img src="@/assets/img/logo-vertify2.png" alt="" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      show: false,
      passwordFieldType: "password",
      username: "",
      password: "",
      Accesskey: this.$route.params.access_key,
      Username: this.$route.params.username,
      timestamp: this.$route.params.timestamp,
      Token: this.$route.params.token,
    };
  },

  mounted() {
    document.getElementById("footer-contener").style.display = "none";
    // document.getElementById("navbar").style.display = "none";
    // this.$route.params.access_key

    this.goLogin();

    this.show = true;
  },

  methods: {
    goLogin() {
      const self = this;
      var url = "";
      if (this.Token && this.Accesskey) {
        url =
          this.$API_URL +
          "/api/v1/autologin/" +
          this.Accesskey +
          "/" +
          this.Username +
          "/" +
          this.timestamp +
          "/" +
          this.Token;
        if (this.$route.params.item) {
          url =
            this.$API_URL +
            "/api/v1/autologin/" +
            this.Accesskey +
            "/" +
            this.Username +
            "/" +
            this.timestamp +
            "/" +
            this.Token +
            "/" +
            this.$route.params.item;
        }

        this.axios
          .get(url)
          .then((response) => {
            if (response.data.code == 0) {
              // console.log(response.data.token);/
              let D = new Date();
              D.setHours(D.getHours() + 1);

              // document.cookie = "token=" + response.data.token + ";" + D;
              this.$cookies.set("token_main", response.data.token, 60 * 60);
              this.$cookies.set("Accesskey", this.Accesskey, 24 * 60 * 60);
              this.$cookies.set("Username", this.Username, 24 * 60 * 60);
              this.$cookies.set("Token", this.Token, 24 * 60 * 60);

              this.$cookies.set(
                "track_status",
                response.data.track_status,
                24 * 60 * 60
              );
              this.$cookies.set("track", response.data.track, 24 * 60 * 60);
              this.token = this.$cookies.get("token_main");

              console.log(response.data.track);

              setTimeout(function() {
                if (this.$cookies.get("track_status") == "empty") {
                  self.goTrade();
                } else {
                  self.goTrade();
                }
              }, 1000);
            } else {
              self.$alert("กรุณาเข้าสู่เกมใหม่", "เกิดข้อผิดพลาด", "error");
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            // console.log(error.response.data);
            this.$alert("กรุณาเข้าสู่เกมใหม่", "เกิดข้อผิดพลาด", "error");
          });
      }
    },

    goHome() {
      window.location.href = "/";
    },
    goTrade() {
      window.location.href = "/Myitems";
    },

    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  watch: {},
  computed: {},
};
</script>
