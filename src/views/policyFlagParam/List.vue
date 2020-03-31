<template>
  <div class="bigBox">
    <div class="searchBox">
      <flag-param-search @onSearch="handleSearch"></flag-param-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="thirdName" label="平台" align="center"></el-table-column>
        <el-table-column prop="label" label="参数标签" align="center"></el-table-column>
        <el-table-column prop="name" label="参数名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.paramId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click="handleRemove(scope.row,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="用户信息" center :visible.sync="dialogVisible" width="30%">
        <flag-param-edit
          v-if="dialogVisible"
          :param-id="paramId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></flag-param-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import flagParamSearch from "./Search";
import flagParamEdit from "./Edit";

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
    handleSearch(formatDate) {
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
            this.loading = false;
          }
        })
        .catch(error => {
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
          this.handleSearch();
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
    this.handleSearch();
  },
  components: {
    flagParamSearch,
    flagParamEdit
  }
};
</script>
