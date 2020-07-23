<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px; margin-left:38px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        highlight-current-row
        v-loading="loading"
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
        <el-table-column prop="tagCode" label="标签编码" align="center"></el-table-column>
        <el-table-column prop="tagType" label="标签类别" align="center">
          <template slot-scope="scope">
            <span v-html="formatTagType(scope.row.tagType)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="330">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.tagId)" type="primary" size="mini">编辑</el-button>
            <el-button @click="onDel(scope.row.tagId)" type="danger" size="mini">删除</el-button>
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
    name: "jobTagList",
    data() {
      return {
        dialogVisible: false,
        deleteForSearch: false,
        tagId: "",
        keyNamne:'tagId',
        actions: {
          getPageList: 'jobTag/getPageList',
          removeOne: 'jobTag/removeOne'
        },
        tagTypes:[
          {
            label:"工厂",
            value:1
          },
          {
            label:"政策",
            value:2
          },
          {
            label:"其他",
            value:9
          }
        ],
        loading: true
      };
    },
    components: {
      edit,
      search
    },
    methods: {
      formatTagType(value){
        for (var i =0;i<this.tagTypes.length;i++){
          if (value==this.tagTypes[i].value){
            return this.tagTypes[i].label;
          }
        }
      }
    },
   
  };
</script>

