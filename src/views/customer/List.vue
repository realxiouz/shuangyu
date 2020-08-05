<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" style="margin-bottom:15px; margin-left:25px;">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="handleAdd"
        >添加</el-button
      >
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      size="mini"
      :data="tableData"
      row-key="merchantId"
      highlight-current-row
      fit
    >
      <el-table-column
        prop="firm.firmName"
        label="客户名称"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="firm.firmCode"
        label="客户代码"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="firm.fullName"
        label="联系人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="firm.phone"
        label="联系人电话"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="firm.email"
        label="邮箱"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="firm.address"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column prop="priority" label="重要性" align="center">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.priority"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="340">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="onEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="onDel(scope.row.merchantId)"
            >删除</el-button
          >
          <el-button
            size="mini"
            :type="scope.row.staffId ? 'success' : 'info'"
            :disabled="scope.row.staffId ? true : false"
            @click="handleAssociate(scope.row)"
            >关联用户
          </el-button>
           <el-button
            type="primary"
            size="mini"
            @click="onConfig(scope.row.merchantId)"
            >配置</el-button
          >
          <!--            <span v-show="scope.row.openId && '' != scope.row.openId">
                        <el-button type="info" size="mini" @click="handleSupplement(scope.row)">配置管理</el-button>
                                    </span>-->
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
                @click="handleSaveRelation"
              >
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
  data() {
    return {
      userDialogVisible: false,
      userData: {},
      //关联用户时用于记录当前选中的用户对象
      curRow: {},
      keyName:'merchantId',
      actions: {
        getPageList: 'firmMerchant/getCustomerPageList',
        removeOne: 'firmMerchant/removeOne'
      }
    };
  },
  methods: {
    loadTotal(params) {
      this.$store
        .dispatch("firmMerchant/getCustomerTotal", { filter: params })
        .then(data => {
          if (data) {
            this.total = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*根据关键字进行客户搜索*/
   
    handleAdd() {
      this.skipDetail();
    },
    /*点击编辑*/
    onEdit(index, row) {console.log(index)
      this.skipDetail(row.merchantId);
    },
   
    handleSupplement(row) {
      this.$router.push({
        path: row.configUri,
        query: {
          domain: row.firm.domain,
          openId: row.openId,
          firmId: row.firm.firmId
        }
      });
    },
   
    handleAssociate(row) {
      let params = {};
      params.phone = row.firm.phone;
      params.email = row.firm.email;

      this.$store
        .dispatch("user/getFirstOne", {
          filter: params
        })
        .then(data => {
          if (data) {
            this.userData = data;
            this.userData.firmId = row.firm.firmId;
            this.userDialogVisible = true;
          } else {
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
    //当前选中用户对象
    handleRowClick(row) {
      this.curRow = row;
    },
    handleSaveRelation() {
      this.$store
        .dispatch("firmMerchant/associateUser", {
          userId: this.userData.userId,
          staffId: this.userData.firmId
        })
        .then(data => {
          this.userDialogVisible = false;
          if (data) {
            this.$message({
              type: "success",
              message: "关联成功！"
            });
          } else {
            this.$message({
              type: "info",
              message: "关联失败！"
            });
          }
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    initGender(gender) {
      return 0 == gender ? "男" : "女";
    },
    /*跳转到供应商编辑页面，merchantId用于编辑记录时进行查找。*/
    skipDetail(merchantId) {
      this.$router.push({
        path: "/customer/edit",
        query: { merchantId: merchantId }
      });
    },
    onConfig(merchantId) {
      this.$router.push({
        path: "/customer/config",
        query: { merchantId: merchantId }
      });
    }
  },
  components: {
    search
  }
};
</script>
