<template>
  <div>
    <el-row>
      <search class="page-search" ref="search" @onSearch="searchStaffList"/>
    </el-row>
    <el-row
      type="flex"
      justify="space-between"
      align="bottom"
    >
      <span style="font-weight:700;color:#303133;" v-if="!staffAddVisible">{{
        this.curNode.deptName
      }}</span>
      <el-row class="page-tools">
        <el-button
          type="primary"
          size="mini"
          @click="adjustStaff"
          :disabled="staffAddVisible"
          >调整部门
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="searchStaff"
          :disabled="staffAddVisible"
          >选择用户添加
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addStaff"
          :disabled="staffAddVisible"
          >添 加
        </el-button>
      </el-row>
    </el-row>
    <!-- 员工列表 -->
    <el-table
      highlight-current-row
      v-loading="loading"
      stripe
      size="mini"
      style="width: 100%;"
      fit
      :selectable="selectable"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" ></el-table-column>
      <el-table-column
        prop="fullName"
        label="姓名"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="gender" label="性别" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            initGender(scope.row.gender)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" width="150" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate, "YYYY-MM-DD") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.staffType == 1 ? true : false"
            type="text" size="mini" class="btn-primary"
            @click="permissionChange(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-button
            type="text" size="mini" class="btn-primary"
            v-if="scope.row.userId"
            @click="handleAssociate(scope.row)"
            >查看用户
          </el-button>
          <el-button
            v-else
            type="text" size="mini" class="btn-primary"
            @click="handleAssociate(scope.row)"
            >关联用户
          </el-button>
          <el-button
            :disabled="scope.row.staffType == 1 ? true : false"
           type="text" size="mini" class="btn-danger"
            @click="onDel(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      center
      title="关联用户"
      width="45%"
      :visible.sync="userDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="userData" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="昵称:">
              <span>{{ userData.nickName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="姓名:">
              <span>{{ userData.fullName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="性别:">
              <span>{{ initGender(userData.gender) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="电话:">
              <span>{{ userData.phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="邮箱:">
              <span>{{ userData.email }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button
                size="mini"
                align="center"
                @click="userDialogVisible = false"
                >取 消</el-button
              >
              <el-button
                size="mini"
                align="center"
                type="primary"
                v-if="relevance"
                @click="handleSaveRelation"
              >
                确认关联
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      center
      title="员工信息"
      width="35%"
      :visible.sync="permissionDialogVisible"
      :close-on-click-modal="false"
      @closed="staffDialogClosed"
    >
      <el-form
        ref="staffForm"
        :model="formData"
        :rules="rules"
        size="mini"
        label-width="120px"
      >
        <!--   企业ID  -->
        <el-form-item label="员工姓名:">
          <el-input
            type="text"
            placeholder="请输入姓名"
            v-model="formData.fullName"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select
            v-model="formData.gender"
            placeholder="请选择性别"
            style="width:100%"
          >
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formData.birthDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model="formData.idCardNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input
            placeholder="请输入手机号码"
            v-model="formData.phone"
            maxlength="11"
            show-word-limit
            :disabled="isRelation"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" :disabled="isRelation"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="roles">
          <el-select
            style="width: 100%;"
            clearable
            multiple
            v-model="formData.roles"
            placeholder="请选择"
          >
            <el-option
              v-for="item in transData"
              :key="item.roleName"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="permissionAlterCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="permissionAlterSave"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      center
      width="70%"
      :visible.sync="searchDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form :inline="true" :model="searchUserForm">
        <el-form-item label="昵称:" size="mini">
          <el-input
            clearable
            v-model="searchUserForm.nickName"
            placeholder="昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名:" size="mini">
          <el-input
            clearable
            v-model="searchUserForm.fullName"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" size="mini">
          <el-input
            clearable
            v-model="searchUserForm.phone"
            placeholder="电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" size="mini">
          <el-input
            clearable
            v-model="searchUserForm.email"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="handleUserSearch"
            >搜索用户</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        highlight-current-row
        v-loading="loading"
        stripe
        size="mini"
        style="width: 100%;"
        fit
        :data="searchTableData"
      >
        <el-table-column
          prop="nickName"
          label="昵称"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="fullName"
          label="姓名"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="gender" label="性别" width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              initGender(scope.row.gender)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" width="150" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              formatDate(scope.row.birthDate, "YYYY-MM-DD")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleUser(scope.row)"
              >确定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      title="调整部门"
      width="30%"
      :visible.sync="departmentDialogVisible"
      :close-on-click-modal="false"
    >
      <el-tree
        ref="tree"
        style="margin-bottom:15px"
        show-checkbox
        v-loading="loading"
        node-key="deptId"
        :data="treeData"
        :props="treeProps"
        :highlight-current="true"
        :expand-on-click-node="false"
        default-expand-all
        @check-change="handleCheckChange"
      ></el-tree>
      <el-button size="mini" @click="departmentDialogCancel">取消 </el-button>
      <el-button size="mini" type="primary" @click="departmentSave()"
        >保存
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import search from "./Search";
export default {
  name: "staffEdit",
  props: ["curNode", "staffAddVisible"],
  data() {
    let validateEmail = (rule, value, callback) => {
      if (this.formData.email === this.updateTempData.email) {
        callback();
      }
      let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱！"));
      } else {
        this.$store
          .dispatch("staff/isExist", {
            email: this.formData.email
          })
          .then(data => {
            if (data) {
              callback("该信息已被注册");
            } else {
              callback();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    };
    return {
      loading: "",
      relevance:false,
      dialogVisible: false,
      permissionDialogVisible: false,
      searchDialogVisible: false,
      departmentDialogVisible: false,
      defaultChecked:false,
      isRelation:true,
      tableData: [],
      treeData: [],
      userData: {},
      formData: {},
      transData: [],
      selStaff: [],
      staffIds: [],
      deptIds: [],
      searchTableData: [],
      defaultExpandedKeys: [],
      updateTempData: {},
      searchUserForm: {},
      transferProps: {
        key: "roleId",
        label: "roleName"
      },
      treeProps: {
        label: "deptName",
        children: "children"
      },
      userDialogVisible: false,
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  methods: {
     searchStaffList(params){
       this.$store
        .dispatch("staff/getList", {
          filter: params? params : { deptId: this.curNode.deptId }
        })
        .then(data => {
          if (data) {
            console.log(data);
             if (data) {
               this.tableData = data;
             }
             this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    defaultFormData() {
      return {
        staffId: "",
        userId: "",
        firmId: "",
        fullName: "",
        gender: 0,
        birthDate: new Date(),
        phone: "",
        email: "",
        idCardNo: "",
        deptID: "",
        domain: "",
        roles: [],
        //类型（0：员工，1：联系人）
        staffType: 0
      };
    },
    selectable(){
      if(this.staffAddVisible){
        return false
      }else{
        return true
      }
    },
    handleSelectionChange(val) { 
      if (val && val.length > 0) {
        val.forEach(obj => {
          if(obj.staffId && this.staffIds.indexOf(obj.staffId) < 0){
            this.staffIds.push(obj.staffId);
          }
        });
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      if (data && data.deptId) {
        let index = this.deptIds.indexOf(data.deptId);
        if (checked && index < 0) {
          this.deptIds.push(data.deptId);
        } else if (index > -1) {
          this.deptIds.splice(index, 1);
        }
      }
    },
    /*获取部门树*/
    loadTreeData() {
      this.$store
        .dispatch("dept/getTreeList", {
          filters: {}
        })
        .then(data => {
          this.defaultExpandedKeys = [];
          if (data) {
            this.treeData = data;
            this.defaultExpandedKeys.push(data[0].deptId);
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*获取该部门下的员工列表*/
    loadTableData(params) {
      this.loading = true;
      this.$store
        .dispatch("staff/getList", {
          filter: params? params : { deptId: this.curNode.deptId }
        })
        .then(data => {
          if (data) {
            if (data) {
              this.tableData = data;
            }
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 点击调整按钮
    adjustStaff() {
      if (this.staffIds && this.staffIds.length > 0) {
        this.departmentDialogVisible = true;
      } else {
        this.$confirm("请先选择需要调整部门的员工", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      }
    },
    //保存部门调整
    departmentSave() {
      if (this.staffIds && this.staffIds.length > 0 && this.deptIds && this.deptIds.length > 0 ) {
        this.$store
          .dispatch("staff/updateMany", {
            ids: this.staffIds,
            data: {
              depts: this.deptIds
            }
          })
          .then(res => {
            //数据保存成功后可以关闭弹窗
            this.departmentDialogVisible = false;
            this.staffIds=[]
            this.loadTableData()
            this.$refs.tree.setCheckedKeys([])
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    toggleSelection() {
      let that = this;
      if (that.selStaff && that.selStaff.length > 0) {
        that.$nextTick(() => {});
      }
    },
    searchStaff() {
      this.searchDialogVisible = true;
    },
    handleUser(data) {
      this.permissionDialogVisible = true;
      this.formData = data;
      this.searchDialogVisible = false;
    },
    /*点击添加按钮*/
    addStaff() {
      this.clearFormData();
      this.permissionDialogVisible = true;
    },
    /*加载所有的角色信息*/
    loadRoles() {
      this.clearRoles();
      this.$store
        .dispatch("role/getUserRole", { flog: 0 })
        .then(data => {
          this.transData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleUserSearch() {
      const newParams = {};
      for (let key in this.searchUserForm) {
        if (this.searchUserForm[key]) {
          newParams[key] = this.searchUserForm[key];
        }
      }
      this.$store
        .dispatch("user/getList", {
          filter: newParams
        })
        .then(data => {
          if (data) {
            this.searchTableData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*点击修改*/
    permissionChange(idx, row) {
      this.clearFormData();
      /*根据对应的员工ID查询对应的用工对象*/
      this.$store
        .dispatch("staff/getOne", {
          staffId: row.staffId
        })
        .then(data => {
          this.loading = false;
          /*如果请求到的数据roles为null会报错*/
          if (!data.roles) {
            data.roles = [];
          }
          this.formData = data;
          if(!this.formData.userId){
            this.isRelation = false
          }else{
            this.isRelation = true
          }
          Object.assign(this.updateTempData, data);
        })
        .catch(error => {
          console.log(error);
        });
      this.permissionDialogVisible = true;
    },
    /*点击修改弹窗取消按钮*/
    permissionAlterCancel() {
      this.permissionDialogVisible = false;
    },
    //点击调整部门弹窗取消按钮
    departmentDialogCancel() {
      this.departmentDialogVisible = false;
    },
    /*点击修改弹窗保存按钮*/
    permissionAlterSave() {
      this.$refs["staffForm"].validate(valid => {
        if (valid) {
          //对添加的员工信息进行初始化和格式化
          if ("number" != typeof this.formData.birthDate) {
            this.formData.birthDate = this.formData.birthDate.getTime();
          }
          //进行数据的保存
          if (this.formData.staffId && "" != this.formData.staffId) {
            this.$store
              .dispatch("staff/updateOne", {
                id: this.formData.staffId,
                data: this.formData
              })
              .then(() => {
                //数据保存成功后可以关闭弹窗
                this.permissionDialogVisible = false;
                this.loadTableData();
                this.clearFormData();
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.formData.depts = [this.curNode.deptId];
            this.$store
              .dispatch("staff/addOne", this.formData)
              .then(() => {
                //数据保存成功后可以关闭弹窗
                this.permissionDialogVisible = false;
                this.loadTableData();
                this.clearFormData();
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      });
    },
    /*关联用户确认*/
    handleSaveRelation() {
      this.userDialogVisible = false;
      this.$store
        .dispatch("staff/relationUser", {
          userId: this.userData.userId,
          staffId: this.userData.staffId
        })
        .then(data => {
          if (data) {
            this.$message({
              type: "success",
              message: "关联成功！"
            });
            this.loadData();
          } else {
            this.$message({
              type: "info",
              message: "关联失败！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*点击关联用户/查看用户*/
    handleAssociate(row) {
      let params = {};
      params.phone = row.phone;
      params.email = row.email;
      this.$store
        .dispatch("firm/getUserOne", {
          filter: params
        })
        .then(data => {
          if (data) {
            this.userData = data;
            this.userData.staffId = row.staffId;
            this.userDialogVisible = true;
          } else if(row.userId){
              this.$confirm("关联用户可能已被删除，请重新关联用户", "提示", {
              confirmButtonText: "重新关联",
              cancelButtonText: "取消",
              type: "warning"
              }).then(()=>{
                 this.$store
                  .dispatch("firm/getUserOne", {
                    filter: params
                  })
                  .then(data => {
                    if (data) {
                      this.userData = data;
                      this.userData.staffId = row.staffId;
                      this.userDialogVisible = true;
                    } else {
                      this.userData = {};
                      this.$message({
                        type: "info",
                        message: "没有可关联的用户!"
                      });
                    }
                  });
                })
              }else{
                this.userData = {};
                this.$message({
                  type: "info",
                  message: "没有可关联的用户!"
                });
              } 
        })
        .catch(error => {
          console.log(error);
      });
    },
    /*对员工进行删除*/
    onDel(idx, row) {
      this.open(this.delete, row.staffId);
    },
    /*根据对应员工ID*/
    delete(staffId) {
      this.$store
        .dispatch("staff/removeOne", {
          staffId: staffId
        })
        .then(data => {
          console.log(data);
          this.loadTableData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    open(func, data, message) {
      if (!message) {
        message = "确认要删除该数据!";
      }
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          func(data);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (null != dateStr) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    clearTableData() {
      this.tableData = [];
    },
    clearRoles() {
      this.transData = [];
    },
    clearFormData() {
      this.formData = this.defaultFormData();
      this.updateTempData = {};
    },
    //员工信息弹出关闭时执行
    staffDialogClosed() {
      this.$refs["staffForm"].clearValidate();
    }
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    },
    initGender() {
      return function(gender) {
        return 0 == gender ? "男" : "女";
      };
    }
  },
  created() {
    this.loadRoles();
    let params = { staffType: 0 };
    this.loadTableData(params);
    this.loadTreeData();
  },
  watch: {
    curNode() {
      this.clearTableData();
      this.loadTableData();
    }
  },
  components: {
    search
  }
};
</script>
