<template>
  <div class="dept-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="部门名称">
        <el-input v-model="searchForm.deptName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border
              default-expand-all>
      <el-table-column
        prop="attributes.deptName"
        label="部门名称"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="attributes.level"
        label="层级"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="attributes.firmId"
        label="企业"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="attributes.ddId"
        label="钉钉Id"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="attributes.ddParentIdId"
        label="钉钉父节点"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="attributes.domain"
        label="域名"
        width="150"
      ></el-table-column>
      <el-table-column prop="attributes.deleteFlag" label="删除标记">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.attributes.deleteFlag"
            on-color="#00A854"
            on-text="启动"
            on-value=true
            off-color="#F04134"
            off-text="禁止"
            off-value=false
            disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleadd(scope.row.attributes)" type="success" size="mini">添加子级</el-button>
          <el-button @click="handleUpdate(scope.row.attributes)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="removeOne(scope.row.attributes.deptId,scope.$index,tableData)" type="danger"
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
    <el-dialog title="部门信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="部门名称">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="层级">
          <el-input v-model="form.level"></el-input>
        </el-form-item>
        <el-form-item label="企业">
          <el-input v-model="form.firmId"></el-input>
        </el-form-item>
        <el-form-item label="删除标记">
          <el-input v-model="form.deleteFlag"></el-input>
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="form.domain"></el-input>
        </el-form-item>
        <el-form-item label="钉钉Id">
          <el-input v-model="form.ddId"></el-input>
        </el-form-item>
        <el-form-item label="钉钉父节点">
          <el-input v-model="form.ddParentIdId"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.deleteFlag" :active-value=true :inactive-value=false></el-switch>
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
    import {deptSave, getDeptList, getDeptTotal, removeDept} from '@/api/dept'

    export default {
        name: 'dept',
        data() {
            return {
                searchForm: {},
                lastId: '0',
                pageFlag: 'next',
                pageSize: 10,
                form: {
                    parentId: '',
                    level: '',
                    firmId: '',
                    deleteFlag: false,
                    domain: '',
                    ddId: '',
                    ddParentIdId: '',
                },
                dialogVisible: false,
                total: 0,
                tableData: null
            };
        },
        methods: {
            handleadd(row) {
                this.form.parentId = row.deptId;
                console.log(row);
                this.dialogVisible = true;
            },
            add() {
                this.form = {};
                this.dialogVisible = true;
            },
            handleSearch() {
                this.loadData();
                this.loadTotal();
            },
            loadData() {
                if (!this.searchForm.deptName) {
                    this.searchForm = {};
                }
                getDeptList(this.pageFlag, this.pageSize, this.lastId, this.searchForm).then(response => {
                    if (response.data) {
                        this.tableData = response.data
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
                const params = this.form
                deptSave(params).then(() => {
                    this.loadData();
                    this.loadTotal();
                }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = false;
            },
            handleUpdate(row) {
                this.dialogVisible = true;
                this.form = row;

                console.log(row);
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            prevClick() {
                this.pageFlag = 'prev';
                this.lastId = this.tableData[0].deptId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = 'next';
                this.lastId = this.tableData[this.tableData.length - 1].deptId;
                this.loadData();
            },
            removeOne(Id, index, rows) {
                this.$confirm('此操作将状态改为删除状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeDept(Id).then(() => {
                        this.loadData();
                        rows.splice(index, 1);
                    })
                }).catch(err => {
                    console.error(err);
                });
            },

            loadTotal: function () {
                if (!this.searchForm.deptName) {
                    this.searchForm = {};
                }
                getDeptTotal(this.searchForm).then(response => {
                    this.total = response.data;
                }).catch(error => {
                    console.log(error);
                });
            },

        },
        mounted() {
            this.loadData();
            this.loadTotal();
        }
    };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
