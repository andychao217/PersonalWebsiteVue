<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px'}">
    <a-row :gutter="10">
      <a-col v-for="item in gridData" :key="item.name" span="6" style="margin-bottom:10px;">
        <a-popover :title="$t(item.title)">
          <template slot="content">
            <p>{{$t(item.desc)}}</p>
          </template>
          <a-card hoverable @click.native="handleOpenModal(item)" style="height:215px;overflow:hidden;">
            <img width="80" height="80" :src="publicPath + 'portfolio/' + item.name + '.svg'"
                slot="cover" style="margin-top:10px;padding:10px;" />
            <a-card-meta :title="$t(item.title)">
              <template slot="description">
                <a-tag color="blue" v-for="tag in item.tags" :key="tag" style="margin:0px 2px 2px 0px;">
                  {{tag}}
                </a-tag>
              </template>
            </a-card-meta>
          </a-card>
        </a-popover>
      </a-col>
    </a-row>
    <a-modal v-model="modal.show" :title="modal.title" :footer="null" :width="modalPicWidth"
      :bodyStyle="{padding: '0', height:'540px'}">
      <a-carousel arrows>
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px; z-index: 1;">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        <div v-for="i in modal.item.length" :key="i">
          <img :style="{width: modalPicWidth, height: '540px'}"
            :src="publicPath + 'portfolio/' + modal.item.name + '/' + i + '.png'">
        </div>
      </a-carousel>
    </a-modal>
  </div>
</template>
<script>
  import Bus from '@/lib/bus';
  import axios from "axios";
  export default {
    name: "portfolio",
    data() {
      return {
        contentHeight: 690,
        publicPath: process.env.BASE_URL,
        gridData: null,
        modal: {
          show: false,
          title: "",
          item: {
            name: "",
            title: "",
            desc: "",
            length: 0
          }
        }
      }
    },
    computed: {
      modalPicWidth() {
        if (this.modal.item.name === 'mini') {
          return '300px';
        } else {
          return '960px';
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
      handleOpenModal(item) {
        this.modal.title = this.$t(item.title) + " (" + this.$t(item.desc) + ")";
        this.modal.item = item;
        setTimeout(() => {
          this.modal.show = true;
        }, 100);
      }
    },
    created () {
      axios.get('data/portfolioData.json').then((response)=>{
        this.gridData = response.data;
      });
    },
    mounted() {
      let _this = this;
      this.contentHeight = this.$util.resizeTable();
      window.onresize = () => {
        if (window.innerWidth < 938) {
          Bus.$emit('handleSidebarControl', true);
        } else if (window.innerWidth) {
          Bus.$emit('handleSidebarControl', false);
        }
        return (() => {
          _this.contentHeight = _this.$util.resizeTable();
        })()
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  }

</script>
<style scoped>
  /* For demo */
  .ant-carousel>>>.slick-slide {
    text-align: center;
    overflow: hidden;
  }

  .ant-carousel>>>.custom-slick-arrow {
    width: 36px;
    height: 36px;
    font-size: 36px;
    color: rgb(221, 126, 18);
    background-color: rgba(31, 45, 61, 0);
    opacity: 1;
  }

  .ant-carousel>>>.custom-slick-arrow:before {
    display: none;
  }

  .ant-carousel>>>.custom-slick-arrow:hover {
    opacity: 0.5;
  }

</style>
