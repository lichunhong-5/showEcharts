<template>
  <div style="width: 100%;height:100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  props: ["id", "stackCompare", "top", "bottom"],
  data() {
    return {
      stack: this.stackCompare
    };
  },
  mounted() {
    this.initStack(this.stack);
  },
  methods: {
    initStack(stack) {
      var myChart = this.$echarts.init(document.getElementById(this.id));
      var series = [];
      for (let i = 1; i < stack.names.length; i++) {
        let obj = {
          type: "bar",
          itemStyle: {
            color: stack.colors[i]
          },
          label: {
            show: true,
            position: "top",
            color: "#fff",
            fontSize: 10
          }
        };
        series.push(obj);
      }
      // 指定图表的配置项和数据
      var option = {
        legend: {
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          top: "15%",
          left: "2%",
          right: "2%",
          bottom: "2%",
          height: "auto",
          containLabel: true
        },
        dataset: {
          dimensions: stack.names,
          source: stack.X
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#06999E"
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 10
            },
            rotate: 45
          }
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#06999E"
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          }
        },
        series: series
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option,true);
    }
  },
  watch: {
    stack: {
      deep: true,
      handler: function() {
        setTimeout(() => {
          this.initStack(this.stack);
        }, 0);
      }
    }
    // "stack.X"() {
    //   this.initStack(this.stack);
    // },
    // "stack.names"() {
    //   this.initStack(this.stack);
    // }
  }
};
</script>