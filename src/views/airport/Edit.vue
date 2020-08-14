<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑机场信息':'添加机场信息'" :visible.sync="dialogVisible" width="24%" @open="onOpen" @close="onClose">
    <!-- <el-dialog :title="keyId!=''?'编辑角色信息':'添加新角色'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose"> -->
    <el-form ref="form" :model="formData" label-width="120px" size="mini">
      <el-form-item label="三字码">
        <el-input type="text" v-model="formData.airportCode" @input="toUpperCase"  maxlength="3"></el-input>
      </el-form-item>

      <el-form-item label="机场">
        <el-input v-model="airportName" style="width: 60%;"></el-input><el-button @click="addAirport" style="margin-left: 5px">添加</el-button>
      </el-form-item>
      <div class="_tags-view">
        <el-tag
          class="_tags-view-item"
          @close="tagClose(idx)"
          v-for="(tag,idx) in tags"
          :key="idx"
          closable="closable">
          {{tag}}
        </el-tag>
      </div>
      <el-form-item prop="airportCity" label="所在城市">
        <el-input v-model="formData.airportCity" ></el-input>
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
        data() {
            return {
                formData: {},
                airportName: '',
                tags: [],
                update:'',
                actions: {
                    getOne: 'airport/getOne',
                    saveOne: 'airport/addOne'
                }
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
                    airportCode: '',
                    airportName: [],
                    airportCity: ''
                };
            },
            addAirport(){
                let exit = true;
                for(let i = 0; i < this.tags.length; i++){
                    if (this.tags[i] === this.airportName){
                        exit = false;
                        break;
                    }
                }
                if (exit){
                    this.tags.push(this.airportName);
                }
            },
            onSave() {
              this.$refs['form'].validate(valid => {
              if (valid ) {
                  let actionName = this.keyId ? 'airport/updateOne' : 'airport/addOne'
                  this.$store
                  .dispatch(actionName, this.formData)
                  .then(id => {
                      this.dialogVisible = false;
                      this.$emit('refresh');
                      this.$message({ type: 'success', message: '保存成功' });
                      this.keyId ? this.$emit('updata') : this.$emit('add')

                  })
                  // eslint-disable-next-line no-unused-vars
                  .finally(_ => {
                      this.afterSave();
                  });
              }
              });
            },
            afterSave() {
              console.log(this.formData)
            },
            handleSave(){
                this.formData.airportName = this.tags;
                return  this.$emit('onSave', this.formData);
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            toUpperCase() {
                this.formData.airportCode = this.formData.airportCode.toUpperCase();
            },
            tagClose(idx){
                this.tags.splice(idx, 1);
            }
        },
        created() {
            this.clearForm();
            if (this.update){
                this.formData = this.curNode;
                this.tags = this.formData.airportName.concat();
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
