<template>
  <div class="contentBox">
    <el-row style="margin-bottom:15px;">
      <el-button type="warning" @click="goBack" size="mini">返回</el-button>
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
<!--      <param-search @onSearch="handleSearch"></param-search>-->
    </el-row>
    <el-table
      v-loading="loading"
      size="mini"
      :data="tableData"
      style="width: 100%;margin-bottom: 15px;"
    >
      <el-table-column prop="merchantName" label="客户" align="center" width="150"></el-table-column>
      <el-table-column prop="merchantDomain" label="客户域名" align="center" width="220"></el-table-column>
      <el-table-column prop="schedulerName" label="调度任务" width="300" align="center"></el-table-column>
      <el-table-column prop="paramName" label="参数名称" align="center" width="220"></el-table-column>
      <el-table-column prop="paramCode" label="参数编码" align="center"></el-table-column>
      <el-table-column
        prop="required"
        label="是否必填"
        :formatter="formatBoolean"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column prop="unit" label="计量单位" align="center" width="150"></el-table-column>
      <el-table-column prop="defaultValue" label="默认值" align="center" width="150"></el-table-column>
      <el-table-column prop="description" label="描述" align="center" width="150"></el-table-column>

      <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" width="300"
                       align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
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
      width="40%"
    >
      <param-edit
        v-if="dialogVisible"
        :merchantId="merchantId"
        :attrId="attrId"
        @onSave="handleSave"
        @onCancel="handleCancel"
      ></param-edit>
    </el-dialog>
  </div>
</template>

<script>
  import paramEdit from "./Edit.vue";
  // import paramSearch from "./Search.vue"

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
        merchantId: ''
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
      handleSearch(params) {
        if (!params.merchantId) {
          params = {};
        }
        this.loadData(params);
      },
      handleAdd() {
        this.isEdit = false;
        this.dialogVisible = true;
        this.update = false;
        this.attrId = "";
      },
      handleSave(formData) {
        formData.merchantId = this.merchantId;
        formData.merchantDomain = this.merchantDomain;
        debugger
        this.$store
          .dispatch("qunarPolicyAttr/save", formData)
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });

        this.dialogVisible = false;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleAddChild(row) {
        this.isEdit = false;
        this.rootNav = false;
        this.dialogVisible = true;
        this.attrId = "";
        this.parentNode = {};
        this.parentNode.attrId = row.attrId;
        this.parentNode.level = row.level;
      },
      handleEdit(row) {
        this.isEdit = true;
        this.dialogVisible = true;
        this.attrId = row.attrId;
      },
      /*对员工进行删除*/
      handleDelete(row) {
        this.open(
          this.delete,
          row.attrId,
          "此操作将删除该用户的所有信息, 是否继续?"
        );
      },
      /*根据用户ID删除用户*/
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
      }
    },
    created() {
      this.merchantDomain = this.$route.query.domain;
      this.merchantId = this.$route.query.firmId;
      this.loadData();
    },
    components: {
      paramEdit
    }
  };
</script>
