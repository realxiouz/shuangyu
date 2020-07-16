<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航司">
            <el-input clearable v-model="formData.airlineCode" placeholder="航司"></el-input>
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
        @click="onSearch"
      >查询</el-button>
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
        airlineCode: null
      };
    },
    handleMore() {
      this.more = !this.more;
    },
    onSearch() {
      if (this.formData.airlineCode && "" !== this.formData.airlineCode) {
        this.formData.airlineCode = this.formData.airlineCode.toUpperCase();
      } else {
        this.formData.airlineCode = null;
      }
      if (this.formData.flightCode && "" !== this.formData.flightCode) {
        this.formData.flightCode = this.formData.flightCode.toUpperCase();
      } else {
        this.formData.flightCode = null;
      }
      if (this.formData.dpt && "" !== this.formData.dpt) {
        this.formData.dpt = this.formData.dpt.toUpperCase();
      } else {
        this.formData.dpt = null;
      }
      if (this.formData.dptAirport && "" !== this.formData.dptAirport) {
        this.formData.dptAirport = this.formData.dptAirport.toUpperCase();
      } else {
        this.formData.dptAirport = null;
      }
      if (this.formData.dptTime && "" !== this.formData.dptTime)
        this.formData.dptTime = this.formData.dptTime.replace(":", "");
      else this.formData.dptTime = null;

      this.$emit("onSearch", this.formData);
    }
  }
};
</script>
