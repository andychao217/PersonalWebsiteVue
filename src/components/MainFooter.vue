<template>
  <div>
    <div style="float:left">
      <a target="_blank" href="http://beian.miit.gov.cn/">
        湘ICP备17005934号, 湘ICP备17005934号-1
      </a>
      <a target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43012102000324">
        <img :src="imgUrl" /> 湘公网安备 43012102000324号
      </a>
    </div>
    <div style="float:right;font-size:18px;">
      <a-tooltip placement="top">
        <template slot="title">
          <a target="_blank" href="https://github.com/andychao217/">
            https://github.com/andychao217
          </a>
        </template>
        <a target="_blank" href="https://github.com/andychao217">
          <a-icon type="github" theme="filled" />
        </a>
      </a-tooltip>
      <a-tooltip placement="top">
        <template slot="title">
          <a target="_blank" href="https://www.linkedin.com/in/andy-chao-6423583a/">
            https://www.linkedin.com/in/andy-chao-6423583a/
          </a>
        </template>
        <a target="_blank" href="https://www.linkedin.com/in/andy-chao-6423583a/">
          <a-icon type="linkedin" theme="filled" />
        </a>
      </a-tooltip>
      <a-tooltip placement="top">
        <template slot="title">
          <a target="_blank" href="http://weibo.com/andychao217">
            http://weibo.com/andychao217
          </a>
        </template>
        <a target="_blank" href="http://weibo.com/andychao217">
          <a-icon type="weibo-circle" theme="filled" />
        </a>
      </a-tooltip>
      <a-tooltip placement="top">
        <template slot="title">
          <img :src="wxImgUrl" style="width:150px;">
        </template>
        <a>
          <a-icon type="wechat" theme="filled" />
        </a>
      </a-tooltip>
      <a-tooltip placement="top">
        <template slot="title">
          <a href="tel:+8613548691522">
            Tel:+8613548691522
          </a>
        </template>
        <a href="tel:+8613548691522">
          <a-icon type="phone" theme="filled" />
        </a>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
  import weixinPic from "@/assets/weixin.jpg";
  import baianPic from "@/assets/beian.png";
  export default {
    name: 'MainFooter',
    data() {
      return {
        imgUrl: baianPic,
        wxImgUrl: weixinPic
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    margin-right: 5px;
  }

</style>
