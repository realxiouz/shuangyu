<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加设备</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="设备编码" width="100" prop="deviceCode"/>
      <el-table-column label="设备名称" width="300" prop="deviceName"/>
      <el-table-column label="产品名称" width="200" prop="productName"/>
      <el-table-column label="IP地址" width="100" prop="ip"/>
      <el-table-column label="固件版本" width="100" prop="otaVersion"/>
      <el-table-column label="添加时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{formatDate(scope.row.addDate,"YYYY-MM-DD hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="激活时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{formatDate(scope.row.activationDate,"YYYY-MM-DD hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后上线时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{formatDate(scope.row.lastOnlineTime,"YYYY-MM-DD hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">正常</span>
          <span v-else-if="scope.row.status==1">报警</span>
          <span v-else-if="scope.row.status==2">异常</span>
        </template>
      </el-table-column>
      <el-table-column label="企业名称" width="100" prop="firmName"/>
      <el-table-column label="客户名称" width="100" prop="merchantName"/>
      <el-table-column label="项目名称" width="100" prop="projectName"/>
      <el-table-column label="备注" prop="description"/>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row.deviceId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.deviceId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name='keyName' @refresh="onRefresh"/>
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
        keyName:'deviceId',
        deviceId: '',
        params: {},
        validate:'',
        actions: {
          getPageList: 'device/getPageList',
          removeOne: 'device/removeOne'
        }
      };
    },
     components: {
      edit,
      search
    },
    methods: {
      formatDate(dateStr, format) {
        if (null != dateStr) {
          const date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      },
      
     
     
      
      
    },
   
    created() {
      this.loadData();
    }
  };
</script>
