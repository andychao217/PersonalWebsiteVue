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
          rows: [
            {
              'item': 'HTML',
              'value': 0.95
            },
            {
              'item': 'JavaScript',
              'value': 0.85
            },
            {
              'item': 'CSS',
              'value': 0.80
            },
            {
              'item': 'jQuery',
              'value': 0.90
            },
            {
              'item': 'Vue.js',
              'value': 0.90
            },
            {
              'item': 'php',
              'value': 0.80
            },
            {
              'item': 'Go',
              'value': 0.60
            },
            {
              'item': 'Electron',
              'value': 0.60
            },
            {
              'item': 'Node.js',
              'value': 0.70
            },
            {
              'item': 'Wechat',
              'value': 0.80
            },
            {
              'item': 'Qt',
              'value': 0.80
            },
            {
              'item': 'C++',
              'value': 0.70
            },
            {
              'item': 'Python',
              'value': 0.70
            }
          ]
        }
      };
    },
    created () {
      axios.get('data/colorList.json').then((response)=>{
        this.colorList = response.data;
      });
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
