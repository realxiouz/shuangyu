<template>
  <div class="page">
      <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px;margin-left:40px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table" 
        size="mini"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        :header-cell-style="{'text-align':'center'}"
        fit
      >
        <el-table-column prop="uri" label="URL" align="left"></el-table-column>
        <el-table-column prop="category" align="center" label="类别"></el-table-column>
        <el-table-column prop="apiName" align="left" label="api名称"></el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime|time}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注" align="left" :fit='true'></el-table-column>

        <el-table-column label="是否启用" align="center" fixed="right" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="handleSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="onDel(scope.row)"
              type="danger"
              size="mini"
            >删除
            </el-button>
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
        <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"></edit>
    </div>
</template>

<script>
   import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

    export default {
        mixins: [MIXIN_LIST],
        name: "apiList",
        data() {
            return {
                deleteForSearch: false,
                keyId: '',
                keyName: 'apiId',
                actions: {
                    getPageList: 'api/getPageList',
                    removeOne: 'api/removeOne'
                }
            };
        },
        components: {
            edit,
            search
        },
        methods: {
            handleSwitch(row) {
                row.enable = row.enable ? true : false;
                this.$store
                    .dispatch("api/updateOne", {apiId: row.apiId, data: row})
                    .then(() => {
                        this.$message({
                            message: "更新成功！",
                            type: "success"
                        });
                        this.loadData();
                    });
            },
           
        },
        
    };
</script>

<style scoped>
</style>
