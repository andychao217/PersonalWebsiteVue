<template>
  <div style="font-size:10px;padding:20px 0px;">
    <a target="_blank" href="http://beian.miit.gov.cn/" style="color:gray;">
      湘ICP备17005934号, 湘ICP备17005934号-1
    </a>
    <br>
    <a target="_blank"
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43012102000324"
      style="color:gray;"
    >
      <img :src="imgUrl" style="height:12px;"/> 湘公网安备 43012102000324号
    </a>
  </div>
</template>

<script>
  import baianPic from "@/assets/beian.png";
  export default {
    name: 'MainFooter',
    data() {
      return {
        imgUrl: baianPic
      }
    }
  }

</script>