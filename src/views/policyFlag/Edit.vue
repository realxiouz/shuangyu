<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="formData" label-width="80px" size="mini">
      <el-form-item label="平台" prop="thirdId">
        <el-select v-model="formData.thirdId" style="width:100%"  filterable placeholder="请选择平台" @change="handleChange">
          <el-option
            v-for="item in partyList"
            :key="item.thirdId"
            :label="item.thirdName"
            :value="item.thirdId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-table :data="formData.params" size="mini" fit highlight-current-row style="width: 100%">
        <el-table-column prop="label" label="参数标签" align="center"></el-table-column>
        <el-table-column prop="name" label="参数名称" align="center"></el-table-column>
        <el-table-column prop="value" label="参数值" align="center">
          <template slot-scope="{row}">
            <input class="edit-input" size="small" v-model="row.value" />
          </template>
        </el-table-column>
        <el-table-column prop="group" label="参数分组" align="center">
          <template slot-scope="{row}">
            <input class="edit-input" size="small" v-model="row.group" />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:10px;text-align: right;">
      <el-button size="mini"  @click="$emit('onCancel')">取 消</el-button>
      <el-button  size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
function defaultData() {
  return {
    thirdId: "",
    flag: "",
    params: []
  };
}
export default {
  name: "flagEdit",
  data() {
    return {
      formData: defaultData(),
      partyList: [],
      rules: {
        thirdId: [{ required: true, message: "请选择平台", trigger: "blur" }],
        flag: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
      }
    };
  },
  methods: {
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
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("onSave", this.formData);
        }
      });
    },
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("policyFlag/getOne", { flagId: id })
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
    thirdPartyList() {
      this.$store
        .dispatch("thirdParty/getList", {
          filters: {}
        })
        .then(data => {
          this.partyList = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    if (this.flagId) {
      this.handleGetOne(this.flagId);
    }
    this.thirdPartyList();
  },
  props: {
    flagId: String
  }
};
</script>
