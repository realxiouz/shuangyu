<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch"/>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加设备</el-button>
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
          <el-button size="mini" @click="handleEdit(scope.row.deviceId)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.deviceId)">删除</el-button>
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
      @prev-click="handlePrev"
      @next-click="handleNext"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :device-id="deviceId" @refresh="handleRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";

  export default {
    data() {
      return {
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true,
        deviceId: '',
        params: {}
      };
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
      getList() {
        this.$store
          .dispatch("device/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            params: this.params
          })
          .then(result => {
            this.tableData = result;
          });
      },
      getTotal() {
        this.$store.dispatch("device/getTotal").then(result => {
          this.total = result;
        });
      },
      loadData() {
        this.getList();
        this.getTotal();
      },
      handleSearch(params) {
        this.params = params;
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      handleRefresh() {
        this.handleSearch();
      },
      handlePrev() {
        this.pageFlag = -1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].deviceId;
        }
        this.loadData();
      },
      handleNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].deviceId;
        }
        this.loadData();
      },
      handleAdd() {
        this.deviceId = '';
        this.dialogVisible = true;
      },
      handleEdit(id) {
        this.deviceId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("device/removeOne", {deviceId: id}).then(() => {
            this.handleRefresh();
            this.$message({type: "success", message: "删除成功"});
          });
        });
      }
    },
    components: {
      edit,
      search
    },
    created() {
      this.loadData();
    }
  };
</script>
