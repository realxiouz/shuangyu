<template>
  <div class="page">
    <el-row class="page-tools" :gutter="20">
      <el-col :xs="11" :sm="10" :md="9" :lg="8" :xl="8">
        <el-row style="margin-bottom:20px;">
          <span style="font-weight:700;color:#303133;">商品类目</span>
        </el-row>
        <el-button
          type="primary"
          style="margin-bottom:20px"
          size="mini"
          @click="rootAdd"
          >添加</el-button
        >
        <el-tree
          v-loading="loading"
          node-key="categoryId"
          auto-expand-parent
          :data="treeData"
          :default-expanded-keys="curLine"
          :props="treeProps"
          :expand-on-click-node="false"
          :highlight-current="true"
          @node-click="handleNodeClick"
        >
          <span class="tree-node" slot-scope="{ node, data }">
            <span>{{ node.data.categoryName }}</span>
            <span>
              <el-button type="text" size="mini" @click="nodeAdd(node, data)"
                >添加</el-button
              >
              <el-button type="text" size="mini" @click="onEdit(node, data)"
                >编辑</el-button
              >
              <el-button type="text" size="mini" @click="removeNode(node, data)"
                >移除</el-button
              >
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="16">
        <!--        <search class="page-search" ref="search" @onSearch="onSearch"/>-->
        <el-row
          class="page-tools"
          type="flex"
          justify="space-between"
          style="margin-bottom:20px;"
          align="bottom"
        >
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
            :disabled="visible"
            >添加属性
          </el-button>
        </el-row>
        <el-table
          class="page-table"
          v-loading="loading"
          :data="tableData"
          style="width: 100%;margin-bottom: 15px;"
          size="mini"
        >
          <el-table-column
            prop="categoryName"
            label="商品类目"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="属性名称"
            align="center"
          ></el-table-column>
          <el-table-column label="属性类型" prop="type" />
          <el-table-column
            prop="code"
            label="属性编码"
            align="center"
          ></el-table-column>
          <el-table-column prop="isSku" label="是否销售属性" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.sku" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="350"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleUpdate(scope.row.propertyId)"
                type="text" size="mini" class="btn-primary"
                >编辑</el-button
              >
              <el-button
                @click.native.prevent="
                  handleRemove(scope.row.propertyId, scope.$index, tableData)
                "
                type="text" size="mini" class="btn-danger"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="page-footer"
          @size-change="onSizeChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          background
          layout="total,sizes,prev,next"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
    <edit
      :visible.sync="dialogVisible"
      :property-id="propertyId"
      :category-code="categoryCode"
      :category-name="categoryName"
      :category-path="categoryPath"
      @refresh="onRefresh"
    />
    <el-dialog
      :title="addFlag ? '添加类别' : '编辑类别信息'"
      :visible.sync="categoryDialogVisible"
      width="33%"
      :close-on-click-modal="false"
    >
      <el-form :model="formData" label-width="90px" size="mini">
        <input type="hidden" v-model="formData.categoryId" />
        <el-form-item label="类别类型">
          <el-input
            type="text"
            v-model="formData.categoryType"
            :disabled="true"
            placeholder="请输入类别类型.."
          ></el-input>
        </el-form-item>
        <el-form-item label="类别编码">
          <el-input
            type="text"
            v-model="formData.categoryCode"
            @input="toUpperCase"
            :disabled="update"
            placeholder="请输入类别编码.."
          ></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input
            type="text"
            v-model="formData.categoryName"
            placeholder="请输入类别名称.."
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="text" v-model="formData.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="3"
            v-model="formData.remark"
            placeholder="请输入备注.."
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSave"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import search from "./Search";
import edit from "./Edit";

