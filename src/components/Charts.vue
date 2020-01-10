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
  export default {
    name: "Charts",
    data() {
      return {
        chartSettings: {
            offsetY: 0,
            xAxisType: ['percent'],
            digit: 2,
            labelLine: {
                show: true
            },
            itemStyle: {
                normal: {
                    color: (params) => {
                        var colorList = [
                            '#c12e34', 
                            '#e6b600', 
                            '#0098d9', 
                            '#2b821d', 
                            '#005eaa', 
                            '#339ca8',
                            '#cda819',
                            '#2ec7c9',
                            '#b6a2de',
                            '#5ab1ef',
                            '#ffb980',
                            '#d87a80',
                            '#8d98b3'
                        ]
                        return colorList[params.dataIndex]
                    }
                }
            }
        },
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
          rows: [{
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
    }
  };

</script>
