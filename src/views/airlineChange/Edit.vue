<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑航司迁移信息':'添加航司迁移信息'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
    <el-form :model="formData" label-width="120px" size="mini">
      <input type="hidden" v-model="formData.flightId"/>
      <el-form-item label="航司">
        <el-input type="text" v-model="formData.airline" onkeyup="this.value=this.value.toUpperCase()" maxlength="2" placeholder="航司"></el-input>
      </el-form-item>
      <el-form-item label="可迁转航司">
        <el-input type="text" v-model="formData.airlines" onkeyup="this.value=this.value.toUpperCase()"  placeholder="可迁转航司多个用,隔开"></el-input>
      </el-form-item>
      <el-form-item label="非自愿改签之前">
        <el-input-number  :min="0" v-model="formData.before"  placeholder="非自愿改签之前"></el-input-number>
      </el-form-item>
      <el-form-item label="非自愿改签之后">
        <el-input-number  :min="0" v-model="formData.after"  maxlength="3" placeholder="非自愿改签之后"></el-input-number>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch type="text" v-model="formData.enable" active-text="启用" inactive-text="不启用"></el-switch>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="text" v-model="formData.remark"  placeholder="备注"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {MIXIN_EDIT} from "@/utils/mixin";
    export default {
      mixins: [MIXIN_EDIT],
        name: 'airportEdit',
        props: ["update", "curNode"],
        data() {
            return {
                formData: {},
                airportCode: '',
                tags: [],
                actions: {
                  getOne: 'airlineChange/getOne',
                  saveOne: 'airlineChange/saveOne'
                },
                /*rules: {
                  airportName: [
                    {required: true, message: "请输入机场名称", trigger: "blur"}
                  ],
                  airportCity: [
                    {required: true, message: "请输入机场城市名称", trigger: "blur"}
                  ],
                  airportCode: [
                    {required: true, message: "请输入机场三字码", trigger: "blur"},
                    {
                      min: 3,
                      max: 3,
                      message: '长度为3字符'
                    }
                  ]
                }*/
            }
        },
        methods: {
            defaultFormData() {
                return {
                  airline: '',
                  airlines: '',
                  before: '',
                  after: '',
                  intervalUnit: '1',
                  remark: ''
                };
            },

            handleSave(){
                //将相应字段转为大写
                const toUpperCaseList = [
                    //航司
                    'airline',
                    //主航班号
                    'airlines',
                ];
                toUpperCaseList.forEach( item => {
                    this.formData[item] =  this.formData[item].toUpperCase();
                })
                return  this.$emit('onSave', this.formData);
            },
            clearForm() {
                this.formData = this.defaultFormData();
            }
        },
        created() {
            this.clearForm();
            if (this.update){
                Object.assign(this.formData,this.curNode);
                if (this.curNode.stopAirportCode)
                  this.tags = this.formData.stopAirportCode.concat();
            }
        }
    }
</script>

<style>
  ._tags-view {
    height: 80px;
    width: 330px;
    margin: 5px 0px 10px 120px;
    padding-top: 6px;
    border: 1px solid #edeff0;
  }

  ._tags-view-item {
    margin: 0 3px 2px 0;
    cursor: pointer;
    height: 22px;
    line-height: 26px;
  }
</style>
