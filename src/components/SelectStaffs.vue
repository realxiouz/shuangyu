<template>
  <div>
    <el-table v-if=checkboxFlag
              ref="staffList"
              :data="staffList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
    </el-table>
    <el-table v-else
              ref="staffList2"
              :data="staffList"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="currentPage"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="$emit('onSelectStaff',staffs)">确定</el-button>
      <el-button @click="$emit('onStaffCancel')">取 消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "SelectStaff",
    props: {
      checkboxFlag: {
        type: Boolean,
        required: true
      },
      staffData:{
        type:Array,
        required: false
      }
    },
    data() {
      return {
        staffs: [],
        lastId: "blank",
        pageFlag: "next",
        pageSize: 10,
        total: 0,
        staffList: [],
        currentPage: 0,
        // staffList1: [
        //   {fullName:"小明",phone:"12345678910"} ,
        //   {fullName:"小明1",phone:"12345678911"} ,
        //   {fullName:"小明2",phone:"12345678912"} ,
        //   {fullName:"小明3",phone:"12345678913"} ,
        // ]

      };
    },
    mounted() {
      this.toggleSelection(this.staffData)
    },
    methods: {
      loadData() {
        this.$store
          .dispatch('staff/getPageList', {
            pageSize: this.pageSize,
            lastId: this.lastId,
            pageFlag: this.pageFlag
          })
          .then(data => {
            this.loadTotal(null);
            this.staffList = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTotal() {
        this.$store
          .dispatch('staff/getTotal', null)
          .then(data => {
            this.total = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSelectionChange(val) {
        // this.staffs = [];
        this.staffs = val;
        console.log(this.staffs)
      },
      handleCurrentChange(val) {
        this.staffs = {};
        this.staffs = val;
        console.log(this.staffs)
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      },
      prevClick() {
        this.pageFlag = "prev";
        this.lastId = this.staffList[0].staffId;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = "next";
        this.lastId = this.staffList[this.staffList.length - 1].staffId;
        this.loadData();
      },
      mounted() {
        this.loadData();
      },
      create(){
        this.loadData();
      },
      toggleSelection(rows) {
        console.log(this.$refs.staffList)
        // this.staffs=rows
        if (rows) {
          this.staffs=rows
          rows.forEach(row => {
            this.$refs.staffList.toggleRowSelection(row,true);
          });
        }
        else {
          this.$refs.staffList.clearSelection();
        }
      },
    }
  };
</script>
