<template>
  <el-container>
    <el-main>
      <fare-search @onSearch="search"/>
      <el-header>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </el-header>
      <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
        <el-table-column
          prop="segment"
          label="航段"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dpt"
          label="出发地三字码"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="arr"
          label="目的地三字码"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="airlineCode"
          label="航司二字码"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cabin"
          label="航司舱位"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roundTripPrice"
          label="往返价格"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          label="开始日期"
          width="150"
          align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.startDate" class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ formatDate(scope.row.startDate,'YYYY-MM-DD') }}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
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
        @prev-click="handlePrevClick"
        @next-click="handleNextClick">
      </el-pagination>

      <el-dialog title="票价信息" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
        <fare-edit v-if="dialogVisible" :curNode="curNode" @onSave="handleSave" @onCancel="handleCancel"></fare-edit>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import fareSearch from './Search'
  import fareEdit from './Edit'

  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        /*记录当前进行操作的节点*/
        curNode: {},
        pageFlag: "next",
        pageSize: 10,
        lastId: "blank",
        total: 0
      };
    },
    methods: {
      /*加载数据列表*/
      loadData() {
        this.$store
          .dispatch('fare/getTotal', {filter: {}})
          .then(data => {
            this.total = data.data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch('fare/getPageList', {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            filter: {}
          })
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*输入条件时可进行条件查询*/
      search(searchForm) {
        this.$store
          .dispatch('fare/getTotal', {filter: searchForm})
          .then(data => {
            this.total = data.data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch('fare/getPageList', {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            filter: searchForm
          })
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*添加记录*/
      handleAdd(){
        this.dialogVisible = true;
        this.curNode = {};
        this.curNode.fareId = '';
      },
      /*添加记录时完成数据填写或编辑记录时，点击对数据进行保存*/
      handleSave(formData){
        this.dialogVisible = false;

        let url = '';
        if ('' != formData.fareId) {
          url = 'fare/updateOne';
        } else {
          url = 'fare/addOne';
        }
        this.$store
          .dispatch(url, formData)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCancel(){
        this.dialogVisible = false;
      },
      /*点击记录进行编辑*/
      handleEdit(row) {
        this.dialogVisible = true;
        this.curNode = row;
      },
      /*对员工进行删除*/
      handleDelete(row) {
        this.open(this.delete, row.fareId, '此操作将删除条票价信息, 是否继续?');
      },
      /*根据用户ID删除用户*/
      delete(fareID) {
        this.$store
          .dispatch('fare/removeOne', {fareID: fareID})
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*前翻页*/
      handlePrevClick() {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].fareId;
        this.loadData();
      },
      /*翻后页*/
      handleNextClick() {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].fareId;
        this.loadData();
      },
      open(func, data, message) {
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          func(data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*初始化用工列表中的生日日期格式*/
      initDate(dateStr, format) {
    if (null != dateStr) {
      const date = new Date(dateStr);
      return this.$moment(date).format(format);
    } else {
      return '';
    }
  }
    },
    created() {
      this.loadData();
    },
    computed: {
      formatDate() {
        return function (dateStr, format) {
          return this.initDate(dateStr, format);
        }
      }
    },
    components: {
      fareSearch,
      fareEdit
    }
  }
</script>
