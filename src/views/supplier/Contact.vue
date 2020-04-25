<template>
  <div id="main">
    <div id="form">
      <el-main>
        <div class="formTitle">
          添加联系人
          <el-button id="addButton" type="primary" size="mini" @click="addContactClick">添加</el-button>
        </div>
        <el-row>
          <el-form :rules="rules" :model="contact" :inline="true" label-position="left" label-width="80px" size="mini">
            <el-row>
              <el-form-item label="姓名" prop="fullName">
                <el-input type="text" v-model="contact.fullName" placeholder="请输入姓名.."></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input type="text" v-model="contact.phone" placeholder="请输入电话.."></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="contact.email" placeholder="请输入邮箱.."></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-row>
      </el-main>
    </div>
    <div id="table">
      <el-table :data="contacts" style="width: 100%">
        <el-table-column prop="fullName" label="姓名" align="center" width="160"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center" width="160"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="160"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
                    email: null,
                    //类型（0：员工，1：联系人）
                    type: 1
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
            handleRemove(idx, row){
                let _contactId = row.staffId;
                if (_contactId && '' != _contactId){
                    this.$store.dispatch("staff/removeOne", {staffId: _contactId, deptId: row.firmId})
                        .catch(error => {
                            console.log(error);
                        });
                }
                this.contacts.splice(idx,1);
            }
        },
        created() {
            this.clearContactForm();
        }
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
</style>
