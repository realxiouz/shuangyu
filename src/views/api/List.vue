<template>
  <div class="api-container">
    <apiSearch @onSearch="handleSearch" @onAdd="handleAdd"></apiSearch>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border>
      <el-table-column
        prop="uri"
        label="URL"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="类别"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="apiName"
        label="api名称"
        width="300"
      ></el-table-column>
      <el-table-column prop="enable" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            on-color="#00A854"
            on-text="启动"
            on-value=true
            off-color="#F04134"
            off-text="禁止"
            off-value=false
            @change="handleSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="350">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row.apiId)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="handleRemove(scope.row.apiId,scope.$index,tableData)" type="danger"
                     size="mini">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog title="Api信息" :visible.sync="dialogVisible" width="30%">
      <apiEdit @onCancel="handleCancel" @onSave="handleSave"></apiEdit>
    </el-dialog>
  </div>
</template>

<script>
  import apiSearch from "./Search.vue";
  import apiEdit from "./Edit.vue";


  export default {
    name: "apiList",
    data() {
      return {
        lastId: "0",
        pageFlag: "next",
        pageSize: 10,
        total: 0,
        dialogVisible: false,
        tableData: []
      };
    },
    methods: {
      prevClick() {
        this.pageFlag = 'prev';
        this.lastId = this.tableData[0].apiId;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = 'next';
        this.lastId = this.tableData[this.tableData.length - 1].apiId;
        this.loadData();
      },

      loadData(params ) {
        this.$store
          .dispatch("api/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            filter: params,
          }).then(data => {
          if (data) {
            this.tableData = data;
          }
        }).catch(error => {
          console.log(error);
        });
      },
      loadTotal: function (params) {
        this.$store
          .dispatch("api/getTotal", params).then(response => {
          this.total = response.data;
        }).catch(error => {
          console.log(error);
        });
      },
      handleAdd() {
        this.dialogVisible = true;
      },
      handleSwitch(data) {
        this.$store
          .dispatch("api/updateOne", data)
          .then(() => {
            this.loadData();
          }).catch(error => {
          console.log(error);
        });
      },

      handleRemove(id, index, rows) {
        this.$confirm('此操作将状态改为删除状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch("api/removeOne", id)
            .then(() => {
              this.loadData();
              rows.splice(index, 1);
            })
        }).catch(err => {
          console.error(err);
        });
      },

      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      },
      handleSave(params) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store
              .dispatch("api/save", params)
              .then(() => {
                this.handleSearch();
              }).catch(error => {
              console.log(error);
            });
            this.dialogVisible = false;
          }
        })
      },
      handleUpdate(id) {
        this.$store
          .dispatch("api/getOne", id)
          .then(data => {
            this.formData = data;
            this.dialogVisible = true;
          }).catch(error => {
          console.log(error);
        });
      },
      handleCancel() {
        this.dialogVisible = false;
      },

      handleSearch(params) {
        this.loadData(params);
        console.log(params)
        this.loadTotal(params);
      },

    },
    mounted() {
      this.handleSearch();
    },
    components: {
      apiEdit,
      apiSearch,
    },

  }

</script>

<style scoped>

</style>
