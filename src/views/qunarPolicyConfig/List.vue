<template>
  <div class="bigBox">
    <div class="searchBox">
      <config-search @onSearch="handleSearch"></config-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:15px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        size="mini"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
      >
        <el-table-column prop="merchantName" label="客户" width="300" align="center"></el-table-column>
        <el-table-column prop="merchantDomain" label="客户域名" width="300" align="center"></el-table-column>
        <el-table-column prop="configId" label="用户名" align="center"></el-table-column>
        <el-table-column prop="pass" label="密码" align="center"></el-table-column>
        <el-table-column prop="ip" label="IP" align="center"></el-table-column>
        <el-table-column prop="callbackUrl" label="回调地址" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row,scope.$index)" type="danger" size="small">删除</el-button>
            <el-button @click="handleParams(scope.row)" type="primary" size="mini">参数配置</el-button>
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
        title="配置信息"
        center
        :visible.sync="dialogVisible"
        width="33%"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :rules="rules"  :model="formData" label-width="100px" size="mini">
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
          <el-form-item label="客户域名" prop="merchantDomain">
            <el-input v-model="formData.merchantDomain"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user">
            <el-input v-model="formData.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="formData.pass"></el-input>
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <el-input v-model="formData.ip"></el-input>
          </el-form-item>
          <el-form-item label="回调地址" prop="callbackUrl">
            <el-input v-model="formData.callbackUrl"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right;">
          <el-button size="mini" @click="handleCancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="configId?'编辑配置信息':'添加新角色'" center :visible.sync="editDialogVisible" width="30%">
        <config-edit v-if="editDialogVisible" :configId="configId" @onSave="onSave"
                     @onCancel="handleCancel" @onUpdate="handleUpdate"></config-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import configSearch from "./Search.vue";
  import configEdit from "./Edit"

  function defaultData() {
    return {
      configId: "",
      rules: {
        merchantId: [
          {required: true, message: '请选择客户', trigger: 'blur'}
        ],
        merchantDomain: [
          {required: true, message: '请输入客户域名', trigger: 'blur'}
        ],
        configId: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        ip: [
          {required: true, message: '请输入IP', trigger: 'blur'}
        ],
        callbackUrl: [
          {required: true, message: '请输入回调地址', trigger: 'blur'}
        ]
      }
    };
  }

  export default {
    name: "openApiList",
    data() {
      return {
        loading: false,
        lastId: "",
        pageFlag: "1",
        pageSize: 10,
        total: 0,
        dialogVisible: false,
        editDialogVisible: false,
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
      handleEdit(row) {
        this.editDialogVisible = true;
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
      handleParams(row) {
        this.$router.push({path: '/qunarPolicyParam/list', query: {merchantId: row.merchantId}});
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
      loadTotal: function (params) {
        if (!params || !params.apiName) {
          params = {};
        }
        this.$store
          .dispatch("qunarPolicyConfig/getTotal", {filters: params})
          .then(response => {
            this.total = response;
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
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
      ,
      handleAdd() {
        this.formData = defaultData();
        this.loadMerchants();
        this.dialogVisible = true;
        this.configId = "";
      }
      ,
      handleSwitch(row) {
        row.enable = row.enable ? true : false;
        this.$store
          .dispatch("qunarPolicyConfig/updateOne", row)
          .then(() => {
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
      handleRemove(id, index, rows) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("qunarPolicyConfig/removeOne", {configId: id})
              .then(() => {
                if (1 === this.tableData.length && !this.deleteForSearch) {
                  this.prevClick();
                } else {
                  this.loadData();
                }
                this.deleteForSearch = false;
                rows.splice(index, 1);
              });
          })
          .catch(err => {
            console.error(err);
          });
      }
      ,
      handleSave() {
        this.$store
          .dispatch("qunarPolicyConfig/addOne", this.formData)
          .then(() => {
            this.handleSearch();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      }
      ,
      handleUpdate(params) {
        this.$store
          .dispatch("qunarPolicyConfig/updateOne", params)
          .then(() => {
            this.handleSearch();
          })
          .catch(error => {
            console.log(error);
          });
        this.editDialogVisible = false;
      }
      ,
      handleCancel() {
        this.dialogVisible = false;
        this.editDialogVisible = false;
      }
      ,
      handleSearch(params) {
        this.deleteForSearch = true;
        if (!params) {
          params = {};
        }
        this.loadData(params);
        this.loadTotal(params);
      }
      ,
      clearForm() {
        this.paramFormData = this.defaultParamForm();
      }
      ,
      addParams() {
        this.clearForm();
        this.paramDialogVisible = true;
      }
      ,
      paramDialogCancel() {
        this.paramDialogVisible = false;
      }
      ,
      handleConfirm() {
        let exits = true;
        for (let i = 0; i < this.paramList.length; i++) {
          if (this.paramList[i].name === this.paramFormData.name) {
            exits = false;
            break;
          }
        }
        if (exits) {
          this.paramList.push(this.paramFormData);
        }
        this.paramDialogVisible = false;
      }
      ,
      handleClose(idx) {
        this.paramList.splice(idx, 1);
      }
      ,
      handleTagClick(idx) {
        this.clearForm();
        Object.assign(this.paramFormData, this.paramList[idx]);
        this.paramDialogVisible = true;
      }
    },
    created() {
      this.handleSearch();
    },
    components: {
      configEdit,
      configSearch
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
