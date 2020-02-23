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
      console.log("lll", stack.names.length);

      for (let i = 0; i < stack.names.length; i++) {
        let obj = {
          name: stack.names[i],
          type: "bar",
          data: stack.X[i],
          itemStyle: {
            color: stack.colors[i],
            emphasis: {
              color: stack.colors[i]
            }
          },
          label: {
            normal: {
              show: true,
              position: "right"
            }
          }
        };
        series.push(obj);
      }
      console.log("ser", series.length);
      // 指定图表的配置项和数据
      var option = {
        legend: {
          data: stack.names,
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          //   boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: stack.Y,
          axisLabel: {
            show: true,
            color: "#fff",
            margin: 20
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#06999E"
            }
          }
        },
        series: series
      };
      console.log(option.series);
      
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option,true);
    }
  },
  watch: {
    // "stack.X"() {
    //   this.initStack(this.stack);
    // },
    stack: {
      deep: true,
      handler: function() {
        console.log(77);
        console.log("this", this);

        setTimeout(() => {
          this.initStack(this.stack);
        }, 0);
      }
    }
    // "stack.names"() {
    //   this.initStack(this.stack);
    // }
  }
};
</script>