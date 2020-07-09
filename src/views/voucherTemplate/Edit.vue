<template>
  <div class="page-form">
    <el-dialog :title="templateId?'模板编辑':'模板添加'" width="800" center :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="凭证字：" prop="voucherGroupId">
          <el-select v-model="formData.voucherGroupId" style="width: 100%;"  placeholder="请选择凭证字">
            <el-option
              v-for="(item,idx) in voucherGroupList"
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板类型" prop="templateType">
              <el-select v-model="formData.templateType">
                <el-option
                  v-for="(i,inx) in templates"
                  :key="inx"
                  :label="i.label"
                  :value="i.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="formData.templateName"/>
            </el-form-item>
          </el-col>
        </el-row>
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
                v-for="(i, inx) in subjects"
                :key="inx"
                :label="`${i.balanceDirection==0?'借':'贷'}-${i.subjectName}`"
                :value="i.subjectId"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="借方金额" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.borrowAmount" :disabled="scope.row.type==1"/>
          </template>
        </el-table-column>
        <el-table-column label="贷方金额" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.loanAmount" :disabled="scope.row.type==0" required/>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:header>
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="handleCount(0)"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index>1"
              type="danger"
              icon="el-icon-remove-outline"
              @click="handleCount(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align:right;" slot="footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { VOUCHCHER_TEMPLATE_TABLE } from '@/utils/const'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      templateId: {
        type: String,
        default: null
      }
    },
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
        formData: this.defaultFormData(),
        voucherGroupList: [],
        rules: {
          voucherGroupId: [
            {required: true, message: "请选择凭证字", trigger: "change"}
          ],
          voucherNum: [
            {required: true, message: "请输入凭证数", trigger: "change"},
            {validator: numValidator, trigger: 'blur'}
          ],
          voucherDate: [
            {required: true, message: "请选择凭证日期", trigger: "change"}
          ],
          templateType: [
            {required: true, message: "请选择类型", trigger: "change"}
          ],
          templateName: [
            {required: true, message: "填写模板名称", trigger: "change"}
          ],
        },
        subjects: [],
        templates: VOUCHCHER_TEMPLATE_TABLE
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.templateId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
        }
      }
    },
    methods: {
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleSave() {
        let bCount = 0;
        let lCount = 0;
        for (const i of this.formData.voucherRecords) {
          bCount += i.borrowAmount;
          lCount += i.loanAmount;
        }
        if (bCount !== lCount) {
          this.$message.error(`借贷不平衡: 借${bCount},贷${lCount}`)
          return
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.formData.total = lCount;
            this.$store
              .dispatch("voucherTemplate/saveData", this.formData)
              .then(() => {
                if (!this._.isEmpty(this.templateId)) {
                  this.formData.templateId = this.templateId;
                }
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({type: "success", message: "保存成功"});
              });
          }
        });
      },
      defaultFormData() {
        return {
          voucherGroupId: null,
          voucherNum: null,
          voucherDate: null,
          templateName: '',
          templateType: '',
          voucherRecords: [
            {
              summary: '',
              subjectId: '',
              subjectName: '',
              borrowAmount: 0,
              loanAmount: 0,
              type: 0
            },
            {
              summary: '',
              subjectId: '',
              subjectName: '',
              borrowAmount: 0,
              loanAmount: 0,
              type: 1
            }
          ]
        };
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
      loadData() {
        this.$store
          .dispatch("voucherTemplate/getOne", {templateId: this.templateId})
          .then(data => {
            this.formData = data;
          });
      },
      handleCount(inx) {
        if ( inx === 0 ) {
          this.formData.voucherRecords.push({
            summary: '',
            subjectId: '',
            borrowAmount: 0,
            loanAmount: 0,
            type: 0,
          },
          {
              summary: '',
              subjectId: '',
              subjectName: '',
              borrowAmount: 0,
              loanAmount: 0,
              type: 1
            }
          )
        } else {
          this.formData.voucherRecords.splice(inx, 1)
        }
      },
      handleSubjectChange(inx, val) {
        this.formData.voucherRecords[inx].type = this.subjects.find(i => i.subjectId == val).balanceDirection
        this.formData.voucherRecords[inx].borrowAmount = 0
        this.formData.voucherRecords[inx].loanAmount = 0
        this.formData.voucherRecords[inx].subjectName = this.subjects.find(i => i.subjectId == val).subjectName
      }
    },
    created() {
      this.$store.dispatch('accountSubject/getList', {})
        .then(data => {
          this.subjects = data
        })
      this.loadVoucherGroup();
      
    }
  };
</script>
