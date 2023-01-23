<template>
  <div>
    
      <Closeapp v-if="APP_CLOSE==1"></Closeapp>
    

    <div v-else>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous"
      />

      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <router-view></router-view>
      </main>

      <div class="footer-contener" id="footer-contener">
        <!--<div class="footer-partner">
        <h4>
          Partner
        </h4>
        <div class="partner-list">
          <div class="partner-detail">
            <div class="partner-detail-d"></div>
          </div>
        </div>
      </div>-->
        <div class="footer-contact row">
          <a class="navbar-brand" style="display: flex;  margin: 0px;" href="#">
            <img
            style=" max-width: 100%; "
              src="@/assets/img/logo2.png"
              class="d-inline-block align-top logo"
              alt=""
            />
          </a>
          <p style="margin: 0px;" >© 2021 GameMarket. All rights reserved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Closeapp from "./components/Closeapp";

export default {
  data() {
    return {
      APP_CLOSE: process.env.VUE_APP_CLOSE,
    };
  },
   metaInfo: {
    meta: [
      { name: 'google', content: 'notranslate' }
    ]
  },
  components: {
    Navbar,Closeapp
  },

  mounted() {
    console.log(process.env.VUE_APP_CLOSE);
    const html = document.documentElement // returns the html tag
    html.setAttribute('lang', 'en')
    html.setAttribute('class', 'notranslate')
    html.setAttribute('translate', 'no')
    // setInterval(this.checkToken(), 1000 * 2000);
    
  },
  methods: {},
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
