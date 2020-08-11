<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        highlight-current-row
        v-loading="loading"
        size="mini"
        :data="tableData"
        row-key="firmId"
        :load="loadChildren"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="firmName" label="企业名称" align="left" sortable width="180"></el-table-column>
        <el-table-column prop="firmCode" label="企业代码" align="center" sortable width="100"></el-table-column>
        <el-table-column prop="fullName" label="联系人" align="center" width="180"></el-table-column>
        <el-table-column prop="phone" label="联系人电话" align="center" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" align="left" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="400">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAddChild(scope.row.firmId)">添加子企业</el-button>
            <el-button type="primary" size="mini" @click="onEdit(scope.row.firmId)">编辑</el-button>
            <el-button type="danger" size="mini" @click="onDel(scope.row.firmId)">删除</el-button>
            <el-button size="mini" v-if="scope.row.userId"
                       type="success"
                       @click="handleAssociate(scope.row)">查看用户
            </el-button>
            <el-button size="mini" v-else
                       type="info"
                       @click="handleAssociate(scope.row)">关联用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
       class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
       @current-change="onCurrentChange"
       :current-page.sync="currentPage"
      ></el-pagination>

      <!-- 表单对话框 -->
      
      <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"></edit>
      

      <!-- 员工查询弹窗 -->
      <el-dialog center title="关联用户" width="45%" :visible.sync="userDialogVisible" :close-on-click-modal="false">
        <el-form ref="form" :model="userData" size="mini">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="昵称:">
                <span>{{userData.nickName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="姓名:">
                <span>{{userData.fullName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="性别:">
                <span>{{initGender(userData.gender) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="电话:">
                <span>{{userData.phone}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="邮箱:">
                <span>{{userData.email}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item>
                <el-button size="mini" align="center" @click="userDialogVisible = false">取 消</el-button>
                <el-button size="mini" align="center" type="primary"   @click="handleSaveRelation">确认关联</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

    export default {
      mixins: [MIXIN_LIST],
        data() {
            return {
                dialogVisible: false,
                userDialogVisible: false,
                pid: "",
                staffId: "",
                editFirmId: "",
                userData: {},
                //关联用户时用于记录当前选中的用户对象
                curRow: {},
                firmId:'',
                keyName:'firmId',
                uploadData: {
                    tree: null,
                    treeNode: null,
                    resolve: null
                },
                actions: {
                  getPageList: 'firm/getPageList',
                  removeOne: 'firm/removeOne'
                }
            };
        },
        methods: {
            loadChildren(tree, treeNode, resolve) {
                // tree为点击那一行的数据
                this.uploadData.tree = tree;
                this.uploadData.treeNode = treeNode;
                this.uploadData.resolve = resolve;
                this.$store
                    .dispatch("firm/getAsyncTreeList", {pid: tree.firmId, filter: {}})
                    .then(data => {
                        if (data) {
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            initGender(gender) {
                return gender == 0 ? "男" : "女";
            },
            
            
            //当前选中用户对象
            handleRowClick(row) {
                this.curRow = row;
            },
            handleSaveRelation() {
                this.$store
                    .dispatch("staff/relationUser", {userId: this.userData.userId, staffId: this.userData.firmId})
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
                        this.userDialogVisible = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAssociate(row) {
                let params = {};
                params.phone = row.phone;
                params.email = row.email;
                this.$store
                    .dispatch("user/getFirstOne", {
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.userData = data;
                            this.userData.firmId = row.firmId;
                            this.userDialogVisible = true;
                        }else if(row.userId){
                          this.$confirm("关联用户可能已被删除，请重新关联用户", "提示", {
                            confirmButtonText: "重新关联",
                            cancelButtonText: "取消",
                            type: "warning"
                          }).then(()=>{
                            this.$store
                              .dispatch("user/getFirstOne",{
                                filter: params
                              })
                              .then(data=>{
                                if(data){
                                  this.userData = data;
                                  this.userData.firmId = row.firmId;
                                  this.userDialogVisible = true;
                                }else{
                                  this.userData = {};
                                  this.$message({
                                      type: "info",
                                      message: "没有可关联的用户!"
                                  });
                                }
                              })
                          })
                        }else {
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
            handleCancel() {
                this.dialogVisible = false;
            },
            /*点击添加企业子节点按钮*/
            handleAddChild(firmId) {
                this.pid = firmId;
                this.editFirmId = "";
                this.dialogVisible = true;
            },
           
        },
        
        components: {
      edit,
      search
    },
    };
</script>
