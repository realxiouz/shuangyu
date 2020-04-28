<template>
  <div id="main">
    <div id="form">
      <el-main>
        <div class="formTitle">
          添加平台账号
          <el-button id="addButton" type="primary" size="mini" @click="addAccountClick">添加</el-button>
        </div>
        <el-form :model="account" :inline="true" label-position="left" label-width="80px" size="mini">
          <el-row>
            <el-form-item label="平台账号">
              <el-input v-model="account.username" placeholder="请输入平台账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="account.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="登录地址">
              <el-input v-model="account.loginUrl" placeholder="请输入登录地址"></el-input>
            </el-form-item>
            <el-form-item label="token">
              <el-input v-model="account.token" placeholder="请输入token"></el-input>
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="account.secretKey" placeholder="请输入secretKey"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-main>
    </div>
    <div id="table">
      <el-table :data="accounts" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"  width="140"></el-table-column>
        <el-table-column prop="password" label="密码" align="center" width="140"></el-table-column>
        <el-table-column prop="loginUrl" label="登录URL" align="center" width="140"></el-table-column>
        <el-table-column prop="token" label="token" align="center" width="140"></el-table-column>
        <el-table-column prop="secretKey" label="secretKey" align="center" width="140"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="removeButton" v-show="permitRemoveBtn">
        <el-button type="primary" size="mini" @click="removeSelected">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["accounts", "alterAble"],
        data() {
            return {
                account: {},
                permitRemoveBtn: false,
                selectedAccount: []
            }
        },
        methods: {
            defaultAccountForm() {
                return {
                    //openId
                    openId: null,
                    //用户名
                    username: null,
                    //密码
                    password: null,
                    //登录URL
                    loginUrl: null,
                    token: null,
                    secretKey: null
                }
            },
            addAccountClick() {
                if (this.alterAble){
                    //选择了Open平台后才允许添加数据
                    let _account = this.account;
                    if (_account.username && _account.password && _account.loginUrl){
                        //当用户名、密码及登录地址不为空时才能添加数据
                        this.accounts.push(this.account);
                        this.clearForm();
                    }else {
                        //提示用户继续将数据填写完整
                        this.$message({
                            type: "warning",
                            message: "请将数据填写完整！"
                        });
                        return;
                    }
                }else {
                    //用户不可以添加数据
                    this.$message({
                        type: "warning",
                        message: "!!!"
                    });
                    this.clearForm();
                }
            },
            clearForm() {
                this.account = this.defaultAccountForm();
            },
            handleSelectionChange(selection){
                if (0 != selection.length){
                    this.permitRemoveBtn = true;
                    this.selectedAccount = selection;
                }else {
                    this.permitRemoveBtn = false;
                }
            },
            handleRemove(idx, row) {
                let _accountId = row.accountId;
                if (_accountId && '' != _accountId){
                    this.$store.dispatch("openAccount/removeOne", {openAccountId: _accountId})
                        .catch(error => {
                            console.log(error);
                        });
                }
                this.accounts.splice(idx, 1);
            },
            removeSelected(){
                this.selectedAccount.forEach( item => {
                    this.handleRemove(this.accounts.indexOf(item), item);
                })
            }
        },
    }
</script>

<style>
  #main {
    overflow: hidden;
  }

  #form {
    width: 36%;
    padding-left: 2%;
    margin-top: 12px;
    float: left;
  }
  #form .el-main {
    padding: 0;
  }

  #form .formTitle {
    height: 30px;
    font-size: 20px;
  }

  #form form {
    margin-top: 20px;
  }

  #form button {
    height: 80%
  }

  #table {
    margin-left: 10px;
    display: inline-block;
  }

  #form #addButton {
    margin-right: 17%;
    float: right;
  }

  #removeButton {
    margin-top: 30px;
  }

  #removeButton button {
    margin-right: 10px;
    float: right;
  }
</style>
