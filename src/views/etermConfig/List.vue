<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" type="flex" justify="space-between">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table class="page-table" size="mini" v-loading="loading" :data="tableData" style="width: 100%;" fit>
        <el-table-column prop="etermAccount" label="账号" width="150" align="center"></el-table-column>
        <el-table-column prop="etermAddress" label="地址" width="150" align="center"></el-table-column>
        <el-table-column prop="etermPort" label="端口" width="60" align="center"></el-table-column>
        <el-table-column prop="etermOfficeId" label="Office号" width="100" align="center"></el-table-column>
        <el-table-column prop="etermOfficeRange" label="Office适用范围" width="130" align="center">
          <template slot-scope="scope">
            <span v-if = "scope.row.etermOfficeRange=='1'">默认</span>
            <span v-if = "scope.row.etermOfficeRange=='2'">备选</span>
            <span v-if = "scope.row.etermOfficeRange=='3'">政策</span>
          </template>
        </el-table-column>
        <el-table-column prop="etermAirline" label="Office无权航司" width="150" align="center"></el-table-column>
        <el-table-column prop="etermSi" label="工作号（SI）" width="150" align="center"></el-table-column>
        <el-table-column prop="firmName" label="公司" width="200" align="center"></el-table-column>
        <el-table-column prop="insCount" label="调用次数" width="100" align="center"></el-table-column>
        <el-table-column prop="online" label="状态" width="60" align="center">
          <template slot-scope="scope">
            <span v-if = "scope.row.online">在线</span>
            <span v-else>离线</span>
          </template>
        </el-table-column>
        <el-table-column prop="etermRemark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button  v-if = "scope.row.online" @click="offline(scope.row.id)" type="text" size="mini" class="btn-primary">下线</el-button>
            <el-button v-else  @click="online(scope.row.id)" type="text" size="mini" class="btn-primary">上线</el-button>
            <el-button @click="onDel(scope.row)" type="text" size="mini" class="btn-danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="Eterm配置信息"
        :visible.sync="dialogVisible"
        width="40%"
        :close-on-click-modal="false"
      >
        <edit
          v-if="dialogVisible"
          :update="update"
          :curNode="curNode"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
</template>

<script>
import edit from "./Edit";
  import search from "./Search";

export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      tableData: [],
      update:false,
      curNode:{}
    };
  },
  methods: {
    loadData() {
      this.$store
        .dispatch("etermConfig/getList", {
          filter: {}
        })
        .then(data => {
          console.log(data)
          this.tableData = data;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    onSearch(params) {
      this.$store
        .dispatch("etermConfig/getList", {
          filter: params ? params : {}
        })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.update = false;
    },
    handleSave() {
      let num = 0;
      var second = 5;
      const timer = setInterval(() => {
        if (num < second) {
          num++;
        } else {
          clearInterval(timer);
          this.loadData();
        }
      }, 1000);
      this.dialogVisible = false;
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    onEdit(row) {
      this.dialogVisible = true;
      this.curNode = row;
      this.update = true;
    },
    onDel(row) {
      this.open(
        this.delete,
        row.id,
        "此操作将删除eterm配置, 是否继续?"
      );
    },
    delete(id) {
      this.$store
        .dispatch("etermConfig/removeOne", { id: id })
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    online(id) {
      this.$store
        .dispatch("etermConfig/online", { id: id })
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    offline(id) {
      this.$store
        .dispatch("etermConfig/offline", { id: id })
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },

    open(func, data, message) {
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
    }
  },
  created() {
    this.loadData();
  },
   components: {
      edit,
      search
    },
};
</script>
