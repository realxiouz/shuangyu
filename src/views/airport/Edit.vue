<template>
  <div>
    <el-form ref="form" :model="formData" label-width="120px" size="mini">
      <el-form-item label="三字码">
        <el-input type="text" v-model="formData.airportCode" @input="toUpperCase" :disabled="update" maxlength="3"></el-input>
      </el-form-item>
      <el-form-item label="机场">
        <el-row style="display: inline-block"><el-input v-model="airportName" style="width: 60%;"></el-input><el-button @click="addAirport" style="margin-left: 5px">添加</el-button></el-row>
          <el-dropdown trigger="click" size="small">
          <span class="el-dropdown-link">
            机场名称<i class="el-icon-arrow-down"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,idx) in formData.airportName" :key="idx">
                <span style="float: left">{{item}}</span>
                <span style="float: right">
                  <i class="el-icon-circle-close" @click="itemRemove(idx)" style="margin-left: 14px"></i>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-form-item>
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

