<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="平台:">
        <el-select v-model="formData.openId" placeholder="请选择" style="width:100%" @change="selectOpen">
          <el-option
            v-for="(item,idx) in openList"
            :key="idx"
            :label="item.openName"
            :value="item.openId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数标签:" prop="label">
        <el-input v-model="formData.label"></el-input>
      </el-form-item>
      <el-form-item label="参数名称:" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            openId: "",
            openName: '',
            label: "",
            name: "",
            remark:""
        };
    };
    export default {
        name: 'flagParamEdit',
        data() {
            return {
                formData: defaultData(),
                openList: [],
                rules: {
                    thirdId: [
                        {required: true, message: "请选择平台", trigger: "blur"}
                    ],
                    label: [
                        {required: true, message: "请输入参数标签", trigger: "blur"},
                    ],
                    name: [
                        {required: true, message: "请输入参数名称", trigger: "blur"},
                    ]
                }
            }
        },
        methods: {
            handleSave() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.$emit("onSave", this.formData);
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("policyFlagParam/getOne", {paramId: id})
                        .then(data => {
                            this.formData = data;
                            this.dialogVisible = true;
                        }).catch(error => {
                        console.log(error);
                    });
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
                    .dispatch("openPlatform/getList", {filters: {}})
                    .then(data => {
                        this.openList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            if (this.paramId) {
                this.handleGetOne(this.paramId);
            }
            this.loadOpenList();
        },
        props: {
            paramId: String,
        }
    }
</script>
