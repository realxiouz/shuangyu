<template>
  <div>
    <el-main>
      <el-form :model="formData" label-width="80px" size="mini">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="姓名:">
              <el-input v-model="formData.fullName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="状态:">
              <el-input v-model="_status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="拥有标签:">
              <el-select v-model="formData.ownFlags" multiple :disabled="true">
                <el-option
                  v-for="item in ownFlags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="上线标签:">
              <el-select v-model="formData.onlineFlags" multiple :disabled="true">
                <el-option
                  v-for="item in ownFlags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center">
        <el-button size="mini" v-if="setOfflineFlag()" type="primary" @click="handleOffline">下 线</el-button>
        <el-button size="mini" v-if="this.formData.status==0" type="danger" @click="handleOnline">上 线</el-button>
        <el-button size="mini" v-if="formData.status ==1" type="primary" @click="handleEditFlags">修改标签</el-button>
        <el-button size="mini" v-if="formData.monitorFlag ==1" type="primary" @click="setMonitor">转让班长</el-button>
      </div>
      <el-dialog center title="标签信息" width="30%" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-form size="mini" ref="form" :model="formData" label-width="45px">
          <el-form-item label="标签:" prop="onlineFlags">
            <el-select v-model="formData.onlineFlags" multiple placeholder="请选择">
              <el-option
                v-for="item in selectFlags"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="handleClose">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleSave">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog center title="在线人员信息" width="30%" :visible.sync="dialogVisibleFlag" :close-on-click-modal="false">
        <el-table
          ref="singleTable"
          :data="staffList"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column prop="fullName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="setMonitorClose">取 消</el-button>
          <el-button type="primary" size="mini" @click="setMonitorSave">保 存</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
  export default {
    name: "orderStaffOnline",
    data() {
      return {
        formData: {
          status: 2,
          onlineFlags: [],
          ownFlags: [],
          fullName: '',
          onlineTime: 0,
          offlineTime: 0,
        },
        editFlagFlag: false,
        dialogVisible: false,
        dialogVisibleFlag: false,
        offlineFlag: false,
        staffList: [],
        selectFlags: [],
        orderStaff: {},
        ownFlags: [
          {label: "出票", value: 1},
          {label: "退票", value: 2},
          {label: "改签", value: 3},
          {label: "未出票申请退款", value: 4},
          {label: "消息", value: 5},
          {label: "质检", value: 6},
          {label: "补单", value: 11},
          {label: "填写单号", value: 12}
        ]
      };
    },
    mounted() {
      this.loadData();
    },
    methods: {
      setOfflineFlag() {
        if (this.formData.status == 1 && this.formData.monitorFlag == 0) {
          return true;
        } else {
          return false;
        }

      },
      loadData() {
        let staffId = this.$store.getters.staffId
        console.log("staffId:" + staffId);
        if (staffId && staffId != undefined && staffId != null && staffId != '') {
          this.$store
            .dispatch("orderStaff/getOne", {
              staffId: staffId
            })
            .then(data => {
              this.formData = data;
              this.selectFlags = [];
              if (this.formData.ownFlags && this.formData.ownFlags != null && this.formData.ownFlags.length > 0) {
                for (var i = 0; i < this.formData.ownFlags.length; i++) {
                  for (var j = 0; j < this.ownFlags.length; j++) {
                    if (this.ownFlags[j].value == this.formData.ownFlags[i]) {
                      this.selectFlags.push(this.ownFlags[j]);
                      break;
                    }
                  }
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      setMonitor() {
        this.dialogVisibleFlag = true;
        this.orderStaff = {};
        this.$store
          .dispatch("orderStaff/getOnlineList", {
            searchForm: {status: 1}
          })
          .then(data => {
            if (data.length > 0) {
              this.staffList = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCurrentChange(val) {
        this.orderStaff = {};
        this.orderStaff = val;
        console.log(this.orderStaff);
      },
      handleClose() {
        this.dialogVisible = false;
        this.editFlagFlag = false;
      },
      handleSave() {
        if (this.formData.onlineFlags.length < 1) {
          this.$message.error('您必须选择至少一个标签');
          return;
        }
        this.dialogVisible = false;
        if (this.editFlagFlag) {
          this.editFlagFlag = false;
          this.$store
            .dispatch("orderStaff/updateStaffOnline", {onlineFlags: JSON.stringify(this.formData.onlineFlags)})
            .then(() => {
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.editFlagFlag = false;
          this.$store
            .dispatch("orderStaff/staffOnline", {onlineFlags: JSON.stringify(this.formData.onlineFlags)})
            .then(() => {
              this.loadData();
              this.editFlagFlag = false;
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      handleOnline() {
        this.dialogVisible = true;
      },
      handleEditFlags() {
        this.dialogVisible = true;
        this.editFlagFlag = true;
      },
      handleOffline() {
        this.$store
          .dispatch("orderStaff/staffOnline")
          .then(() => {
            this.loadData();
            this.editFlagFlag = false;
          })
          .catch(error => {
            console.log(error);
          });
      },
      setMonitorClose() {
        this.dialogVisibleFlag = false;
      },
      setMonitorSave() {
        if (this.orderStaff.staffId) {
          this.$store
            .dispatch("orderStaff/setMonitor", {
              staffId: this.orderStaff.staffId
            })
            .then(data => {
              if (data) {
                this.loadData();
              }
              this.loading = false;
            })
            .catch(error => {
              this.loading = false;
              console.log(error);
            });
        } else {
          this.$message.error('您必须选择员工');
          return;
        }
        this.dialogVisibleFlag = false;
        this.$store
          .dispatch("orderStaff/setMonitor", {onlineFlags: JSON.stringify(this.formData.onlineFlags)})
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });

      },
      initDate(dateStr, format) {
        if (dateStr && null != dateStr) {
          let date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      }
    },
    /*created() {
      this.loadData();
    },*/
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
      },
      _status: {
        get: function () {
          if (this.formData.status && this.formData.status != null && this.formData.status == 1) {
            return '在线';
          } else {
            return '离线';
          }

        }
      },
    }
  };
</script>
<style>
  .el-select {
    width: 100%;
  }
</style>
