<template>
  <div class="contentBox">
    <!-- 功能列表 -->
    <el-row :gutter="20">
      <el-col>
        <el-row type="flex" justify="flex-start" style="margin-bottom:20px;" align="bottom">
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="toAddDevice">添加设备</el-button>
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="toAddManyDevice">批量添加设备</el-button>
        </el-row>

        <el-table :data="tableData" style="width: 100%" >
          <el-table-column label="设备名称" width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.deviceName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="设备key" width="180">
            <template slot-scope="scope">
              <span
                style="margin-left: 10px"
              >{{scope.row.deviceKey}}</span>
            </template>
          </el-table-column>

          <el-table-column label="提交时间" width="180">
            <template slot-scope="scope">
              <span
                style="margin-left: 10px"
              >{{formatDate(scope.row.createTime,"YYYY-MM-DD h:mm:ss")}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.deviceId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <device-edit ref="edit" @handleComplete="getList()" />

        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            @current-change="currentChange"
            background
            layout="total,prev,next"
            prev-text="上一页"
            next-text="下一页"
            :page-size="pageSize"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 删除弹窗 -->

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import deviceEdit from "./Edit";

export default {
  data() {
    return {
      pageFlag: false,
      // deleteDialog: false,
      lastId: "",
      dialogVisible: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 8,
      cocurrentDeviceId: "",
      // selectedSelection: []
    };
  },
  methods: {
    // 新增设备
    toAddDevice() {
      this.$refs.edit.addDevice();
    },
    toAddManyDevice() {
      this.$refs.edit.addManyDevice();
    },
    // 获取列表
    getList(cb) {
      this.$store
        .dispatch("device/getList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId
        })
        .then(result => {
          this.tableData = result;
          cb && cb();
        });
    },
    // 页码切换
    currentChange(nextPage) {
      const pageFlag = this.currentPage > nextPage ? -1 : 1;
      const tableData = this.tableData;
      let lastId;
      if (tableData.length) {
        if (pageFlag == 1) {
          lastId = tableData[tableData.length - 1].deviceId;
        } else {
          lastId = tableData[0].deviceId;
        }
      }
      this.lastId = lastId;
      this.pageFlag = pageFlag;
      this.getList(() => {
        this.currentPage = nextPage;
      });
    },
    getTotal() {
      this.$store.dispatch("device/getTotal")
      .then(result => {
        this.total = result;
      });
    },
    // 获取数据 （列表+条数）
    getData() {
      this.currentPage = 1;
      this.pageFlag = 0;
      this.getList();
      this.getTotal();
    },
    // 编辑功能
    handleEdit(data) {
      this.$refs.edit.handleEdit(data);
    },
    // 提示是否删除
    handleDelete(id) {
      this.dialogVisible = true;
      this.cocurrentDeviceId = id;
    },
    // 确定删除
    confirmDelete() {
      this.$store
        .dispatch("device/deleteById", this.cocurrentDeviceId)
        .then(result => {
          this.dialogVisible = false;
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.getList();
          this.getTotal();
        });
    },
    // 时间格式
    formatDate(dateStr, format) {
      if (null != dateStr) {
        const date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  components: {
    deviceEdit
  },
  created() {
    this.getData();
  }
};
</script>
