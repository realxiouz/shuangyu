<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="handleAdd"
        >添加</el-button
      >
    </el-row>
    <el-table class="page-table" :data="tableData" v-loading="loading">
      <el-table-column type="expand">
        <template v-slot="{ row }">
          <el-form label-position="left" label-width="100px" class="demo-table-expand">
            <el-row>
              <el-col :span="12">
                <el-form-item label="启动内存">
                  <span>{{ row.jvmOptions.xms }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大内存">
                  <span>{{ row.jvmOptions.xmx }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年轻代">
                  <span>{{ row.jvmOptions.xmn }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="线程堆栈">
                  <span>{{ row.jvmOptions.xss }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="监控端口">
                  <span>{{ row.jvmOptions.jmxremotePort }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="启动参数">
                  <span>{{ row.jvmOptions.jvmString }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="服务编码" />
      <el-table-column prop="name" label="服务名称" />
      <el-table-column prop="gitUrl" label="仓库地址" />
      <el-table-column prop="port" label="服务端口" />
      <el-table-column label="服务状态">
        <template v-slot="{ row }">
          <span>{{ statusMap[row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.row.code)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="handlePrev"
      @next-click="handleNext"
      @size-change="handleSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
    />
    <edit :visible.sync="dialogVisible" :code="code" @refresh="handleRefresh" />
  </div>
</template>

<script>
import { MIXIN_TABLE } from "@/utils/mixin";
import edit from "./Edit";
import search from "./Search";

export default {
  name: "microServiceList",
  data() {
    return {
      beanIdName: "code",
      actionName: "microService/getPageList",
      code: "",
      statusMap: {
        '0': '启动',
        '1': '停止'
      }
    };
  },
  methods: {
    handleDel(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store
          .dispatch("microService/removeOne", { code: id })
          .then(() => {
            this.handleRefresh();
            this.$message({ type: "success", message: "删除成功" });
          });
      });
    }
  },
  components: {
    edit,
    search
  },
  mixins: [MIXIN_TABLE]
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
