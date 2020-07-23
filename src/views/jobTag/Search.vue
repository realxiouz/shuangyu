<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标签类别:">
            <el-select
              v-model="formData.tagType"
              clearable
              placeholder="标签类别"
              style="width: 100%"
            >
              <el-option
                v-for="item in tagTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标签编码:">
            <el-input
              clearable
              placeholder="请输入标签编码..."
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.tagCode"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标签名称:">
            <el-input
              clearable
              placeholder="请输入标签名称..."
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.tagName"
            ></el-input>
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
      >查询
      </el-button>
      <el-button
        icon="el-icon-refresh"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleClear"
      >清空</el-button>
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
          tagType: null,
          tagCode: null,
          tagName: null
        },
        tagTypes:[
          {
            label:"工厂",
            value:1
          },
          {
            label:"政策",
            value:2
          },
          {
            label:"其他",
            value:9
          }
        ]
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
      initSearchForm() {
        return {
          tagType: null,
          tagCode: null,
          tagName: null
        };
      },
      onSearch() {
        this.$emit("onSearch", this.formData);
      },
      handleClear() {
        this.formData = this.initSearchForm();
        this.onSearch();
      },
      handleMore() {
        this.more = !this.more;
      }
    }
  };
</script>
