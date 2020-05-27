<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="客户" prop="merchantId">
            <el-select
              v-model="formData.merchantId"
              placeholder="请选择客户.."
              style="width: 100%"
            >
              <el-option
                v-for="item in openList"
                :key="item.merchantId"
                :label="item.firm.firmName"
                :value="item.merchantId"
              ></el-option>
            </el-select>
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
        @click="$emit('onSearch', formData)"
      >查询
      </el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        more: false,
        formData: {
          merchantId: ""
        },
        openList: []
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
      handleMore() {
        this.more = !this.more;
      },
      //加载平台信息
      loadMerchants() {
        this.$store
          .dispatch("firmMerchant/getList", {
            filter: {merchantType: 0}
          })
          .then(data => {
            this.openList = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    created() {
      this.loadMerchants();
    }
  };

</script>

<style scoped>
</style>
