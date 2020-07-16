<template>
  <div>
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="16">
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table size="mini" :data="contacts" style="width: 100%" fit>
        <el-table-column prop="fullName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="prop">
            <span>{{initGender(prop.row.gender)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birthDate" label="出生日期" align="center">
          <template slot-scope="prop">
            <i v-if="prop.row.birthDate" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(prop.row.birthDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="editDialogClosed" width="24%">
      <el-form :model="contact" :rules="rules" ref="contactForm" label-position="left" label-width="80px" size="mini">
        <el-form-item label="姓名" prop="fullName" size="mini">
          <el-input type="text" v-model="contact.fullName" placeholder="请输入姓名.."></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" size="mini">
          <el-input type="text" v-model="contact.phone" placeholder="请输入电话.."></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" size="mini">
          <el-input type="text" v-model="contact.email" placeholder="请输入邮箱.."></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" size="mini">
          <el-select v-model="contact.gender" placeholder="请选择性别.." style="width: 50%">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" size="mini">
          <el-date-picker
            v-model="contact.birthDate"
            type="date"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCardNo" size="mini">
          <el-input type="text" v-model="contact.idCardNo" placeholder="请输入身份证号.."></el-input>
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
        props: ["contacts"],
        data() {
            const valOfPhone = (rule, value, callback) => {
                const reg1 = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                const reg2 = /\d{3}-\d{8}|\d{4}-\d{7}/;
                if (reg1.test(value) || reg2.test(value)) {
                    callback();
                } else {
                    callback(new Error("请输入正确的联系方式！"));
                }
            };

            return {
                dialogVisible: false,
                //是否点击的是编辑
                update: false,
                contact: {},
                tmpContact: {},
                rules: {
                    fullName: [
                        {required: true, message: '请输入联系人姓名', trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入联系方式', trigger: 'blur'},
                        {validator: valOfPhone, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            defaultContactForm() {
                return {
                    //姓名
                    fullName: null,
                    //手机号
                    phone: null,
                    //电子邮箱
                    email: null,
                    //性别
                    gender: 0,
                    //出生日期
                    birthDate: 946656000000,
                    //身份证号
                    idCardNo: '',
                    //类型（0：员工，1：联系人）
                    type: 1
                }
            },
            clearContactForm() {
                this.contact = this.defaultContactForm();
            },
            handleAdd() {
                this.update = false;
                this.clearContactForm();
                this.dialogVisible = true;
            },
            handleConfirm() {
                this.$refs['contactForm'].validate((valid) => {
                    if (valid) {
                        //如果点击的是编辑,对原有的对象进行覆盖。
                        if (this.update) {
                            Object.assign(this.contacts[this.contacts.indexOf(this.tmpContact)], this.contact);
                            this.dialogVisible = false;
                        } else {
                            //否则新增到列表中
                            this.contacts.push(this.contact);
                            this.dialogVisible = false;
                        }
                    } else {
                        this.$message({type: "Warning", message: "请完整填写数据！"});
                        return false;
                    }
                });
            },
            onEdit(idx, row) {
                this.update = true;
                this.contact = Object.assign({}, row);
                this.tmpContact = row;
                this.dialogVisible = true;
            },
            handleRemove(idx, row) {
                let _contactId = row.contactId;
                if (_contactId && '' != _contactId) {
                    this.$store.dispatch("firmContact/removeOne", {contactId: _contactId})
                        .catch(error => {
                            console.log(error);
                        });
                }
                this.contacts.splice(idx, 1);
            },
            /*初始化列表中的日期格式*/
            formatDate(dateStr, format) {
              let date = new Date(dateStr);
              return this.$moment(date).format(format);
            },
            initGender(gender) {
                return 0 == gender ? "男" : "女";
            },
            //编辑窗口关闭结束时执行
            editDialogClosed(){
              this.$refs['contactForm'].clearValidate();
            }
        },
        created() {
            this.clearContactForm();
        }
    }
</script>
