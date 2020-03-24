<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="选择企业：">
            <el-select v-model="formData.firmId" placeholder="请选择">
              <el-option
                v-for="item in firmList"
                :key="item.firmId"
                :label="item.firmName"
                :value="item.firmId"
                style="width:100%"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <!-- <el-button type="primary" @click="$emit('onSearch',firmId)">查询</el-button>
      <el-button type="primary" @click="$emit('onAdd')">添加</el-button>-->
    </el-col>

    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
        size="mini"
        @click="$emit('onSearch', formData)"
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
  name: "productMarkSearch",
  data() {
    return {
      more: false,
      formData:{
      firmId: "",
      },
      firmList: []
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
    loadFirms() {
      this.$store
        .dispatch("productMark/getFirmList")
        .then(data => {
          this.firmList = data;
          // console.log(this.firmList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleMore() {
      this.more = !this.more;
    }
  },
  mounted() {
    this.loadFirms();
  }
};
</script>
