<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航司">
            <el-input
              v-model="formData.airlineCode"
              placeholder="航司"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航班号">
            <el-input
              v-model="formData.flightCode"
              placeholder="航班号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="出发地三字码">
            <el-input
              v-model="formData.dpt"
              placeholder="出发地三字码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="出发机场三字码">
            <el-input
              v-model="formData.dptAirport"
              placeholder="出发机场三字码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="起飞时间">
            <el-time-select
              v-model="formData.dptTime"
              :picker-options="{
              start: '00:00',
              step: '00:05',
              end: '23:55'}"
              placeholder="起飞时间"
              style="width: 100%;">
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleSearch"
      >查询</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "userSearch",
        data() {
            return {
                more: false,
                formData: {}
            };
        },
        computed: {
            switchIcon() {
                if (!this.more) {
                    return "el-icon-arrow-down el-icon--right";
                } else {
                    return "el-icon-arrow-up el-icon--right";
                }
            }
        },
        methods: {
            defaultSearchFormData() {
                return {
                    //航司二字码
                    airlineCode: null,
                    //航班号
                    flightCode: null,
                    //出发地三字码
                    dpt: null,
                    //出发机场三字码
                    dptAirport: null,
                    //起飞时间
                    dptTime: null
                };
            },
            handleMore() {
                this.more = !this.more;
            },
            handleSearch() {
                if (this.formData.airlineCode) {
                    this.formData.airlineCode = this.formData.airlineCode.toUpperCase();
                }
                if (this.formData.flightCode) {
                    this.formData.flightCode = this.formData.flightCode.toUpperCase();
                }
                if (this.formData.dpt) {
                    this.formData.dpt = this.formData.dpt.toUpperCase();
                }
                if (this.formData.dptAirport) {
                    this.formData.dptAirport = this.formData.dptAirport.toUpperCase();
                }
                if (this.formData.dptTime)
                  this.formData.dptTime = this.formData.dptTime.replace(":","");
                this.$emit("onSearch", this.formData);
            }
        }
    };
</script>
