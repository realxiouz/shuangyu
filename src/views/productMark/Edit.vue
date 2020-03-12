<template>
  <div>
    <el-form :rules="formRules" ref="formData" :model="formData" label-width="120px">
      <el-form-item label="企业" prop="firmId">
        <el-select v-model="formData.firmId"  style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in firmList"
            :key="item.firmId"
            :label="item.firmName"
            :value="item.firmId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="域名" prop="domain">
        <el-input v-model="formData.domain" placeholder="请输入域名"></el-input>
      </el-form-item>
      <template>
        <el-transfer
          :titles="['全部标签', '已选标签']"
          filter-placeholder="第三方标签"
          v-model="formData.flags"
          @change="handleChange"
          :props="{ key: 'flagId',label: 'flag' }"
          :data="allFlags">
        </el-transfer>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
  function defaultData() {
    return {
      firmId: "",
      domain: "",
      flags: []
    }
  };
  export default {
    name: "paramEdit",
    props: ["markId"],
    data() {
      return {
        formData: defaultData(),
        firmList: [],
        allFlags: [],
        formRules: {
          firmId: [
            {required: true, message: "请选择企业", trigger: "blur"}
          ],
          domain: [
            {required: true, message: "请输入域名", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      loadFirms() {
        this.$store
          .dispatch("productMark/getFirmList"
          )
          .then(data => {
            this.firmList = data;
            console.log(this.firmList)
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadFlags() {
        this.$store
          .dispatch("productMark/getFlagList")
          .then(data => {
            this.allFlags = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getOne(markId) {
        this.$store
          .dispatch("productMark/getOne", markId)
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = true;
      },
      handleSave() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.$emit('onSave', this.formData);
          }
        });
      },
    handleChange(value) {
      this.formData.flags = value;
    }
    },
    created() {
      this.loadFirms();
      this.loadFlags();
      if ('' != this.markId && this.markId != null) {
        this.getOne(this.markId);
      }
    }
  }
  ;
</script>
