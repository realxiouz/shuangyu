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
        <el-button type="primary" @click="addUser">添加</el-button>
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
      <el-table-column prop="isEnable" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            on-color="#00A854"
            on-text="启动"
            on-value=true
            off-color="#F04134"
            off-text="禁止"
            off-value=false
            @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="350">
        <template slot-scope="scope">
          <el-button @click="userUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="removeOne(scope.row.appId,scope.$index,tableData)" type="danger"
                     size="mini">删除
          </el-button>
        </template>
      </el-table-column>
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
        <el-form-item label="昵称">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
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
        <el-form-item label="是否超级管理员">
          <el-switch v-model="form.super" :active-value=true :inactive-value=false></el-switch>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.enable" :active-value=true :inactive-value=false></el-switch>
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
    import {getUserList, save, updUser,getUserTotal} from '@/api/user'

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
                    nickName: '',
                    fullName: "",
                    sex: "男",
                    birthday: "",
                    phone: "",
                    idCardNo: "",
                    comment: "",
                    super: false,
                    enable: true
                },
                dialogVisible: false,
                tableData: null
            };
        },
        methods: {
            userUpdate(row) {
                this.dialogVisible = true;
                this.form = row;
            },
            addUser() {
                this.form = {};
                this.dialogVisible = true;
            },
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
                const params = this.form
                save(params).then(() => {
                    this.loadData();
                    this.loadTotal();
                }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = false;
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            prevClick() {
                this.pageFlag = 'prev';
                this.lastId = this.tableData[0].appId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = 'next';
                this.lastId = this.tableData[this.tableData.length - 1].appId;
                this.loadData();
            },
            changeSwitch(data) {
                updUser(data).then(() => {
                    this.loadData();
                }).catch(error => {
                    console.log(error);
                });
            },
            loadTotal() {
                if (!this.searchForm.appName) {
                    this.searchForm = {};
                }
                getUserTotal(this.searchForm).then(response => {
                    this.total = response.data;
                }).catch(error => {
                    console.log(error);
                });
            },
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
