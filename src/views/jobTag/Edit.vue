<template>
  <div>
    <el-form ref="jobTagForm" size="mini" :model="formData" label-width="110px" :rules="formRules">
      <input type="hidden" v-model="formData.tagId"/>
      <el-row :gutter="5">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标签类别:">
            <el-select
              v-model="formData.tagType"
              clearable
              placeholder="支付方式"
              style="width: 100%"
            >
              <el-option
                v-for="item in tagTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标签名称" prop="tagName">
            <el-input placeholder="标签名称" v-model="formData.tagName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标签编码" prop="tagCode">
            <el-input placeholder="标签编码" v-model="formData.tagCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="备注" prop="remark">
            <el-input placeholder="备注" v-model="formData.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'jobTagEdit',
    props: ["jobTagId", 'updateFlag'],
    data() {
      return {
        formData: {},
        tagTypes:[
          {
            label:"工厂",
            value:1
          }
        ],
        formRules: {
          tagType: {required: true, trigger: "blur"},
          tagName: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"}
        }
      }
    },
    methods: {
      defaultFormData() {
        return {
          tagId: '',
          tagName: '',
          tagCode: '',
          tagType: '',
          remark: '',
          sort: 0
        };
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      loadJobTagData() {
        if (this.jobTagId && this.jobTagId != '') {
          this.$store
            .dispatch("jobTag/getOne", {id: this.jobTagId})
            .then(data => {
              if (data.code == 0) {
                this.formData = data.data;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },

      handleSave() {
        let url = '';
        if (this.updateFlag) {
          url = 'jobTag/updateOne/' + this.formData.tagId;
        } else {
          url = 'jobTag/addOne';
        }
        this.$store
          .dispatch(url, {jobTag: this.formData})
          .then(() => {
            this.$emit("onSave");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    computed: {

    },
    created() {
      this.clearForm();
      this.loadJobTagData();
    },
  };

</script>
