<template>
  <div style="width:100%;height:100%;">
    <div :id="id" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  props: ["id", "dataGallery", "top"],
  data() {
    return {
      gallery: this.dataGallery
    };
  },
  methods: {
    initGallery(dataGallery) {
      var myChart = this.$echarts.init(document.getElementById(this.id));

      var charts = {
        unit: "（单位：%）",
        names: dataGallery.names,
        lineX: dataGallery.X,
        value: dataGallery.Y
      };
      var color = dataGallery.color;
      var lineY = [];

      for (var i = 0; i < charts.names.length; i++) {
        var x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        var data = {
          name: charts.names[i].name,
          type: "line",
          smooth: true,
          smoothMonotone: "x",
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[x] + ", 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: color[x] + ", 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          symbol: "line",
          symbolSize: 1,
          data: charts.value[i],
          lineStyle: {
            color: color[x] + ")"
          },
          label: {
            show: true,
            position: "top",
            color: color[x] + ")"
          },
          itemStyle: {
            color: color[x] + ")"
          }
        };
        lineY.push(data);
      }

      lineY[0].markLine = {
        silent: true
      };
      var option = {
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: 9,
            color: "#fff",
            padding: [2, 18]
          },
          right: 11,
          top: this.top ? this.top : 11,
          itemGap: -25
        },
        grid: {
          top: "24%",
          left: "5%",
          right: "4%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          // min: function(value) {
          //   return value.min - 0.5;
          // },
          // max: function(value) {
          //   return value.max;
          // },
          show: true,
          type: "category",
          boundaryGap: true,
          data: charts.lineX,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 10
            },
            //   formatter: "{value}",
            interval: 0
          },
          splitLine: {
            show: false
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "rgb(0,253,255,0.6)"
            }
          }
        },
        yAxis: {
          name: charts.unit,
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgb(0,253,255,0.6)"
            }
          },
          nameTextStyle: {
            color: "#fff",
            padding: 5,
            fontSize: 10
          }
        },
        series: lineY
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    if (this.dataGallery.X[0].split(" ").length > 1) {
      this.dataGallery.X.forEach((e, i) => {
        let arr = this.dataGallery.X[i].split(" ");
        arr = arr.map(element => {
          return element + "\n";
        });
        this.dataGallery.X[i] = arr.join("");
      });
    }
    this.initGallery(this.dataGallery);
  },
  watch: {
    "gallery.Y"() {
      this.initGallery(this.dataGallery);
    }
  }
};
</script>