<template>
  <div class="page-form">
    <el-form ref="formData" width="45%" :model="formData" label-width="100px" size="mini">
      <input type="hidden" v-model="formData.apiId"/>
      <el-form-item label="开放平台:">
        <el-select v-model="formData.openId" placeholder="请选择平台.." @change="handleSelect" style="width: 100%">
          <el-option
            v-for="item in openList"
            :key="item.openId"
            :label="item.openName"
            :value="item.openId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="URL:">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="方法:">
        <el-input v-model="formData.method"></el-input>
      </el-form-item>
      <el-form-item label="参数">
        <div style="width: 100%; height: 100px; border: #DCDFE6 solid 1px; border-radius: 4px">
          <el-tag
            :key="idx"
            v-for="(tag,idx) in paramList"
            closable
            @close="handleClose(idx)">
            {{tag}}
          </el-tag>
          <el-button class="button-new-tag" size="small" @click="addParams">+ New Tag</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>

    <el-dialog title="API参数" :visible.sync="paramDialogVisible" width="30%">
      <el-form :model="paramFormData" class="demo-form-inline">
        <el-form-item label="参数名称">
          <el-input v-model="paramFormData.name" placeholder="参数名称.."></el-input>
        </el-form-item>
        <el-form-item label="参数值">
          <el-input v-model="paramFormData.value" placeholder="参数值.."></el-input>
        </el-form-item>
        <el-form-item label="是否只读">
          <el-select v-model="paramFormData.readonly">
            <el-option label="是" :value=true></el-option>
            <el-option label="否" :value=false></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  function defaultData() {
    return {
      apiId: "",
      openId: "",
      url: "",
      method: ""
    };
  }

  export default {
    name: "apiEdit",
    data() {
      return {
        formData: defaultData(),
        paramFormData: {},
        paramList: [],
        openList: []
      };
    },
    methods: {
      defaultParamForm() {
        return {
          //标签
          label: '',
          //名称
          name: '',
          //值
          value: '',
          //分组
          group: '',
          //标签
          comment: '',
          //输入框类型
          inputType: '',
          //数据类型
          dataType: '',
          //是否只读
          readonly: false,
          //禁用
          disabled: false,
          //是否必须
          required: true,
          //数据
          data: ''
        };
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$emit("onSave", this.formData);
          }
        });
      },
      handleGetOne(id) {
        if (id) {
          this.$store
            .dispatch("openApiService/getOne", {apiId: id})
            .then(data => {
              this.formData = data;
              this.dialogVisible = true;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.formData = defaultData();
        }
      },
      clearForm() {
        this.paramFormData = this.defaultParamForm();
      },
      addParams() {
        this.paramDialogVisible = true;
      },
      handleCancel() {
        this.paramDialogVisible = false;
      },
      handleConfirm() {

      },
      handleClose(idx) {
        this.paramList.splice(idx, 1);
      },
      //加载平台信息
      loadOpenParty() {
        this.$store.dispatch("openPlatform/getList", {filters: {}})
          .then(data => {
            this.openList = data;
          }).catch(error => {
          console.log(error);
        });
      },
      handleSelect(openId) {
        this.openList.forEach(item => {
          if (openId === item.openId) {
            this.formData.openName = item.openName;
          }
        })
      }
    },
    created() {
      if (this.apiId) {
        this.handleGetOne(this.apiId);
      }
      this.loadOpenParty();
    },
    props: {
      apiId: String
    }
  };
</script>
