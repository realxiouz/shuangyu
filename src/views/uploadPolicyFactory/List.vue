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
      <el-table-column prop="schedulerName" label="调度名称" align="center"></el-table-column>
      <el-table-column prop="jobInfoId" label="xxlJobId" align="center"></el-table-column>
      <el-table-column prop="tagType" label="标签类别" align="center">
        <template slot-scope="scope">
          <span v-html="formatTagType(scope.row.tagType)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="tagCode" label="标签编码" align="center"></el-table-column>
      <el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
      <el-table-column label="是否启动" align="center" prop="required">
        <template slot-scope="scope">
          <span> {{scope.row.status ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onOperate(scope.row.schedulerId, scope.row.status)">{{scope.row.status === 0 ? '启动' : '停止'}}</el-button>
          <el-button size="mini" type="primary" @click="onCopy(scope.row.schedulerId)">复制</el-button>
          <el-button size="mini" type="primary" @click="onEdit(scope.row.schedulerId)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.schedulerId)">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" :copyFlag="copyFlag" @refresh="onRefresh"/>
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
        keyName: 'jobSchedulerId',
        actions: {
          getPageList: 'jobScheduler/getPageList',
          removeOne: 'jobScheduler/removeOne'
        },
        params:{
          tagCode: "policy"
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
        copyFlag: false
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
      onOperate(schedulerId, status){
        let method;
        let msg;
        if(status){
          method = 'jobScheduler/stop';
          msg = '是否确定停止？';
        }else{
          method = 'jobScheduler/start';
          msg = '是否确定启动？';
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch(method, {jobSchedulerId: schedulerId})
              .then(() => {
                this.onRefresh();
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      onEdit(id) {
        this.keyId = id;
        this.dialogVisible = true;
        this.copyFlag = false;
      },
      onCopy(id){
        this.keyId = id;
        this.dialogVisible = true;
        this.copyFlag = true;
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
