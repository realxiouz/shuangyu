<template>
  <div>

    <div id="table">
      <el-table :data="contacts" style="width: 100%">
        <template slot="empty"></template>
        <el-table-column prop="fullName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleRemove(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="form">
        <el-form :rules="rules" :model="contact" :inline="true" size="mini">
          <el-form-item lable prop="fullName">
            <el-input type="text" v-model="contact.fullName" placeholder="请输入姓名.."></el-input>
          </el-form-item>
          <el-form-item lable prop="phone">
            <el-input type="text" v-model="contact.phone" placeholder="请输入电话.."></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="text" v-model="contact.email" placeholder="请输入邮箱.."></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="mini" @click="addContactClick">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["contacts"],
        data() {
            const validateMobile = (rule, value, callback) => {
                let mobile_mode = /^1[34578]\d{9}$/;
                if (!value) {
                    callback(new Error("请输入手机号"));
                } else if (!mobile_mode.test(value)) {
                    callback(new Error("您输入的手机号码格式不正确"));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                let email_mode = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if (!value) {
                    callback(new Error("请输入邮箱号"));
                } else if (!email_mode.test(value)) {
                    callback(new Error("您输入的邮箱格式错误！"));
                } else {
                    callback();
                }
            };
            return {
                contact: {},
                rules: {
                    fullName: [
                        {required: true, message: "请输入联系人", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    phone: [
                        {required: true, validator: validateMobile, trigger: "blur"}
                    ],
                    email: [
                        {required: true, validator: validateEmail, trigger: "blur"}
                    ]
                }

            }
        },
        methods: {
            defaultContactForm(){
                return {
                    fullName: null,
                    phone: null,
                    email: null
                }
            },
            addContactClick(){
                if (!this.contact.fullName || !this.contact.phone ||!this.contact.email){
                    this.$message("请填写完整联系人信息！")
                    return false;
                }
                this.contacts.push(this.contact);
                this.clearContactForm();

            },
            clearContactForm(){
                this.contact = this.defaultContactForm();
            },
            handleRemove(idx){
                this.contacts.splice(idx,1);
            }
        },
    }
</script>

<style>
  #table {
    width: 34%;
    height: 250px;
    margin-left: 10px;
  }

  #form {
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
  }

  #form .el-input__inner {
    padding: 0;
  }

  #form input {
    flex: 1;
  }

  #form button {
    height: 80%
  }

  .el-table__empty-block {
    display: none;
  }
</style>
