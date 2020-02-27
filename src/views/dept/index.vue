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
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="deptId"
              border>
      <el-table-column
        prop="deptName"
        label="部门名称"
        width="280"
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
          <el-button @click="handleAddChild(scope.row.deptId)" type="success" size="mini">添加子级</el-button>
          <el-button @click="handleUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="danger"
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
      <el-form ref="form" :model="formData" label-width="90px">
        <el-form-item label="部门名称">
          <el-input v-model="formData.deptName"></el-input>
        </el-form-item>
        <el-form-item label="企业">
          <el-input v-model="formData.firmId"></el-input>
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="formData.domain"></el-input>
        </el-form-item>
        <el-form-item label="钉钉Id">
          <el-input v-model="formData.ddId"></el-input>
        </el-form-item>
        <el-form-item label="钉钉父节点">
          <el-input v-model="formData.ddParentIdId"></el-input>
        </el-form-item>
        <el-form-item label="是否删除">
          <el-switch v-model="formData.deleteFlag" :active-value=true :inactive-value=false></el-switch>
        </el-form-item>

        <template>
          <el-transfer
            filterable
            :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
          }"
            :titles="['角色', '已选角色']"
            filter-placeholder="角色名称"
            v-model="formData.roles"
            :props="{ key: 'roleId',label: 'roleName'}"
            :data="roles">
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small" @click="test">测试</el-button>
          </el-transfer>
        </template>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>


    </el-dialog>
  </div>
</template>
<script>

  const defaultData = {
    deptName: "",
    firmId: "",
    deleteFlag: false,
    domain: "",
    ddId: "",
    ddParentIdId: "",
    roles: []
  };
  export default {
    name: "dept",
    data() {
      return {
        searchForm: {},
        lastId: "0",
        pageFlag: "next",
        pageSize: 10,
        formData: defaultData,
        roles: [],
        dialogVisible: false,
        total: 0,
        tableData: null
      };
    },
    methods: {
      test() {
        console.log(this.roles);
        console.log(this.formData.roles);
      },

      filterRoles() {
      },

      prevClick() {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].deptId;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].deptId;
        this.loadData();
      },

      loadData() {
        if (!this.searchForm.deptName) {
          this.searchForm = {};
        }
        getPageList(this.pageFlag, this.pageSize, this.lastId, this.searchForm).then(response => {
          if (response.data) {
            this.tableData = response.data;
          }
        }).catch(error => {
          console.log(error);
        });
      },

      loadRoles() {
        this.$store
          .dispatch("role/getRoleList")
          .then(data => {
            this.roles = data;
          })
          .catch(error => {
            console.log(error);
          });
      },

      loadTotal: function() {
        if (!this.searchForm.deptName) {
          this.searchForm = {};
        }
        getTotal(this.searchForm).then(response => {
          this.total = response.data;
        }).catch(error => {
          console.log(error);
        });
      },

      handleAddChild(deptId) {
        this.formData = defaultData;
        this.formData.pid = deptId;
        this.dialogVisible = true;
      },

      handleAdd() {
        this.formData = defaultData;
        this.loadRoles();
        this.dialogVisible = true;
      },

      handleSearch() {
        this.loadData();
        this.loadTotal();
      },

      handleCancel() {
        this.dialogVisible = false;
      },

      handleSave() {
         const params = this.formData;
         save(params).then(() => {
          this.loadData();
          this.loadTotal();
        }).catch(error => {
          console.log(error);
        });
        this.dialogVisible = false;
      },

      handleUpdate(row) {
        this.dialogVisible = true;
        this.formData.deptId = row.deptId;
        this.formData.deptName = row.deptName;
        this.formData.firmId = row.firmId;
        this.formData.domain = row.domain;
        this.formData.ddId = row.ddId;
        this.formData.ddParentIdId = row.ddParentIdId;
        this.formData.deleteFlag = row.deleteFlag;
        this.formData.roles = row.roles;
        console.log(row);
      },

      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      },

      handleRemove(Id) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          removeOne(Id).then(() => {
            this.loadData();
          });
        }).catch(err => {
          console.error(err);
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
