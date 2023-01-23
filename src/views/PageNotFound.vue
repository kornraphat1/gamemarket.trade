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
      this.$alert(
        "ไม่พบหน้าที่ค้นหา",
            "Error PageNotFound 404 ",
            "error"
          );
          setTimeout(() => {
            
            window.location.href = "/";
          }, 3000);
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
