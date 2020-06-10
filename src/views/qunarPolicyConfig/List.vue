<template>
  <div class="bigBox">
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:15px;">
        <el-button type="warning" @click="goBack" size="mini">返回</el-button>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        size="mini"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
      >
        <el-table-column prop="merchantName" label="客户" width="250" align="center"></el-table-column>
        <el-table-column prop="merchantDomain" label="客户域名" width="250" align="center"></el-table-column>
        <el-table-column prop="user" label="用户名" align="center"  width="250"></el-table-column>
        <el-table-column prop="ip" label="IP" align="center" width="250"></el-table-column>
        <el-table-column prop="callbackUrl" label="回调地址" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="250">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row,scope.$index)" type="danger" size="small">删除</el-button>
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
      <el-dialog :title="configId?'编辑配置信息':'添加新角色'" center :visible.sync="dialogVisible" width="30%">
        <config-edit v-if="dialogVisible" :configId="configId" @onSave="handleSave"
                     @onCancel="handleCancel"></config-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import configEdit from "./Edit.vue"

  function defaultData() {
    return {
      configId: "",
    };
  }

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        lastId: "",
        pageFlag: "1",
        pageSize: 10,
        total: 0,
        dialogVisible: false,
        tableData: [],
        configId: '',
        paramDialogVisible: false,
        deleteForSearch: false,
        formData: defaultData(),
        paramFormData: {},
        paramList: [],
        openList: []
      };
    },
    methods: {
      defaultParamForm() {
        return {
          configId: '',
          merchantId: '',
          merchantDomain: '',
          pass: '',
          ip: '',
          callbackUrl: '',
          remark: ''
        };
      },
      goBack() {
        if (this.$router.history.length <= 1) {
          this.$router.push({path: '/home'});
          return false;
        } else {
          this.$router.go(-1);
        }
      },
      handleEdit(row) {
        this.dialogVisible = true;
        this.configId = row.configId;
      },
      handleDelete(row) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("qunarPolicyConfig/removeOne", {
                configId: row.configId
              })
              .then(() => {
                this.loadData();
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      prevClick() {
        this.pageFlag = "-1";
        this.lastId = this.tableData[0].configId;
        this.loadData();
      }
      ,
      nextClick() {
        this.pageFlag = "1";
        this.lastId = this.tableData[this.tableData.length - 1].configId;
        this.loadData();
      }
      ,
      loadData(params = {}) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("qunarPolicyConfig/getPageList", {
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
      }
      ,
      loadTotal: function (params = {}) {
        if (!params) {
          params = {};
        }
        this.$store
          .dispatch("qunarPolicyConfig/getTotal", {filter: params})
          .then(response => {
            this.total = response;
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
      handleAdd() {
        this.formData = defaultData();
        this.dialogVisible = true;
        this.configId = "";
      },
      handleSave(formData) {
        var url = "qunarPolicyConfig/addOne";
        if (formData.configId) {
          url = "qunarPolicyConfig/updateOne";
        }
        debugger
        formData.merchantId = this.merchantId;
        formData.merchantDomain = this.merchantDomain;
        this.$store
          .dispatch(url, formData)
          .then(() => {
            this.handleSearch();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      handleCancel() {
        this.dialogVisible = false;
      }
      ,
      handleSearch(params = {}) {
        this.deleteForSearch = true;
        params.merchantId = this.merchantId;
        this.loadData(params);
        this.loadTotal(params);
      },
    },
    created() {
      this.merchantDomain = this.$route.query.domain;
      this.merchantId = this.$route.query.firmId;
      this.handleSearch();
    },
    components: {
      configEdit
    }
  };
</script>

<style>
  .el-tag {
    margin: 5px 0 2px 3px;
  }

  .button-new-tag {
    margin: 5px 0 2px 3px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
