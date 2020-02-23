<template>
  <div style="width: 100%;height:100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  props: ["id", "gradientData"],
  methods: {
    initGradient(gradientData) {
      var myChart = this.$echarts.init(document.getElementById(this.id));

      // 指定图表的配置项和数据
      var dataAxis = gradientData.X;
      var data = gradientData.Y;

      var option = {
        barWidth: 5,
        grid: {
          left: "5%",
          right: "4%",
          top: "15%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: dataAxis,
          axisTick: {
            show: true,
            lineStyle: {
              color: gradientData.colors[0]
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: gradientData.colors[0]
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 10
            },
            rotate: 45
          },
          z: 10
        },
        yAxis: {
          splitNumber: 9,
          axisLine: {
            show: true,
            lineStyle: {
              color: gradientData.colors[0]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: gradientData.colors[0]
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            barCategoryGap: "40%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: gradientData.colors[1] },
                  { offset: 1, color: gradientData.colors[2] }
                ]),
                barBorderRadius: [100, 100, 0, 0]
              }
            },
            data: data,
            label: {
              show: true,
              position: "top",
              color: "#fff",
              fontSize: 10
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.initGradient(this.gradientData);
  },
  watch: {
    "gradientData.X"() {
      this.initGradient(this.gradientData);
    },
    "gradientData.Y"() {
      this.initGradient(this.gradientData);
    }
  }
};
</script>