<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="formData" label-width="80px" size="mini">
      <el-form-item label="客户">
        <el-select v-model="formData.openId" placeholder="请选择" style="width:30%" @change="selectOpen">
          <el-option
            v-for="(item,idx) in openList"
            :key="idx"
            :label="item.openName"
            :value="item.openId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row
        v-for="(ruleItem, index) in formData.params"
        :key="formData.params[index].key"
        id="rule-item"
        :gutter="10"
      >
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-input
              class="rule-item-input"
              v-model="formData.params[index].label"
              placeholder="参数标签"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-input
              class="rule-item-input"
              v-model="formData.params[index].name"
              placeholder="参数名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-input
              class="rule-item-input"
              v-model="formData.params[index].value"
              placeholder="参数值"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-input
              class="rule-item-input"
              v-model="formData.params[index].group"
              placeholder="参数分组"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
        <el-form-item class="rule-item" label-width="10px" style="width:60%">
          <el-input
            class="rule-item-input"
            v-model="formData.params[index].comment"
            placeholder="注解"
          ></el-input>
        </el-form-item>
      </el-col>
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-input
              class="rule-item-input"
              v-model="formData.params[index].inputType"
              placeholder="输入框类型"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-input
              class="rule-item-input"
              v-model="formData.params[index].data"
              placeholder="数据"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-checkbox v-model="formData.params[index].readonly">是否只读</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-checkbox v-model="formData.params[index].required">是否必须</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item class="rule-item" label-width="10px" style="width:60%">
            <el-checkbox v-model="formData.params[index].disabled">禁用</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="2" >
          <el-form-item label-width="10px" style="width:100%">
            <el-button
              v-if="index!=0"
              type="danger"
              icon="el-icon-remove-outline"
              @click="deleteRuleItem(index)"
            ></el-button>
            <el-button
              v-if="index==0"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addRuleItem()"
            ></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:10px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            openId: "",
            openName: '',
            flag: "",
            params: [{}],
            openList: []
        };
    }

    export default {
        name: "flagEdit",
        data() {
            return {
                formData: defaultData(),
                openList: [],
                rules: {
                    thirdId: [{required: true, message: "请选择平台", trigger: "blur"}],
                    flag: [{required: true, message: "请输入标签名称", trigger: "blur"}]
                }
            };
        },
        methods: {
            deleteRuleItem(index) {
                this.formData.params.splice(index, 1);
            },
            addRuleItem() {
                this.formData.params.push({});
            },
            handleChange(thirdId) {
                this.paramList(thirdId);
            },
            paramList(thirdId) {
                let searchForm = {};
                searchForm.thirdId = thirdId;
                this.$store
                    .dispatch("policyFlagParam/getList", {
                        filters: searchForm
                    })
                    .then(data => {
                        this.formData.params = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleSave() {
                console.log(this.formData)
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.$emit("onSave", this.formData);
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("policyFlag/getOne", {flagId: id})
                        .then(data => {
                            this.formData = data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    this.dialogVisible = true;
                } else {
                    this.formData = defaultData();
                }
            },
            selectOpen(openId){
                this.openList.forEach( item => {
                    if (openId === item.openId){
                        //当前所选择的open平台
                        this.formData.openName = item.openName;
                    }
                })
            },
            loadOpenList(){
                this.$store
                    .dispatch("open/getList", {filters: {}})
                    .then(data => {
                        this.openList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            this.loadOpenList();
            if (this.flagId) {
                this.handleGetOne(this.flagId);
            }
        },
        props: {
            flagId: String
        }
    };
</script>
<style>
  #rule-item .el-form-item__content {
    width: 100%;
  }

  .rule-item {
    width: 20%;
  }

  .rule-item-input {
    width: 100%;
  }
</style>
