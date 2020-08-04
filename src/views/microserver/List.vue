<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
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
          <el-table :data="row.jvmOptions" :height="400" border>
            <el-table-column width="100" label="分组" prop="group" />
            <el-table-column label="选项" prop="option" />
            <el-table-column label="值" prop="value" />
            <el-table-column label="描述" prop="description" />
          </el-table>
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
          <el-button size="mini" type="primary" @click="onEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="onDel(scope.row.code)"
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
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
      @current-change="onCurrentChange"
      :current-page.sync="currentPage"
    />
  </div>
</template>

<script>
import { MIXIN_LIST } from "@/utils/mixin";
import search from "./Search";

export default {
  name: "microServiceList",
  data() {
    return {
      beanIdName: "code",
      keyNameL:"code",
      actions: {
        getPageList: 'microserver/getPageList',
        removeOne: 'microserver/removeOne'
      },
      code: "",
      statusMap: {
        '0': '启动',
        '1': '停止'
      }
    };
  },
  methods: {
    handleAdd() {
      this.$router.push({
        path: `/microserver/detail`
      })
    },
    onEdit(i) {
      this.$router.push({
        path: `/microserver/detail?code=${i.code}`
      })
    }
  },
  components: {
    search
  },
  mixins: [MIXIN_LIST]
};
</script>
