<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      size="mini"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column prop="sort" label="排列序号" align="center"></el-table-column>
      <el-table-column prop="tagType" label="标签类别" align="center">
        <template slot-scope="scope">
          <span v-html="formatTagType(scope.row.tagType)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="tagCode" label="标签编码" align="center"></el-table-column>
      <el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
      <el-table-column prop="code" label="属性编码" align="center"></el-table-column>
      <el-table-column prop="name" label="属性名称" align="center"></el-table-column>
      <el-table-column label="数据类型" align="center" prop="valueType" :formatter="formatValueType" />
      <el-table-column label="是否必填" align="center" prop="required">
        <template slot-scope="scope">
          <span> {{scope.row.required ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否只读" align="center" prop="readonly">
        <template slot-scope="scope">
          <span> {{scope.row.readonly ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否禁用" align="center" prop="disabled">
        <template slot-scope="scope">
          <span> {{scope.row.disabled ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否隐藏" align="center" prop="hidden">
        <template slot-scope="scope">
          <span> {{scope.row.hidden ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row.configId)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.configId)">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" :orderSort="orderSort" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";
  import { PROPERTY_TABLE } from '@/utils/const';

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        keyName: 'configId',
        actions: {
          getPageList: 'jobConfig/getPageList',
          removeOne: 'jobConfig/removeOne'
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
        orderSort: 1,
        valueTypes: PROPERTY_TABLE
      };
    },
    methods: {
      formatTagType(value){
        let tagType = '';
        if(value){
          this.tagTypes.forEach(function(obj){
            if(value === obj.value){
              tagType = obj.label;
            }
          });
        }
        return tagType;
      },
      formatValueType(row){
        let valueType = '';
        this.valueTypes.forEach(function(obj){
          if(row.valueType === obj.value){
            valueType = obj.label;
          }
        });
        return valueType;
      },
      beforeLoadData(data){
        if(data && data.total){
          this.orderSort = parseInt(data.total) + 1;
        }
        return data;
      }
    },
    components: {
      edit,
      search
    },
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
