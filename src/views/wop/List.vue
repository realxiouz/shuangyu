<template>
  <div class="bigBox">
    <div class="searchBox">
      <wop-search ref="search" @onSearch="handleSearch"></wop-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:38px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        highlight-current-row
        v-loading="loading"
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="schedulerName" label="名称" align="center"></el-table-column>
        <el-table-column prop="jobInfoId" label="xxlJobId" align="center"></el-table-column>
        <el-table-column prop="cron" label="时间表达式" align="center"></el-table-column>
        <!--<el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
        <el-table-column prop="tagCode" label="标签编码" align="center"></el-table-column>-->
        <el-table-column prop="required" label="是否启动" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="330">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleCopy(scope.row)" type="primary" size="mini">复制</el-button>
            <el-button @click="removeOne(scope.row.schedulerId)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      ></el-pagination>
      <el-dialog
        :title="updateFlag?'更新':'新增'"
        center
        :visible.sync="dialogVisible"
        width="55%"
        ref="job-scheduler-edit"
        :close-on-click-modal="false"
      >
        <wop-edit
          v-if="dialogVisible"
          ref="form"
          :job-scheduler-id="schedulerId"
          :update-flag="updateFlag"
          :copy-flag="copyFlag"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></wop-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import wopSearch from "./Search";
  import wopEdit from "./Edit";

  export default {
    name: "wopList",
    data() {
      return {
        dialogVisible: false,
        updateFlag: false,
        schedulerId: "",
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        copyFlag:false,
        valueTypes: [
          {
            value: 0,
            label: '文本'
          },
          {
            value: 1,
            label: '开关'
          },
          {
            value: 2,
            label: '数字'
          },
          {
            value: 3,
            label: '日期'
          },
          {
            value: 4,
            label: '日期时间'
          },
          {
            value: 5,
            label: '时间'
          },
          {
            value: 6,
            label: '评分'
          },
          {
            value: 7,
            label: '单选'
          },
          {
            value: 12,
            label: '多选'
          },
          {
            value: 9,
            label: '选择器'
          }
        ],
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
      wopSearch,
      wopEdit
    },
    methods: {
      loadData(params) {
        console.log(JSON.stringify(params));
        params.tagCode = 'wop';
        params.tagId = '61886007158a4c40bd0f4f52fe2c6a90';
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
              this.tableData = data.data;
              this.loadTotal(params);
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      loadTotal(params) {
        this.$store
          .dispatch("jobScheduler/getTotal", {filter: params})
          .then(data => {
            if (data) {
              this.total = data.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.lastId = null;
        this.loadData({});
      },
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].schedulerId;
        this.loadData({});
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].schedulerId;
        this.loadData({});
      },
      handleSearch(params) {
        if (Object.keys(params).length == 0) {
          this.lastId = null;
        }
        this.loadData(params);
      },
      handleAdd() {
        this.schedulerId = '';
        this.updateFlag = false;
        this.copyFlag = false;
        this.dialogVisible = true;
      },
      handleEdit(row) {
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
      },
      formatValueType(value) {
        for (var i = 0; i < this.valueTypes.length; i++) {
          if (value == this.valueTypes[i].value) {
            return this.valueTypes[i].label;
          }
        }
      }
    },
    created() {
      this.loadData({});
    },
  };
</script>

