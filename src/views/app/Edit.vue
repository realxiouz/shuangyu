<template>
  <div class="page-form">
      <el-dialog
      :title="appId!='' ? '编辑应用' : '添加新应用'"
      center
      :visible.sync="dialogVisible" @open="onOpen" @close="onClose"
      width="30%"
    >
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="应用名称" prop="appName">
        <el-input v-model="formData.appName"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
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
    function defaultData() {
        return {
            appId: "",
            appName: "",
            enable: true
        }
    };
    export default {
        mixins: [MIXIN_EDIT],
        name: 'appEdit',
        data() {
            return {
                formData: defaultData(),
                actions: {
                    getOne: 'app/getOne',
                    saveOne: 'app/save'
                },
                rules: {
                    appName: [
                        {required: true, message: "请输入应用名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 10,
                            message: "长度在 1到 10 个字符"
                        }
                    ]
                }
            }
        },
        methods: {
           
            
        },
        
        props: {
            appId: String,
        }
    }
</script>
