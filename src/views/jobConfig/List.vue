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
        <el-table-column prop="name" label="属性名称" align="center"></el-table-column>
        <el-table-column prop="code" label="属性编码" align="center"></el-table-column>
        <!--<el-table-column prop="group" label="属性分组" align="center"></el-table-column>-->
        <el-table-column prop="valueType" label="数据类型" align="center">
          <template slot-scope="scope">
            <span v-html="formatValueType(scope.row.valueType)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="默认值" align="center"></el-table-column>
        <el-table-column prop="required" label="是否必填" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.required">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="readonly" label="是否只读" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.readonly">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="disabled" label="是否禁用" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.disabled">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="tagName" label="标签" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序号" align="center"></el-table-column>
        <!--<el-table-column prop="tagCode" label="标签编码" align="center"></el-table-column>
        <el-table-column prop="tagType" label="标签类别" align="center">
          <template slot-scope="scope">
            <span v-html="formatTagType(scope.row.tagType)"></span>
          </template>
        </el-table-column>-->
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="330">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.configId)" type="primary" size="mini">编辑</el-button>
            <el-button @click="onDel(scope.row.configId)" type="danger" size="mini">删除</el-button>
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
  import { PROPERTY_TABLE } from '@/utils/const';
  export default {
    mixins: [MIXIN_LIST],
    name: "jobConfigList",
    data() {
      return {
        dialogVisible: false,
        configId: "",
        keyId:'',
        keyName:'configId',
        valueTypes: PROPERTY_TABLE,
        actions: {
          getPageList: 'jobConfig/getPageList',
          removeOne: 'jobConfig/removeOne'
        },
        tagTypes: [
          {
            label: "工厂",
            value: 1
          }
        ],
       
      };
    },
    components: {
     edit,
      search
    },
    methods: {
      
      formatTagType(value) {
        for (var i = 0; i < this.tagTypes.length; i++) {
          if (value == this.tagTypes[i].value) {
            return this.tagTypes[i].label;
          }
        }
      },
      formatValueType(value) {
        for (var i = 0; i < this.valueTypes.length; i++) {
          if (value == this.valueTypes[i].code) {
            return this.valueTypes[i].value;
          }
        }
      }
    },
    
  };
</script>

