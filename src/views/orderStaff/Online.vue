<template>
  <div>
    <el-main>
      <el-button v-if="formData.status ==1" type="primary" @click="handleOffline">下 线</el-button>
      <el-button v-else type="primary" @click="handleOnline">上 线</el-button>
      <el-form :model="formData" label-width="80px">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="姓名:">
              <el-input v-model="formData.fullName" :disabled="true"></el-input>
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
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="状态:">
              <el-input v-model="_status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog title="标签信息" width="30%" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-form ref="form" :model="formData" label-width="80px">
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
          <el-button type="primary" size="mini" @click="handleSave">保 存</el-button>
          <el-button size="mini" @click="handleClose">关 闭</el-button>
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
        dialogVisible: false,
        selectFlags: [],
        ownFlags: [
          {label: "出票", value: '1'},
          {label: "退票", value: '2'},
          {label: "改签", value: '3'},
          {label: "消息", value: '4'},
          {label: "质检", value: '5'},
          {label: "补单", value: '6'},
          {label: "补单号", value: '7'}
        ]
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch("orderStaff/getList", {
            //staffId: this.$store.state.loginInfo.staffId
            searchForm: {
              staffId: '5d89115c76e7488ea2ffa5b3401ecc8a'
            }
          })
          .then(data => {
            this.formData = data[0];
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
      },
      handleOnline() {
        this.dialogVisible = true;
      },
      handleOffline(){
        this.$store
          .dispatch("orderStaff/staffOnline")
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleClose() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
        this.$store
          .dispatch("orderStaff/staffOnline",{onlineFlags:JSON.stringify(this.formData.onlineFlags)} )
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
    },
    created() {
      this.loadData();
      console.log("++++++++++++++++" + this.$store.state.loginInfo.fullName)
    }
  };
</script>
<style>
  .el-select{
    width: 100%;
  }
</style>
