<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="text" @click="dialogVisible = true">添加</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="code"
            label="三字码"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="机场名称"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="city"
            label="机场所在城市"
            width="300"
          ></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="机场信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="三字码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="机场名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="机场所在城市">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'airport',
    data() {
      return {
        form: {
          code: '',
          name: '',
          city: ''
        },
        dialogVisible: false,
        tableData: null
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch('airport/list')
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.$store
          .dispatch('airport/add', this.form)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      }
    },
    mounted() {
      this.loadData();
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
