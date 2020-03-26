<template>
  <div>
      <el-table stripe size="mini" style="width: 100%;" fit :data="tableData">
        <el-table-column prop="fullName" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号"  align="center"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"  align="center"></el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" style="color: green">在线</span>
            <span v-else style="color: red">离线</span>
          </template>
        </el-table-column>
        <el-table-column label="上线/下线时间" width="200" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" >{{ formatDate(scope.row.onlineTime,'YYYY-MM-DD HH:mm:ss') }}</span>
            <span v-else >{{ formatDate(scope.row.offlineTime,'YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleFlag(scope.row)">配置标签</el-button>
            <el-button size="mini" type="primary" @click="logSearch(scope.row)">查看日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="标签信息" width="30%" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-form ref="form" :model="formData" label-width="120px">
          <el-form-item label="标签:" prop="ownFlags">
            <el-select v-model="formData.ownFlags" multiple placeholder="请选择">
              <el-option
                v-for="item in ownFlags"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="日志信息" width="30%" :visible.sync="logDialogVisible" :close-on-click-modal="false">
        <el-table stripe size="mini" style="width: 100%;" fit :data="logTableData">
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column label="时间" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ formatDate(scope.row.time,'YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作人"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="handleClose">关 闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "orderStaffEdit",
    props: ["curNode"],
    data() {
      return {
        formData: {
          ownFlags: []
        },
        dialogVisible: false,
        logDialogVisible: false,
        tableData: [],
        logTableData: [],
        ownFlags: [
          { label: "出票", value: 1 },
          { label: "退票", value: 2 },
          { label: "改签", value: 3 },
          { label: "未出票申请退款", value: 4 },
          { label: "消息", value: 5 },
          { label: "质检", value: 6 },
          { label: "补单", value: 11 },
          { label: "填写单号", value: 12 }
        ]
      };
    },
    methods: {
      loadTableData() {
        var searchForm = {};
        if (this.curNode && this.curNode != null) {
          searchForm = {
            firmId: this.curNode.firmId, deptId: this.curNode.deptId
          }
        } else {
          searchForm = {
            firmId: this.$store.state.loginInfo.firm.firmId
          }
        }
        this.$store
          .dispatch("orderStaff/getList", {
            searchForm: searchForm
          })
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleFlag(row) {
        this.dialogVisible = true;
        this.formData = row;
      },
      logSearch(row) {
        this.logDialogVisible = true;
        if (row.logs && row.logs != null) {
          this.logTableData = row.logs;
        }
      },
      handleClose() {
        this.logDialogVisible = false;
        this.logTableData = [];
      },
      handleSave() {
        this.dialogVisible = false;
        this.$store
          .dispatch("orderStaff/save", this.formData)
          .then(() => {
            this.loadTableData();
            this.formData = {
              ownFlags: []
            };
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCancel() {
        this.dialogVisible = false;
        this.formData = {
          ownFlags: []
        };
      },
      initDate(dateStr, format) {
        if (dateStr && null != dateStr) {
          let date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      },
      clearTableData() {
        this.tableData = [];
      }
    },
    computed: {
      formatDate() {
        return function (dateStr, format) {
          return this.initDate(dateStr, format);
        };
      },
      initGender() {
        return function (gender) {
          return 0 == gender ? "男" : "女";
        };
      }
    },
    created() {
      this.loadTableData();
    },
    watch: {
      curNode() {
        this.clearTableData();
        this.loadTableData();
      }
    }
  };
</script>
