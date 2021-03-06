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
        ref="tableData"
        style="width: 100%;"
        size="mini"
      >
        <el-table-column prop="schedulerName" label="调度名称" align="center"></el-table-column>
        <el-table-column prop="jobInfoId" label="xxlJobId" align="center"></el-table-column>
        <el-table-column prop="cron" label="时间表达式" align="center"></el-table-column>
        <el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
        <el-table-column prop="tagCode" label="标签编码" align="center"></el-table-column>
        <el-table-column prop="required" label="是否启动" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="330">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button v-if="scope.row.status==1" @click="handleStop(scope.row.schedulerId)" type="text" size="mini" class="btn-primary">停止</el-button>
            <el-button v-else @click="handleStart(scope.row.schedulerId)" type="text" size="mini" class="btn-primary">启动</el-button>
            <el-button @click="removeOne(scope.row.schedulerId)" type="text" size="mini" class="btn-danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
        @size-change="onSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
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
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import { PROPERTY_TABLE } from '@/utils/const';

  export default {
    name: "list",
    data() {
      return {
        dialogVisible: false,
        updateFlag: false,
        schedulerId: "",
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
        tagId: '',
        tagCode: '',
        total: 0,
        tableData: [],
        valueTypes: PROPERTY_TABLE,
        tagTypes: [
          {
            label: "工厂",
            value: 1
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
      loadData() {
        let params = {};
        this.loading = false;
        params.tagId = 'cd17704040f048c385730e9c6b72b90a';
        params.tagCode = 'policy';
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("jobScheduler/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data) {
              this.tableData = data;
              this.loadTotal(params);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTotal(params) {
        this.$store
          .dispatch("jobScheduler/getTotal", {filter: params})
          .then(data => {
            if (data) {
              this.total = data;
            }
          })
          .catch(error => {
            console.log(error);
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
      onSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.lastId = null;
        this.loadData();
      },
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].schedulerId;
        this.loadData();
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].schedulerId;
        this.loadData();
      },
      onSearch(params) {
        if (Object.keys(params).length == 0) {
          this.lastId = null;
        }
        this.loadData(params);
      },
      handleAdd() {
        this.schedulerId = '';
        this.updateFlag = false;
        this.dialogVisible = true;
      },
      onEdit(row) {
        this.schedulerId = row.schedulerId;
        this.updateFlag = true;
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
                this.loadData();
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
        this.loadData();
      },
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
    created() {
      this.loadData();
    },
  };
</script>

