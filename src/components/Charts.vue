/* eslint-disable */
<template>
  <div>
    <ve-bar 
        :data="chartData" 
        :settings="chartSettings" 
        :extend="chartExtend" 
        :legend-visible="false"
        :toolbox="toolbox"
    >
    </ve-bar>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Charts",
    data() {
      return {
        colorList: [],
        chartSettings: {},
        chartExtend: {
          legend () {
            return {
              show: false,
              textStyle: {
                color: 'white'
              }
            }
          }
        },
        toolbox: {
          feature: {
            magicType: {
              type: ['line', 'bar', 'pie']
            },
            saveAsImage: {}
          }
        },
        chartData: {
          columns: ['item', 'value'],
          rows: []
        }
      };
    },
    created () {
      let _this = this;
      axios.get('data/colorList.json').then((response)=>{
        _this.colorList = response.data;
      });
      setTimeout(() => {
        axios.get('data/abilities.json').then((response)=>{
          _this.chartData.rows = response.data;
        });
      }, 100);
    },
    mounted () {
      let _this = this;
      setTimeout(() => {
        _this.chartSettings = {
          offsetY: 0,
          xAxisType: ['percent'],
          digit: 2,
          labelLine: {
            show: true
          },
          itemStyle: {
            normal: {
              color: (params) => {
                return _this.colorList[params.dataIndex]
              }
            }
          }
        }
      }, 100);
    }
  };

</script>
