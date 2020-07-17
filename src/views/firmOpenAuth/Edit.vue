<template>
  <div class="page-form">
    <el-dialog title="平台授权管理" width="24%" center :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="开放平台:" prop="openId">
          <el-select
            style="width: 100%;"
            v-model="formData.openId"
            placeholder="请选择"
            @change="changeOpenPlatform"
          >
            <el-option
              v-for="item in openPlatformData"
              :key="item.openId"
              :label="item.openName"
              :value="item.openId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" prop="firmId" size="mini">
          <el-select
            style="width: 100%;"
            v-model="formData.firmId"
            placeholder="请选择"
            @change="changeFirm"
          >
            <el-option
              v-for="item in firmData"
              :key="item.firmId"
              :label="item.firmName"
              :value="item.firmId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      editAuthId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        dialogVisible: false,
        formData: this.defaultFormData(),
        openPlatformData: [],
        firmData: [],
        rules: {
          openId: [
            {required: true, message: "请选择开放平台"}
          ],
          firmId: [
            {required: true, message: "请选择企业名称"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.editAuthId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
          this.loadOpenPlatform();
          this.loadFirm();
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
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let method = 'firmOpenAuth/addOne';
            if(this.editAuthId){
              method = 'firmOpenAuth/updateOne';
              this.formData.authId = this.editAuthId;
            }
            this.$store
              .dispatch(method, this.formData)
              .then(() => {
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({type: "success", message: "保存成功"});
              });
          }else{
            let that = this;
            let timer = window.setTimeout(function(){
              that.$nextTick(function () {
                that.$refs['form'].clearValidate();
                window.clearTimeout(timer);
              })
            }, 1000);
          }
        });
      },
      defaultFormData() {
        return {
          authId: null,
          openId: null,
          openCode: null,
          openName: null,
          firmId: null,
          firmName: null
        };
      },
      changeOpenPlatform(openId){
        let that = this;
        if(that.openPlatformData && that.openPlatformData.length > 0){
          that.openPlatformData.forEach(function(obj){
            if(obj.openId === openId){
              that.formData.openCode = obj.openCode;
              that.formData.openName = obj.openName;
            }
          });
        }
      },
      changeFirm(firmId){
        let that = this;
        that.firmData.forEach(function(obj){
          if(obj.firmId === firmId){
            that.formData.firmName = obj.firmName;
          }
        });
      },
      loadOpenPlatform() {
        this.$store
          .dispatch("openPlatform/getList", {})
          .then(data => {
            this.openPlatformData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadFirm() {
        this.$store
          .dispatch("firm/getList", {})
          .then(data => {
            this.firmData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadData() {
        this.$store
          .dispatch("firmOpenAuth/getOne", {authId: this.editAuthId})
          .then(data => {
            this.formData = data;
          });
      }
    }
  };
</script>
