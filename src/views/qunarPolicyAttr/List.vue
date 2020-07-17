<template>
  <div class="page">
    <el-row class="page-tools" style="margin-bottom:15px;">
      <el-button type="warning" @click="goBack" size="mini">返回</el-button>
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      <!--      <search class="page-search" ref="search" @onSearch="onSearch"/>-->
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      size="mini"
      :data="tableData"
      style="width: 100%;margin-bottom: 15px;"
    >
      <el-table-column prop="merchantName" label="客户" align="center" width="110"></el-table-column>
      <el-table-column prop="merchantDomain" label="客户域名" align="center" width="110"></el-table-column>
      <el-table-column prop="schedulerName" label="调度任务" width="110" align="center"></el-table-column>
      <el-table-column prop="name" label="属性名称" align="center" width="120"></el-table-column>
      <el-table-column prop="code" label="属性编码" align="center" width="110"></el-table-column>
      <el-table-column prop="group" label="属性分组" align="center" width="110"></el-table-column>
      <el-table-column prop="valueType" label="数据类型" align="center" width="110">
        <template slot-scope="scope">
          <span v-html="formatValueType(scope.row.valueType)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="默认值" align="center" width="110"></el-table-column>
      <el-table-column prop="required" label="是否必填" align="center" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.required">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="readonly" label="是否只读" align="center" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.readonly">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="disabled" label="是否禁用" align="center" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.disabled">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="计量单位" align="center" width="70"></el-table-column>
      <el-table-column prop="description" label="描述" align="center" width="150"></el-table-column>
      <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="onDel(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
    <el-dialog
      :title="isEdit?'编辑政策接口参数信息':'添加政策接口参数信息'"
      :visible.sync="dialogVisible"
      center
      width="55%"
    >
      <edit
        v-if="dialogVisible"
        :merchant-id="merchantId"
        :merchant-domain="merchantDomain"
        :attrId="attrId"
        @onSave="handleSave"
        @onCancel="handleCancel"
      ></edit>
    </el-dialog>
  </div>
</template>

<script>
  import edit from "./Edit.vue";
  // import search from "./Search.vue"

  export default {
    name: "List",
    data() {
      return {
        rootNav: false,
        loading: false,
        lastId: "",
        pageFlag: "1",
        pageSize: 10,
        total: 0,
        dialogVisible: false,
        attrId: '',
        tableData: [],
        parentNode: {},
        isEdit: false,
        curNode: {},
        update: false,
        merchantId: '',
        valueTypes: [
          {
            value: 0,
            label: '文本'
          },
          {
            value: 1,
            label: '开关'
          },
          {
            value: 2,
            label: '数字'
          },
          {
            value: 3,
            label: '日期'
          },
          {
            value: 4,
            label: '日期时间'
          },
          {
            value: 5,
            label: '时间'
          },
          {
            value: 6,
            label: '评分'
          },
          {
            value: 7,
            label: '单选'
          },
          {
            value: 8,
            label: '多选'
          },
          {
            value: 9,
            label: '选择器'
          }
        ],
      };
    },
    methods: {
      goBack() {
        if (this.$router.history.length <= 1) {
          this.$router.push({path: '/home'});
          return false;
        } else {
          this.$router.go(-1);
        }
      },
      loadData(params = {}) {
        if (!params) {
          params = {};
        }
        params.merchantId = this.merchantId;
        this.$store
          .dispatch("qunarPolicyAttr/getTotal", params)
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("qunarPolicyAttr/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data) {
              this.tableData = data;
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      prevClick() {
        this.pageFlag = "-1";
        this.lastId = this.tableData[0].attrId;
        this.loadData();
      }
      ,
      nextClick() {
        this.pageFlag = "1";
        this.lastId = this.tableData[this.tableData.length - 1].attrId;
        this.loadData();
      },

      formatBoolean(row, column, cellValue) {
        var ret = ""; //你想在页面展示的值
        if (cellValue) {
          ret = "是"; //根据自己的需求设定
        } else {
          ret = "否";
        }
        return ret;
      },
      onSearch(params) {
        if (!params.merchantId) {
          params = {};
        }
        this.loadData(params);
      },
      handleAdd() {
        this.isEdit = false;
        this.update = false;
        this.attrId = "";
        this.dialogVisible = true;
      },
      handleSave() {
        this.dialogVisible = false;
      },
      handleCancel() {
        this.dialogVisible = false;
      },

      onEdit(row) {
        this.isEdit = true;
        this.attrId = row.attrId;
        this.dialogVisible = true;
      },
      onDel(row) {
        this.open(
          this.delete,
          row.attrId,
          "此操作将删除信息, 是否继续?"
        );
      },
      delete(attrId) {
        this.$store
          .dispatch("qunarPolicyAttr/removeOne", attrId)
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      open(func, data, message) {
        this.$confirm(message, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            func(data);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      formatValueType(value) {
        for (var i = 0; i < this.valueTypes.length; i++) {
          if (value == this.valueTypes[i].value) {
            return this.valueTypes[i].label;
          }
        }
      }
    },
    created() {
      this.merchantDomain = this.$route.query.domain;
      this.merchantId = this.$route.query.firmId;
      this.loadData();
    },
    components: {
      edit
    }
  };
</script>
