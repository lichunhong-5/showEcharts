<template>
  <div class="Sudoku">
    <Title @goBack="goBack" title="九宫格">
      <div class="select-btn">
        <el-select @change="changeRegion" v-model="region" multiple placeholder="全部区域">
          <el-option
            v-for="item in regionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select
          v-model="com"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="全部公司"
        >
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="pos"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="全部职能"
        >
          <el-option
            v-for="item in posOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="promotion" collapse-tags style="margin-left: 20px;" placeholder="是否晋升">
          <el-option
            v-for="item in promotionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div
          :class="[btn.name === active?'active':'']"
          class="btn"
          v-for="btn in btns"
          @click="filter(btn)"
        >{{btn.name}}</div>
      </div>
    </Title>

    <div class="content">
      <div class="t">绩效评估</div>
      <div class="row">
        <div class="col-5">
          <div class="col-33">
            <p>高</p>
            <p>(A/B+)</p>
          </div>
          <div class="col-33">中(B)</div>
          <div class="col-33">
            <p>低</p>
            <p>(B-/C)</p>
          </div>
        </div>
        <div class="col-90">
          <div class="col-33 A">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.A" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.A&&showInfo.A.length > 0">{{showInfo.A.length}}人</p>
          </div>

          <div class="col-33 B">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.B" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.B&&showInfo.B.length > 0">{{showInfo.B.length}}人</p>
          </div>
          <div class="col-33 C">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.C" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>
            <p v-if="showInfo.C&&showInfo.C.length >= 0">{{showInfo.C.length}}人</p>
          </div>
          <div class="col-33 D">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.D" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.D&&showInfo.D.length >= 0">{{showInfo.D.length}}人</p>
          </div>
          <div class="col-33 E">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.E" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.E&&showInfo.E.length >= 0">{{showInfo.E.length}}人</p>
          </div>
          <div class="col-33 F">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.F" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.F&&showInfo.F.length >= 0">{{showInfo.F.length}}人</p>
          </div>
          <div class="col-33 G">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.G" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.G&&showInfo.G.length >= 0">{{showInfo.G.length}}人</p>
          </div>
          <div class="col-33 H">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.H" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.H&&showInfo.H.length >= 0">{{showInfo.H.length}}人</p>
          </div>
          <div class="col-33 I">
            <div class="div">
              <div class="person" v-for="(item,index) in showInfo.I" :key="index">
                <!-- <img src="@/assets/images/grade/no_headimg.png" alt /> -->
                 <img :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')" alt="">
                <div>{{item.staffName}}</div>
              </div>
            </div>

            <p v-if="showInfo.I&&showInfo.I.length >= 0">{{showInfo.I.length}}人</p>
          </div>
        </div>
        <div class="col-5 x">
          <p>文化</p>
          <p>评估</p>
        </div>
      </div>
      <div class="desc">
        <div class="col-33">低</div>
        <div class="col-33">中</div>
        <div class="col-33">高</div>
      </div>
    </div>
    <goIndex></goIndex>
  </div>
</template>

<script>
import "./Sudoku.scss";
import Title from "@/components/Title/Title";
import { Select, Option } from "element-ui";
import GradientColor from "@/components/tables/GradientColor";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    Title,
    elSelect: Select,
    elOption: Option,
    goIndex
  },
  data() {
    return {
      height: "",
      active: "",
      btns: [{ name: "确认", active: false }, { name: "重置", active: false }],
      regionOptions: [],
      comOptions: [],
      posOptions: [],
      region: [],
      com: [],
      pos: [],
      promotionOptions: [
        { label: "是", value: true },
        { label: "否", value: false }
      ],
      promotion: "",
      showInfo: {}
    };
  },
  methods: {
    changeRegion() {
      this.comOptions = [];
      this.com = [];
      this.$http
        .get("/company/queryForArea", { "areaIds[]": this.region.join(",") })
        .then(response => {
          response.forEach((element, i) => {
            element.label = element.companyName;
            element.value = element.id;
            this.comOptions.push(element);
          });
        })
        .catch(error => {
          alert(error.message);
        });
    },
    goBack() {
      this.$router.push({
        name: "chooseInfo"
      });
    },
    filter(btn) {
      this.active = btn.name;
      if (btn.name === "确认") {
        if (
          this.com.length > 0 ||
          this.region.length > 0 ||
          this.pos.length > 0 ||
          this.promotion !== ""
        ) {
          let para = {
            "companyIds[]": this.com.join(","),
            "areaIds[]": this.region.join(","),
            "positionIds[]": this.pos.join(","),
            isPromote: this.promotion
          };
          this.$http
            .get("/companyperformancedata/selectAllSudoku", para)
            .then(response => {
              this.showInfo = response;
            })
            .catch(error => {
              alert(error.message);
            });
        }
      } else {
        this.changeRegion();
        this.com = [];
        this.region = [];
        this.pos = [];
        this.promotion = "";
        this.getData();
      }
    },
    getData() {
      const para = {
        "areaIds[]": "",
        "companyIds[]": "",
        "positionIds[]": "",
        isPromote: ''
      };
      //查九宫格
      this.$http
        .get("/companyperformancedata/selectAllSudoku", para)
        .then(response => {
          this.showInfo = response;
        })
        .catch(error => {
          alert(error.message);
        });
    }
  },
  created() {
    this.getData();
    //查区域
    this.$http
      .get("/area/selectPerformanceArea", { subdataShow: true })
      .then(response => {
        response.forEach((element, i) => {
          element.label = element.areaName;
          element.value = element.id;
          this.regionOptions.push(element);
        });
      })
      .catch(error => {
        alert(error.message);
      });
    //查职能
    this.$http
      .get("/position/selectPosition", { "positionIds[]": "" })
      .then(response => {
        response.forEach((element, i) => {
          element.label = element.positionName;
          element.value = element.id;
          this.posOptions.push(element);
        });
      })
      .catch(error => {
        alert(error.message);
      });
    //查公司
    this.$http
      .get("/company/queryForArea", { "areaIds[]": "" })
      .then(response => {
        response.forEach((element, i) => {
          element.label = element.companyName;
          element.value = element.id;
          this.comOptions.push(element);
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
};
</script>