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
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="deptId"
              border
    >
      <el-table-column
        prop="deptName"
        label="部门名称"
        width="280"
      ></el-table-column>
      <el-table-column
        prop="level"
        label="层级"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="firmId"
        label="企业"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="ddId"
        label="钉钉Id"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="ddParentIdId"
        label="钉钉父节点"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="domain"
        label="域名"
        width="250"
      ></el-table-column>
      <el-table-column prop="deleteFlag" label="删除标记" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.deleteFlag"
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
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleAdd(scope.row.deptId)" type="success" size="mini">添加子级</el-button>
          <el-button @click="handleUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="removeOne(scope.row.deptId)" type="danger"
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
        <el-form-item label="企业">
          <el-input v-model="form.firmId"></el-input>
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
        <el-form-item label="是否删除">
          <el-switch v-model="form.deleteFlag" :active-value=true :inactive-value=false></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>

      <template>
        <el-transfer
          filterable
          :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
          }"
          :titles="['角色1', '角色2']"
          :filter-method="filterMethod"
          filter-placeholder="角色名称"
          v-model="value"
          :data="data">
        </el-transfer>
      </template>

    </el-dialog>
  </div>
</template>
<script>

    // eslint-disable-next-line no-unused-vars
    import {deptSave, getDeptList, getDeptTotal, removeDept} from '@/api/dept'

    export default {
        name: 'dept',
        data() {

            const generateData = _ => {
                const data = [];
                const roles = ['部门经理', '普通员工', '总经理', '', '', ''];
                const pinyin = ['部门经理', '普通员工', '总经理', '', '', ''];
                roles.forEach((role, index) => {
                    data.push({
                        label: role,
                        key: index,
                        pinyin: pinyin[index]
                    });
                });
                return data;
            };

            return {
                searchForm: {},
                lastId: '0',
                pageFlag: 'next',
                pageSize: 10,

                form: {
                    deptId:'',
                    deptName:'',
                    pid: '',
                    firmId: '',
                    deleteFlag: false,
                    domain: '',
                    ddId: '',
                    ddParentIdId: '',
                    roles: []
                },

                dialogVisible: false,
                total: 0,
                tableData: null,
                data: generateData(),
                value: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                }

            };
        },
        methods: {
            handleAdd(deptId) {
                this.form = {};
                this.form.pid = deptId;
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
                this.form.deptId = row.deptId;
                this.form.deptName = row.deptName;
                this.form.firmId = row.firmId;
                this.form.domain = row.domain;
                this.form.ddId = row.ddId;
                this.form.ddParentIdId = row.ddParentIdId;
                this.form.deleteFlag = row.deleteFlag;
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
            removeOne(Id) {
                this.$confirm('此操作将状态改为删除状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeDept(Id).then(() => {
                        this.loadData();
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
