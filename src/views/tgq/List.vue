<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" >
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      highlight-current-row
      v-loading="loading"
      :data="tableData"
      style="width: 100%;"
      size="mini"
    >
      <el-table-column prop="schedulerName" label="名称" align="center"></el-table-column>
      <el-table-column prop="jobInfoId" label="xxlJobId" align="center"></el-table-column>
      <el-table-column prop="cron" label="时间表达式" align="center"></el-table-column>
      <el-table-column prop="required" label="是否启动" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="330">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="text" size="mini" class="btn-primary">编辑</el-button>
          <el-button v-if="scope.row.status==1" @click="handleStop(scope.row.schedulerId)"type="text" size="mini" class="btn-primary">
            停止
          </el-button>
          <el-button v-else @click="handleStart(scope.row.schedulerId)" type="text" size="mini" class="btn-primary">启动</el-button>
          <el-button @click="handleCopy(scope.row)"type="text" size="mini" class="btn-primary">复制</el-button>
          <el-button @click="removeOne(scope.row.schedulerId)"type="text" size="mini" class="btn-danger">删除</el-button>
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
    <el-dialog
      :title="updateFlag?'更新':'新增'"
      :visible.sync="dialogVisible"
      width="55%"
      ref="job-scheduler-edit"
      :close-on-click-modal="false"
    >
      <edit
        v-if="dialogVisible"
        ref="form"
        :job-scheduler-id="schedulerId"
        :update-flag="updateFlag"
        :copy-flag="copyFlag"
        @onSave="handleSave"
        @onCancel="handleCancel"
      ></edit>
    </el-dialog>
  </div>
</template>

<script>
  import edit from "./Edit"
  import search from "./Search"
  import {PROPERTY_TABLE} from '@/utils/const'
  import { MIXIN_LIST } from '@/utils/mixin'

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        updateFlag: false,
        schedulerId: "",
        copyFlag: false,
        valueTypes: PROPERTY_TABLE,
        tagTypes: [
          {
            label: "工厂",
            value: 1
          }
        ],
        actions: {
          getPageList: 'jobScheduler/getPageList'
        },
        params: {
          tagCode : 'tgq',
          tagId : 'd718e77cd1e74892866b230caf2d2483'
        }
      };
    },
    components: {
      edit,
      search
    },
    methods: {
      handleAdd() {
        this.schedulerId = '';
        this.updateFlag = false;
        this.copyFlag = false;
        this.dialogVisible = true;
      },
      onEdit(row) {
        this.schedulerId = row.schedulerId;
        this.updateFlag = true;
        this.copyFlag = false;
        this.dialogVisible = true;
      },
      handleCopy(row) {
        this.schedulerId = row.schedulerId;
        this.updateFlag = false;
        this.copyFlag = true;
        this.dialogVisible = true;
      },
      removeOne(schedulerId) {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("jobScheduler/removeOne", {jobSchedulerId: schedulerId})
              .then(() => {
                this.loadData({});
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      handleStart(schedulerId) {
        this.$confirm("是否确定启动?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("jobScheduler/trigger", {jobSchedulerId: schedulerId})
              .then(() => {
                this.loadData({});
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      handleStop(schedulerId) {
        this.$confirm("是否确定停止?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("jobScheduler/stop", {jobSchedulerId: schedulerId})
              .then(() => {
                this.loadData({});
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
      },
      handleSave() {
        this.dialogVisible = false;
        this.loadData({});
      },
      formatTagType(value) {
        for (var i = 0; i < this.tagTypes.length; i++) {
          if (value == this.tagTypes[i].value) {
            return this.tagTypes[i].label;
          }
        }
      }
    },
    created() {
      this.loadData({});
    },
  };
</script>

