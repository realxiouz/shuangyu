<template>
  <div>
    <el-form ref="form" :model="formData" label-width="120px" size="mini">
      <el-form-item label="三字码">
        <el-input type="text" v-model="formData.airportCode" @input="toUpperCase" :disabled="update" maxlength="3"></el-input>
      </el-form-item>

      <el-form-item label="机场">
        <el-input v-model="airportName" style="width: 60%;"></el-input><el-button @click="addAirport" style="margin-left: 5px">添加</el-button>
      </el-form-item>
      <div class="_tags-view">
        <el-tag
          class="_tags-view-item"
          @close="tagClose(tag)"
          v-for="(tag,idx) in this.formData.airportName"
          :key="idx"
          closable="closable">
          {{tag}}
        </el-tag>
      </div>
      <el-form-item prop="airportCity" label="所在城市">
        <el-input v-model="formData.airportCity" :disabled="update"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="$emit('onSave', formData)">确 定</el-button>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'airportEdit',
        props: ["update", "curNode"],
        data() {
            return {
                formData: {},
                airportName: '',
                tags: [],
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
                for(let i = 0; i < this.formData.airportName.length; i++){
                    if (this.formData.airportName[i] === this.airportName){
                        exit = false;
                        break;
                    }
                }
                if (exit){
                    this.formData.airportName.push(this.airportName);
                }
            },
            itemRemove(idx){
                this.formData.airportName.splice(idx, 1);
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            toUpperCase() {
                this.formData.airportCode = this.formData.airportCode.toUpperCase();
            },
            tagClose(tag){
                this.formData.airportName.splice(this.formData.airportName.indexOf(tag), 1);
            }
        },
        created() {
            this.clearForm();
            if (this.update){
                this.formData = this.curNode;
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
