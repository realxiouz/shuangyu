<template>
  <div class="order-container">
    <order-report-search @onSearch="handleSearch" @onAdd="handleAdd"></order-report-search>    
    <el-row style="margin-bottom:15px;">
      <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
      <span style="margin-left:5px;">订单报表</span>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="deptId"
      border
      :tree-props="{ children: 'children', hasChildren: 'test' }"
    >
      <el-table-column
        prop="receivable"
        label="应收"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="payable"
        label="应付"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="receipt"
        label="实收"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="payment"
        label="实付"
        width="200"
      ></el-table-column>
      <el-table-column prop="profit" label="利润" width="200"></el-table-column>
      <el-table-column
        prop="purchaseOrders"
        label="采购订单"
        width="200"
      ></el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            @click="handleAddChild(scope.row.deptId)"
            type="success"
            size="mini"
            >添加子级</el-button
          >
          <el-button
            @click="handleUpdate(scope.row.deptId)"
            type="primary"
            size="mini"
            >编辑</el-button
          >
          <el-button
            @click.native.prevent="handleRemove(scope.row.deptId)"
            type="danger"
            size="mini"
            >删除
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
      :total="total"
    >
    </el-pagination>
    <el-dialog title="部门信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="formData" label-width="90px">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="formData.deptName"></el-input>
        </el-form-item>
        <el-form-item label="企业" prop="firmId">
          <el-input v-model="formData.firmId"></el-input>
        </el-form-item>
        <el-form-item label="域名" prop="domain">
          <el-input v-model="formData.domain"></el-input>
        </el-form-item>
        <el-form-item label="钉钉Id" prop="ddId">
          <el-input v-model.number="formData.ddId"></el-input>
        </el-form-item>
        <el-form-item label="钉钉父节点" prop="ddParentIdId">
          <el-input v-model.number="formData.ddParentIdId"></el-input>
        </el-form-item>
        <template>
          <el-transfer
            :titles="['全部角色', '已选角色']"
            filter-placeholder="角色名称"
            v-model="formData.roles"
            @change="handleChange"
            :props="{ key: 'roleId', label: 'roleName' }"
            :data="allRoles"
          >
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
import orderReportSearch from "./Search.vue";

const defaultData = {
  receivable: "", //应收
  payable: "", //应付
  receipt: "", //实收
  payment: "", //实付
  profit: "", //利润
  purchaseOrders: [], //采购订单
  //
  deptName: "",
  firmId: "",
  domain: "",
  ddId: "",
  ddParentIdId: "",
  roles: []
};
export default {
  name: "dept",
  data() {
    return {
      radio: "all",
      labelPosition: "right",
      searchForm: {},
      lastId: "0",
      pageFlag: "next",
      pageSize: 10,
      formData: defaultData,
      dialogVisible: false,
      total: 0,
      tableData: [],

      allRoles: [],
      paramsRoles: [],
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          }
        ],
        firmId: [{ required: true, message: "请输入企业", trigger: "blur" }],
        domain: [
          { required: true, message: "请输入域名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          }
        ],
        ddId: [
          { required: true, message: "请输入钉钉ID", trigger: "blur" },
          {
            type: "number",
            message: "钉钉ID必须为数字",
            trigger: "blur"
          }
        ],
        ddParentIdId: [
          { required: true, message: "请输入钉钉父节点", trigger: "blur" },
          {
            type: "number",
            message: "钉钉父节点必须为数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
      this.$store
        .dispatch("dept/getList", this.searchForm)
        .then(data => {
          console.log(data);
          if (data) {
            this.tableData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadRoles() {
      this.$store
        .dispatch("role/getRoleList")
        .then(data => {
          this.allRoles = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadOneRole(id) {
      this.$store
        .dispatch("role/getOne", id)
        .then(data => {
          if (data) {
            this.paramsRoles.push(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTotal: function() {
      if (!this.searchForm.deptName) {
        this.searchForm = {};
      }
      this.$store
        .dispatch("dept/getTotal", {
          filter: this.searchForm
        })
        .then(response => {
          this.total = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAddChild(deptId) {
      this.formData = defaultData;
      this.formData.pid = deptId;
      this.loadRoles();
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
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.paramsRoles && this.paramsRoles.length > 0) {
            this.formData.roles = this.paramsRoles;
          }
          this.$store
            .dispatch("dept/save", this.formData)
            .then(() => {
              this.handleSearch();
            })
            .catch(error => {
              console.log(error);
            });
          this.dialogVisible = false;
        }
      });
    },
    handleUpdate(deptId) {
      this.$store
        .dispatch("dept/getOne", deptId)
        .then(data => {
          this.formData = data;
          let arr = [];
          if (this.formData.roles && this.formData.roles.length > 0) {
            this.formData.roles.forEach(item => {
              arr.push(item.roleId);
            });
            this.formData.roles = arr;
          }
          this.dialogVisible = true;
        })
        .catch(error => {
          console.log(error);
        });
      this.loadRoles();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    handleRemove(id) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("dept/removeOne", id).then(() => {
            this.loadData();
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleChange(value, direction, movedKeys) {
      this.paramsRoles = [];
      value.forEach(item => {
        this.loadOneRole(item);
      });
    }
  },
  mounted() {
    this.handleSearch();
  },
  components: {
    orderReportSearch
  }
};
</script>
