<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        size="mini"
        :data="tableData"
        row-key="merchantId"
      >
        <el-table-column prop="firm.firmName" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="firm.firmCode" label="供应商代码" align="center"></el-table-column>
        <el-table-column prop="firm.fullName" label="联系人" align="center"></el-table-column>
        <el-table-column prop="firm.phone" label="联系人电话" align="center"></el-table-column>
        <el-table-column prop="firm.email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="firm.address" label="地址" align="center"></el-table-column>
        <el-table-column prop="priority" label="重要性" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled/>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="350">
          <template slot-scope="scope">
            <el-button type="text" size="mini" class="btn-primary" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" class="btn-primary" v-if="scope.row.staffId" 
                       @click="handleAssociate(scope.row)">查看用户
            </el-button>
            <el-button type="text" size="mini" class="btn-primary" v-else 
                       @click="handleAssociate(scope.row)">关联用户
            </el-button>
            <el-button
            type="text" size="mini" class="btn-primary"
            @click="onConfig(scope.row)"
            >配置</el-button>
            <el-button type="text" size="mini" class="btn-danger" @click="onDel(scope.row.merchantId)">删除</el-button>
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
      <!-- 员工查询弹窗 -->
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
                <el-button size="mini" align="center" type="primary" v-if="relevance" @click="handleSaveRelation">
                  确认关联
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    import search from "./Search";
    import {MIXIN_LIST} from "@/utils/mixin";

    export default {
      mixins: [MIXIN_LIST],
        name: "woniuConfig",
        data() {
            return {
                userDialogVisible: false,
                userData: [],
                openId:'',
                relevance:false,
                keyName:'merchantId',
                actions: {
                  getPageList: 'firmMerchant/getSupplierPageList',
                  removeOne: 'firmMerchant/removeOne'
                }
            };
        },
        methods: {
            handleAssociate(row) {
                let params = {};
                params.phone = row.firm.phone;
                params.email = row.firm.email;
                this.$store
                    .dispatch("firm/getUserOne", {
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.userData = data;
                            this.userData.firmId = row.firm.firmId;
                            this.userDialogVisible = true;
                        } else if(row.staffId){
                          this.$confirm("关联用户可能已被删除，请重新关联用户", "提示", {
                          confirmButtonText: "重新关联",
                          cancelButtonText: "取消",
                          type: "warning"
                          }).then(()=>{
                            this.$store
                            .dispatch("firm/getUserOne",{
                              filter: params
                            })
                            .then(data => {
                                if(data){
                                this.userData = data;
                                this.userData.firmId = row.firm.firmId;
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
           
            handleAdd() {
                this.skipDetail();
            },
            onEdit(index, row) {
              this.skipDetail(row.firm.firmId);
            },
            handleSupplement(row) {
                this.$router.push({
                    path: row.configUri,
                    query: {firmId: row.firm.firmId, openId: row.firmId.openId}
                });
            },
            handleSaveRelation() {
                this.$store
                    .dispatch("firmMerchant/associateUser", {
                        userId: this.userData.userId,
                        staffId: this.userData.firmId
                    })
                    .then((data) => {
                      this.userDialogVisible = false;
                      if(data){
                        this.$message({
                          type:"success",
                          message:"关联成功！"
                        });
                      }else{
                        this.$message({
                          type:"info",
                          message:"关联失败！"
                        });
                      }
                      this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            
            initGender(gender) {
                return 0 === gender ? "男" : "女";
            },
            /*跳转到供应商编辑页面，merchantId用于编辑记录时进行查找。*/
            skipDetail(merchantId) {
                this.$router.push({path: '/supplier/edit'});
                localStorage.setItem("merchantId", merchantId);
            },
            onConfig(row) {
              if(row.openId){
                let lastName = this.$router.history.current.name;
                localStorage.setItem("lastName", lastName);
                localStorage.setItem("firmId", row.firmId);
                localStorage.setItem("firmDomain", row.domain);
                localStorage.setItem("merchantId", row.firm.firmId);
                localStorage.setItem("merchantDomain", row.firm.domain);
                localStorage.setItem("openId", row.openId);
                 this.$router.push({
                   path: "/firm/config"
                 });
              }else{
                this.$confirm('请先选择开放平台, 才能进行配置操作，是否去选择开放平台?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$router.push({
                    path: "/supplier/edit?merchantId=" + row.merchantId
                  });
                }).catch(() => {

                });
              }
            }
        },
        
        components: {
            search
        }
    };
</script>
