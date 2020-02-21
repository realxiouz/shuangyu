<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchForm.region" placeholder="性别">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="nickName"
        label="昵称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="fullName"
        label="姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="birthDate"
        label="出生日期"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="idCardNo"
        label="身份证号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="isSuper"
        label="是否超级管理员"
        width="150"
      ></el-table-column>
      <el-table-column prop="isEnable" label="是否启用"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="姓名">
          <el-input v-model="form.fullName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            type="text"
            placeholder="请输入手机号码"
            v-model="form.phone"
            maxlength="11"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input
            type="text"
            placeholder="请输入身份证号码"
            v-model="form.idCardNo"
            maxlength="18"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.comment"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.enable"></el-switch>
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
    import {getUserList} from '@/api/user'

    export default {
        name: "user",
        data() {
            return {
                searchForm: {},
                lastId: '0',
                pageFlag: 'next',
                pageSize: 10,
                total: 0,
                form: {
                    fullName: "",
                    sex: "男",
                    birthday: "",
                    phone: "",
                    idCardNo: "",
                    comment: "",
                    enable: true
                },
                dialogVisible: false,
                tableData: null
            };
        },
        methods: {
            loadData() {
                getUserList(this.pageFlag, this.pageSize, this.lastId, this.searchForm).then(response => {
                    console.log(response.data)
                    if (response.data) {
                        this.tableData = response.data
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleSearch() {

            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
                this.$store
                    .dispatch("user/add", this.form)
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },
            handleSizeChange: function (pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            prevClick: function () {
                this.pageFlag = 'prev';
                this.lastId = this.tableData[0].appId;
                this.loadData();
            },
            nextClick: function () {
                this.pageFlag = 'next';
                this.lastId = this.tableData[this.tableData.length - 1].appId;
                this.loadData();
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
