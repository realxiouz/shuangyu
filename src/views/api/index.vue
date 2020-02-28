<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="api名称">
        <el-input v-model="searchForm.apiName" placeholder="api名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;"
              border
    >
      <el-table-column
        prop="apiId"
        label="ID"
        width="200"
      ></el-table-column>
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
      <el-form ref="form" :model="formData" label-width="90px">
        <el-form-item label="Api名称">
          <el-input v-model="formData.apiName"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="formData.uri"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="formData.category"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

    // eslint-disable-next-line no-unused-vars

    const defaultData = {
        apiId: '',
        apiName: "",
        uri: "",
        enable: true,
        category: "",
    };
    export default {
        name: 'api',
        data() {
            return {
                searchForm: {},
                lastId: '0',
                pageFlag: 'next',
                pageSize: 10,
                formData: defaultData,
                dialogVisible: false,
                tableData: null,
                total: 0
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
            loadData() {
                if (!this.searchForm.apiName) {
                    this.searchForm = {};
                }
                this.$store
                    .dispatch("api/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        lastId: this.lastId,
                        filter: this.searchForm
                    }).then(data => {
                    if (data) {
                        this.tableData = data
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            loadTotal: function () {
                if (!this.searchForm.apiName) {
                    this.searchForm = {};
                }
                this.$store
                    .dispatch("api/getTotal", {
                        filter: this.searchForm
                    }).then(response => {
                    this.total = response.data;
                }).catch(error => {
                    console.log(error);
                });
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
            handleAdd() {
                this.formData = {};
                this.dialogVisible = true;
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
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            handleSave() {
                this.$store
                    .dispatch("api/save", this.formData)
                    .then(() => {
                        this.handleSearch();
                    }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = false;
            },
            handleUpdate(id) {
                this.$store
                    .dispatch("api/getOne", id)
                    .then(data => {
                        this.formData = data;
                    }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = true;
            },
            handleSearch() {
                this.loadData();
                this.loadTotal();
            },
        },
        mounted() {
            this.handleSearch();
        }
    };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
