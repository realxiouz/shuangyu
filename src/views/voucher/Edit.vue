<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改凭证管理' : '添加凭证管理'"  width="50%" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="凭证字：" prop="voucherGroupId">
          <el-select v-model="formData.voucherGroupId" style="width: 100%;"  placeholder="请选择凭证字">
            <el-option
              v-for="(item, idx) in voucherGroupList"
              :key="idx"
              :label="item.voucherGroupName + ' - ' + item.voucherGroupTitle"
              :value="item.voucherGroupId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证数：" prop="voucherNum">
          <el-input v-model="formData.voucherNum" placeholder="请输入凭证数" />
        </el-form-item>
        <el-form-item label="凭证日期:" prop="voucherDate">
          <el-date-picker v-model="formData.voucherDate" value-format="timestamp" type="date" placeholder="请选择凭证日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>

      <el-table :data="formData.voucherRecords">
        <el-table-column label="摘要" width="200">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.summary" placeholder="输入摘要..."></el-input>
          </template>
        </el-table-column>
        <el-table-column label="会计科目" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.subjectId" @change="handleSubjectChange(scope.$index, $event)">
              <el-option
                v-for="(subject, index) in subjectList"
                :key="index"
                :label="`${subject.balanceDirection === 0 ? '借':'贷'} - ${subject.subjectName}`"
                :value="subject.subjectId"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="借方金额" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.borrowAmount" :disabled="scope.row.type === 1"/>
          </template>
        </el-table-column>
        <el-table-column label="贷方金额" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.loanAmount" :disabled="scope.row.type === 0" required/>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot="header">
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="handleCount(0)"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index > 1"
              type="danger"
              icon="el-icon-remove-outline"
              @click="handleCount(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align:right;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_EDIT],
    data() {
      const numValidator = (rule, value, callback) => {
        let reg = /^[0-9]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入数字！"));
        }
      };
      return {
        dialogVisible: false,
        voucherGroupList: [],
        subjectList: [],
        actions: {
          getOne: 'voucher/getOne',
          saveOne: 'voucher/save'
        },
        rules: {
          voucherGroupId: [
            {required: true, message: "请选择凭证字"}
          ],
          voucherNum: [
            {required: true, message: "请输入凭证数"},
            {validator: numValidator, trigger: 'blur'}
          ],
          voucherDate: [
            {required: true, message: "请选择凭证日期"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.loadVoucherGroup();
          this.loadSubject();
        }
      }
    },
    methods: {
      handleCount(index) {
        if ( index === 0 ) {
          this.formData.voucherRecords.push({
              summary: null,
              subjectId: null,
              borrowAmount: 0,
              loanAmount: 0,
              type: 0
            },
            {
              summary: null,
              subjectId: null,
              subjectCode: null,
              subjectName: null,
              borrowAmount: 0,
              loanAmount: 0,
              type: 1
            }
          )
        } else {
          this.formData.voucherRecords.splice(index, 1);
        }
      },
      handleSubjectChange(index, val) {
        this.formData.voucherRecords[index].type = this.subjectList.find(i => i.subjectId === val).balanceDirection;
        this.formData.voucherRecords[index].borrowAmount = 0;
        this.formData.voucherRecords[index].loanAmount = 0;
        this.formData.voucherRecords[index].subjectCode = this.subjectList.find(i => i.subjectId === val).subjectCode;
        this.formData.voucherRecords[index].subjectName = this.subjectList.find(i => i.subjectId === val).subjectName;
      },
      loadVoucherGroup() {
        this.$store
          .dispatch("voucherGroup/getList", { filter: {} })
          .then(data => {
            this.voucherGroupList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadSubject(){
        this.$store.dispatch('accountSubject/getList', {})
          .then(data => {
            this.subjectList = data;
          });
      },
      defaultFormData() {
        return {
          voucherGroupId: null,
          voucherNum: null,
          voucherDate: null,
          voucherRecords: [
            {
              summary: null,
              subjectId: null,
              subjectCode: null,
              subjectName: null,
              borrowAmount: 0,
              loanAmount: 0,
              type: 0
            },
            {
              summary: null,
              subjectId: null,
              subjectCode: null,
              subjectName: null,
              borrowAmount: 0,
              loanAmount: 0,
              type: 1
            }
          ]
        };
      },
      beforeLoadData(data){
        let voucher = data;
        if(voucher.voucherRecords && voucher.voucherRecords.length > 0){
          let voucherRecords = voucher.voucherRecords;
          voucherRecords.forEach(function(voucherRecord){
            if(voucherRecord.borrowAmount && parseFloat(voucherRecord.borrowAmount) > 0){
              voucherRecord.type = 0;
            }
            if(voucherRecord.loanAmount && parseFloat(voucherRecord.loanAmount) > 0){
              voucherRecord.type = 1;
            }
          });
        }
        return voucher;
      },
      validateOther(){
        let flag = false;
        let msg = null;
        if(this.formData && this.formData.voucherRecords.length > 0){
          let bCount = 0;
          let lCount = 0;
          for (const i of this.formData.voucherRecords) {
            bCount += i.borrowAmount;
            lCount += i.loanAmount;
          }
          if (bCount !== lCount) {
            flag = true;
            msg = `借贷不平衡: 借 - ${bCount}，贷 - ${lCount}`;
          }
          let voucherRecords = this.formData.voucherRecords;
          voucherRecords.forEach(function(obj){
            if(!obj.loanAmount && obj.type === 1){
              flag = true;
              msg = "请输入贷方金额";
            }
            if(!obj.borrowAmount && obj.type === 0){
              flag = true;
              msg = "请输入借方金额";
            }
            if(!obj.subjectId || !obj.subjectCode || !obj.subjectName){
              flag = true;
              msg = "请输入科目";
            }
            if(!obj.summary){
              flag = true;
              msg = "请输入摘要";
            }
          });
        }
        if(flag){
          this.$message({type: "warning", message: msg});
        }
        return !flag;
      }
    }
  };
</script>
