<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight + 133 + 'px', background: 'whitesmoke', padding: '10px'}">
    <van-card
      v-for="item in gridData" 
      :key="item.name"
      @click.native="handleOpenModal(item)"
      :thumb="publicPath + 'portfolio/' + item.name + '.svg'"
      :desc="$t(item.desc)"
      :title="$t(item.title)"
      style="text-align:left;background:white"
    >
      <div slot="tags">
        <van-tag plain type="primary" v-for="tag in item.tags" :key="tag" style="margin:0px 2px 2px 0px;">
          {{tag}}
        </van-tag>
      </div>
    </van-card>
    <!-- <van-grid :column-num="2" :gutter="10">
      <van-grid-item
        v-for="item in gridData" 
        :key="item.name"
        @click.native="handleOpenModal(item)"
      >
        <van-image width="50px" height="50px" :src="publicPath + 'portfolio/' + item.name + '.svg'" />
        <div class="van-multi-ellipsis--l2" style="margin-top:10px; font-size:12px;">{{$t(item.title)}}</div>
      </van-grid-item>
    </van-grid> -->
    <van-image-preview
      v-model="modal.show"
      :images="modal.images"
      @change="onChangeImages"
      show-indicators
    >
      <template v-slot:cover style="color:red">4352542542</template>
      <template v-slot:index>{{ modal.index + 1 }}/{{modal.images.length}}</template>
    </van-image-preview>
  </div>
</template>
<script>
  import portfolioData from "@/lib/portfolioData.js";
  import Vue from 'vue';
  import { ImagePreview } from 'vant';
  Vue.use(ImagePreview);
  export default {
    name: "portfolioMobile",
    data() {
      return {
        contentHeight: 690,
        publicPath: process.env.BASE_URL,
        gridData: null,
        modal: {
          index: 0,
          show: false,
          images: []
        }
      }
    },
    watch: {
      contentHeight(val) {
        if (!this.timer) {
          this.contentHeight = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.timer = false;
          }, 400);
        }
      }
    },
    methods: {
      handleOpenModal (item) {
        console.log(item);
        let imageArray = [];
        for (let i=0; i<item.length; i++) {
          imageArray[i] = this.publicPath + 'portfolio/' + item.name + '/' + (i+1) + '.png'
        }
        this.modal.images = imageArray;
        this.modal.show = true;
      },
      onChangeImages (index) {
        this.modal.index = index;
      }
    },
    mounted() {
      let _this = this;
      this.contentHeight = this.$util.resizeTable();
      window.onresize = () => {
        return (() => {
          _this.contentHeight = _this.$util.resizeTable();
        })();
      };
      this.gridData = portfolioData;
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  }

</script>
<style lang="css">
.van-image {
  padding:15px;
}
</style>