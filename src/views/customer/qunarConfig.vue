<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header">
        <span>订单通知接口管理</span>
      </div>
      <el-form :model="tableData" label-width="130px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="域名:">
            <el-input v-model="tableData.totalAmount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="安全码:">
            <el-input v-model="tableData.totalAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="消息通知地址:">
            <el-input type="textarea" :rows="3" placeholder="请输入消息通知地址" v-model="tableData.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="contentBox">
      <div slot="header">
        <span>订单接口账号管理</span>
      </div>
      <el-form :model="tableData" label-width="130px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="域名:">
            <el-input v-model="tableData.totalAmount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="用户名:">
            <el-input v-model="tableData.totalAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="密码:">
            <el-input v-model="tableData.totalAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="IP:">
            <el-input type="textarea" :rows="3" placeholder="请输入ip,多个ip一行一个" v-model="tableData.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <el-card class="contentBox">
      <div slot="header">
        <span>政策导入接口管理</span>
      </div>
      <el-table :data="tableData" size="mini"  style="width: 100%;">
        <el-table-column prop="dpt" label="用户名称" width="200" align="center"></el-table-column>
        <el-table-column prop="arr" label="IP地址" width="200" align="center"></el-table-column>
        <el-table-column prop="airlineCode" label="回调地址" width="200" align="center"></el-table-column>
        <el-table-column prop="airlineCode" label="备注" width="200" align="center"></el-table-column>
        <el-table-column prop="airlineCode" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleRemove(scope.row.apiId,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
    export default {
        name: "config",
        data() {
            return {
                tableData: []
            }
        }
    }
</script>
