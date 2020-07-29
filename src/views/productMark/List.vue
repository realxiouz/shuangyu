<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table class="page-table" size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="markId" label="产品标签" align="center"></el-table-column>
        <el-table-column prop="openName" label="供应商" align="center"></el-table-column>
        <el-table-column prop="domain" label="供应商域名" align="center"></el-table-column>
        <el-table-column label="政策标签" align="center">
          <template slot-scope="props">
            <el-popover
              placement="top-start"
              title="政策标签"
              width="200"
              trigger="hover">
              <p v-for="item in props.row.policyFlags" :key="item">
                <span>{{item}}</span>
              </p>
              <el-button slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="onDel(scope.row)" type="danger" size="mini">删除</el-button>
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
      
        <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/>
      
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
                lastId: null,
                markId:'',
                keyName:'markId',
                actions: {
                    getPageList: 'productMark/getPageList',
                    removeOne: 'productMark/removeOne'
                }
            };
        },
        methods: {
           
            
        },
        mounted() {
        },
        components: {
            edit,
            search
        }
    };
</script>
