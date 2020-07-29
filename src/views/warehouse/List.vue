<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        row-key="warehouseId"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        size="mini"
        :load="loadChildren"
        fit
        :indent="40"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="warehouseCode" label="仓库编码" align="center" width="180"></el-table-column>
        <el-table-column prop="warehouseName" label="仓库名称" align="center" width="180"></el-table-column>
        <el-table-column prop="contact" label="联系人" align="center" width="100"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="handleAddChild(scope.row.warehouseId)">添加</el-button>
            <el-button type="primary" size="mini" @click="onEdit(scope.row.warehouseId)">编辑</el-button>
            <el-button type="danger" size="mini" @click="onDel(scope.row.warehouseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
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
      <!-- 模态窗组件 -->
      
        <edit
          :visible.sync="dialogVisible"
          :key-id="keyId" :key-name="keyName"
          :codeEnabled="codeEnabled"
         @refresh="onRefresh"
        />
      
    </div>
</template>

<script>
 import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_LIST],
    name: "warehouseContent",
    data() {
      return {
        searchForm: {},
        dialogVisible: false,
        editWarehouseId: null,
        codeEnabled: false,
        keyName:'warehouseId',
        actions: {
          getPageList: 'warehouse/getRootPageList',
          removeOne: 'warehouse/removeOne'
        },
        uploadData: {
          tree: null,
          treeNode: null,
          resolve: null
        }
      };
    },
    methods: {
      loadChildren(tree, treeNode, resolve) {
        this.uploadData.tree = tree;
        this.uploadData.treeNode = treeNode;
        this.uploadData.resolve = resolve;
        let params = {};
        if(tree && tree.warehouseId){
          this.$store
            .dispatch("warehouse/getAsyncTreeList", {pid: tree.warehouseId, filter: params})
            .then(data => {
              if (data) {
                if(data && data.length > 0){
                  resolve(data);
                }else{
                  window.location.reload();
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      handleAddChild(warehouseId) {
        this.pid = warehouseId;
        this.editWarehouseId = "";
        this.codeEnabled = false;
        this.dialogVisible = true;
      },
      
      
      
      
      handleCancel() {
        this.dialogVisible = false;
      },
      
    },
    
    components: {
      edit,
      search
    }
  };
</script>
