<template>
  <div id="main">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="16">
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table :data="accounts" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="username" label="登录账号" align="center"></el-table-column>
        <el-table-column prop="password" label="登录密码" show-password align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="title" v-show="permitRemoveBtn">
        <el-button type="primary" size="mini" @click="removeSelected">删除</el-button>
      </div>
    </el-col>
    <el-dialog title="编辑账号" :visible.sync="dialogVisible" :close-on-click-modal="false" width="24%">
      <el-form :model="account" :rules="rules" ref="accountForm" label-position="left" label-width="80px" size="mini">
        <el-form-item label="登录账号" prop="username">
          <el-input v-model="account.username" placeholder="请输入平台账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="account.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="登录地址" prop="loginUrl">
          <el-input v-model="account.loginUrl" placeholder="请输入登录地址"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="account.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        props: ["accounts"],
        data() {
            return {
                account: {},
                dialogVisible: false,
                permitRemoveBtn: false,
                update: false,
                selectedAccount: [],
                tmpAccount: {},
                rules: {
                    username: [
                        {required: true, message: '请输入登录账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'}
                    ],
                    loginUrl: [
                        {required: true, message: '请输入登录地址', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            defaultAccountForm() {
                return {
                    //登录账号
                    username: null,
                    //登录密码
                    password: null,
                    //登录地址
                    loginUrl: null,
                    //备注
                    remark: ''
                }
            },
            clearForm() {
                this.account = this.defaultAccountForm();
            },
            handleSelectionChange(selection) {
                if (0 != selection.length) {
                    this.permitRemoveBtn = true;
                    this.selectedAccount = selection;
                } else {
                    this.permitRemoveBtn = false;
                }
            },
            handleAdd() {
                this.update = false;
                this.clearForm();
                this.dialogVisible = true;
            },
            handleConfirm() {
                this.$refs['accountForm'].validate((valid) => {
                    if (valid) {
                        if (this.update){
                            Object.assign(this.accounts[this.accounts.indexOf(this.tmpAccount)], this.account);
                            this.dialogVisible = false;
                        }else {
                            //否则新增到列表中
                            this.accounts.push(this.account);
                            this.dialogVisible = false;
                        }
                    } else {
                        this.$message({type: "Warning", message: "请完整填写数据！"});
                        return false;
                    }
                });
            },
            handleEdit(idx, row) {
                this.update = true;
                this.account = Object.assign({}, row);
                this.tmpAccount = row;
                this.dialogVisible = true;
            },
            handleRemove(idx, row) {
                let _accountId = row.accountId;
                if (_accountId && '' != _accountId) {
                    this.$store.dispatch("firmAccount/removeOne", {accountId: _accountId})
                        .catch(error => {
                            console.log(error);
                        });
                }
                this.accounts.splice(idx, 1);
            },
            removeSelected() {
                this.selectedAccount.forEach(item => {
                    this.handleRemove(this.accounts.indexOf(item), item);
                })
            }
        },
    }
</script>

