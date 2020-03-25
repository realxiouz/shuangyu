<template>
  <div class="bigBox">
    <!-- <div class="searchBox"></div> -->
    <div class="contentBox">
      <el-table
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom:15px;"
        size="mini"
      >
        <el-table-column prop="createTime" label="创建日期" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.createTime,'YYYY-MM-DD HH:MM:SS') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始日期" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.startTime,'YYYY-MM-DD HH:MM:SS') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="policyCode" label="政策代码" align="center"></el-table-column>
        <el-table-column prop="taskId" label="任务ID" align="center"></el-table-column>
        <el-table-column label="操作" align="center"></el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderTask",

  data() {
    return {
      currentPage: 1,
      tableData: [],
      pageSize: 10,
      createTime: 0,
      taskId: "blank",
      total: 0,
      searchParams: {}
    };
  },
  components: {},
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.searchParams.pageSize = this.pageSize;
      this.loadData(this.searchParams);
    },
    prevClick() {
      if (parseInt(this.total / this.pageSize) == 1) {
        this.taskId = "blank";
        this.createTime = 0;
        this.loadData();
      } else {
        this.taskId = this.tableData[0].taskId;
        this.createTime = this.tableData[0].createTime;
        this.loadData();
      }
    },
    nextClick() {
      this.taskId = this.tableData[this.tableData.length - 1].taskId;
      this.createTime = this.tableData[this.tableData.length - 1].createTime;
      this.loadData();
    },
    loadData() {
      this.$store
        .dispatch("orderTask/getPageList", {
          pageSize: this.pageSize,
          createTime: this.createTime,
          taskId: this.taskId
        })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTotal(params) {
      this.$store
        .dispatch("orderTask/getTotal", {
          filters: params
        })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (null != dateStr) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  created() {
    this.loadData();
    this.loadTotal();
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  }
};
</script>