export default {
  data() {
    return {
      loading: true,
      curNode: null,
      /*类别节点添加编辑表单*/
      formData: {},
      tableData: [],
      treeData: [],
      curLine: [],
      treeProps: {
        children: "children",
        hasChildren: "xxx"
      },
      visible: true,
      dialogVisible: false,
      categoryDialogVisible: false,
      addFlag: false,
      typeEditAbel: false,
      update: false,
      /*判断是否添加的是根类别节点*/
      root: false,
      propertyId: "",
      pageFlag: 1,
      pageSize: 10,
      lastId: null,
      total: 0,
      categoryCode: "",
      categoryName: "",
      categoryPath: "",


      selCategoryCode: ''
    };
  },
  methods: {
    /*翻前页*/
    handlePrevClick() {
      this.pageFlag = -1;
      this.lastId = this.tableData[0].propertyId;
      this.loadData();
    },
    /*翻后页*/
    handleNextClick() {
      this.pageFlag = 1;
      this.lastId = this.tableData[this.tableData.length - 1].propertyId;
      this.loadData();
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    /*加载类别树*/
    loadTreeData() {
      this.$store
        .dispatch("firmCategory/getTreeList", {
          filter: { categoryType: "PRODUCT" }
        })
        .then(data => {
          if (data) {
            this.treeData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    handleNodeClick(data, node) {
      this.visible = false;
      this.curNode = node.data;
      this.lastId = null
      this.selCategoryCode = data.categoryCode
      this.loadData();
    },
    loadData(searchForm = {}) {
      if (this.lastId) {
        searchForm.lastId = this.lastId;
      }
      this.$store
        .dispatch("productProperty/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          filter: {...searchForm, categoryCode: this.selCategoryCode}
        })
        .then(data => {
          if (data) {
            this.tableData = data.rows;
            this.total = data.total;
            // this.loadTotal(searchForm);
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    handleAdd() {
      this.propertyId = "";
      this.categoryCode = this.curNode.categoryCode;
      this.categoryName = this.curNode.categoryName;
      this.categoryPath = this.curNode.path;
      this.dialogVisible = true;
    },
    handleUpdate(id) {
      this.propertyId = id;
      this.dialogVisible = true;
    },
    handleRemove(id, index, rows) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("productProperty/removeOne", { propertyId: id })
            .then(() => {
              if (1 === this.tableData.length) {
                this.prevClick();
              } else {
                this.loadData();
              }
              rows.splice(index, 1);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    onRefresh() {
      this.onSearch();
    },
    onSearch(params) {
      const newParams = {};
      if (params) {
        for (let key in params) {
          if (params[key]) {
            newParams[key] = params[key];
          }
        }
      }
      this.loadData(newParams);
      this.$message({
        type: "success",
        message: "查询成功！"
      });
    },
    /*初始化类别添加表单*/
    defaultFormData() {
      return {
        categoryId: "",
        categoryCode: "",
        categoryType: "PRODUCT",
        categoryName: "",
        icon: "",
        title: "",
        sort: "",
        remark: ""
      };
    },
    /*点击添加节点企业信息*/
    nodeAdd(idx, node) {
      this.addFlag = true;
      this.typeEditAbel = true;
      this.formData = this.defaultFormData();
      this.formData.pid = node.categoryId;
      this.formData.level = node.level + 1;
      this.formData.categoryType = node.categoryType;

      //添加的导航菜单不是顶级菜单
      this.root = false;
      this.categoryDialogVisible = true;
      this.update = false;
    },
    onEdit(data, node) {
      this.addFlag = false;
      this.formData = node;
      this.categoryDialogVisible = true;
      this.update = true;

      this.curLine = [];
      if (null != node.pid) {
        this.curLine.push(node.pid);
      } else {
        this.curLine = [];
      }
    },
    /*点击移除导航节点*/
    removeNode(data, node) {
      this.curLine = [];
      if (null != node.pid) {
        this.curLine.push(node.pid);
      } else {
        this.curLine = [];
      }
      this.open(
        this.remove,
        node.categoryId,
        "此操作将删除该类别及子类别的信息, 是否继续?"
      );
    },
    /*点击取消按钮*/
    handleCancel() {
      this.clearForm();
      this.categoryDialogVisible = false;
    },
    /*对导航节点进行存储*/
    handleSave() {
      this.categoryDialogVisible = false;
      this.curLine = [];
      if (this.formData.categoryId != "") {
        this.$store
          .dispatch("firmCategory/updateOne", {
            id: this.formData.categoryId,
            data: this.formData
          })
          .then(() => {
            this.loadTreeData();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$store
          .dispatch("firmCategory/addOne", this.formData)
          .then(data => {
            this.curLine.push(data);
            this.loadTreeData();
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.clearForm();
    },
    clearForm() {
      this.formData = this.defaultFormData();
    },
    /*点击添加顶级企业信息*/
    rootAdd() {
      this.addFlag = true;
      this.typeEditAbel = false;
      this.formData = this.defaultFormData();
      this.formData.pid = null;
      this.formData.level = 0;
      //判断添加的导航是否是顶级导航
      this.root = true;
      this.categoryDialogVisible = true;
      this.update = false;
    },
    toUpperCase() {
      this.formData.categoryCode = this.formData.categoryCode.toUpperCase();
    },
    remove(params) {
      this.$store
        .dispatch("firmCategory/removeOne", { categoryId: params })
        .then(() => {
          this.loadTreeData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    open(func, data, message) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          func(data);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.loadTreeData();
  },
  components: {
    search,
    edit
  }
};
</script>
<style scoped>
.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
