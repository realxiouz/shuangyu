<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;"
        size="mini"
      >
        <el-table-column prop="openName" label="平台" align="center"></el-table-column>
        <el-table-column prop="label" label="参数标签" align="center"></el-table-column>
        <el-table-column prop="name" label="参数名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.paramId)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button
              @click="handleRemove(scope.row,scope.$index,tableData)"
              type="text" size="mini" class="btn-danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
        <edit
          v-if="dialogVisible"
          :param-id="paramId"
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
  name: "flagParamList",
  data() {
    return {
      loading: true,
      tableData: [],
      dialogVisible: false,
      paramId: "",
      total: 0
    };
  },
  methods: {
    onSearch(formatDate) {
      if (!formatDate || !formatDate.name) {
        formatDate = {};
      }
      this.$store
        .dispatch("policyFlagParam/getList", {
          filters: formatDate
        })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.paramId = "";
    },
    handleSave(formData) {
      this.$store
        .dispatch("policyFlagParam/save", formData)
        .then(() => {
          this.onSearch();
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogVisible = false;
    },
    handleUpdate(id) {
      console.log(id);
      this.paramId = id;
      this.dialogVisible = true;
    },
    handleRemove(row, index, rows) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("policyFlagParam/removeOne", { paramId: row.paramId })
            .then(data => {
              console.log(data);
              rows.splice(index, 1);
              this.total--;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    }
  },
  created() {
    this.onSearch();
  },
  components: {
     edit,
      search
  }
};
</script>
