<template>
  <div class="tree-node">
    <el-container>
      <el-row>
        <el-input v-model="keyword" style="width: 300px; margin-left: 50px;" placeholder="请输入企业名称..">
          <i class="el-icon-edit el-input__icon"
             slot="suffix"
             @click="handleIconClick">
          </i>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search"></el-button>
      </el-row>
      <el-header>
        <el-button type="text" @click="rootAdd">添加</el-button>
      </el-header>
      <el-main>
        <div>
          <el-table
            id="treeTable"
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="firmId"
            border
            lazy
            :load="loadChildren">
            <el-table-column
              prop="firmName"
              label="企业名称"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="firmCode"
              label="企业代码"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="location"
              label="机构所在地"
              width="360">
            </el-table-column>
            <el-table-column
              prop="linkPerson"
              label="联系人"
              width="220">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleAppend(scope.$index, scope.row)">添加
                </el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total,sizes,prev,next"
            prev-text="上一页"
            next-text="下一页"
            :page-size="pageSize"
            :total="total"
            @size-change="handleSizeChange"
            @prev-click="handlePrevChange"
            @next-click="handleNextChange">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
    <!-- 表单对话框 -->
    <el-dialog title="导航信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <!--   企业ID  -->
        <input type="hidden" v-model="form.firmId"/>
        <el-form-item label="企业名称">
          <el-input
            type="text"
            placeholder="请输入企业名称"
            v-model="form.firmName">
          </el-input>
        </el-form-item>
        <el-form-item label="企业代码">
          <el-input
            type="text"
            placeholder="请输入企业代码"
            v-model="form.firmCode">
          </el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input
            type="text"
            placeholder="请输入路径"
            v-model="form.path">
          </el-input>
        </el-form-item>
        <!--<el-form-item label="机构所在地">
          <el-input
            type="text"
            placeholder="请输入机构所在地"
            v-model="form.location">
          </el-input>
        </el-form-item>
        <el-form-item label="行政区代码">
          <el-input
            type="text"
            placeholder="请输入行政区代码"
            v-model="form.districtCode">
          </el-input>
        </el-form-item>
        <el-form-item label="行政区">
          <el-input
            type="text"
            placeholder="请输入行政区"
            v-model="form.distinct">
          </el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input
            type="text"
            placeholder="请输入联系人"
            v-model="form.linkPerson">
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            type="text"
            placeholder="请输入联系电话"
            v-model="form.linkPhone">
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="text"
            placeholder="请输入备注"
            v-model="form.remark">
          </el-input>
        </el-form-item>
        <el-form-item label="钉钉appKey">
          <el-input
            type="text"
            placeholder="请输入钉钉appKey"
            v-model="form.ddAppKey">
          </el-input>
        </el-form-item>
        <el-form-item label="钉钉appSecret">
          <el-input
            type="text"
            placeholder="请输入钉钉appSecret"
            v-model="form.ddAppSecret">
          </el-input>
        </el-form-item>
        <el-form-item label="域名">
          <el-input
            type="text"
            placeholder="请输入域名"
            v-model="form.domain">
          </el-input>
        </el-form-item>-->
        <el-form-item label="类别">
          <el-input
            type="text"
            placeholder="请输入类别"
            v-model="form.type">
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.enable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
      <!-- <template>
         <el-transfer
           v-model="value"
           :props="{
             key: 'value',
             label: 'desc'
           }"
           :data="transData">
         </el-transfer>
       </template>-->
    </el-dialog>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        pageFlag: "next",
        pageSize: 10,
        lastId: "0",
        total: 0,
        keyword: "",
        transData: [],
        form: {
          firmId: "",
          firmName: "",
          firmCode: "",
          pid: null,
          path: "",
          level: null,
          sort: null,
          location: "",
          districtCode: "",
          distinct: null,
          linkPerson: "",
          linkPhone: "",
          remark: "",
          deleteFlag: true,
          ddAppKey: "",
          ddAppSecret: "",
          domain: "",
          type: null,
          hasChildren: false,
          roles: []
        },
        defaultProps: {
          children: "children",
          hasChildren: "hasChildren"
        }
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch("firm/getTotal")
          .then(data => {
            this.total = data.data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch("firm/getPageList", { pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId })
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });

      },
      loadChildren(row, node, resolve) {
        this.$store
          .dispatch("firm/getList", { pid: row.firmId })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      search() {
        this.$store
          .dispatch("firm/getPageList", { pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId })
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleIconClick() {
        this.keyword = "";
      },
      /*点击添加顶级企业信息*/
      rootAdd() {
        //判断添加的导航是否是顶级导航
        this.rootNav = true;
        this.dialogVisible = true;
      },
      /*点击添加节点企业信息*/
      handleAppend(idx, row) {
        //添加的导航菜单不是顶级菜单
        this.form.pid = row.firmId;
        this.form.level = row.level + 1;

        this.rootNav = false;
        this.dialogVisible = true;
      },
      handleSave() {
        this.dialogVisible = false;

        if (this.form.firmId != "") {
          this.$store
            .dispatch("firm/edit", this.form)
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          if (this.rootNav) { //如果添加的顶级企业信息，对某些属性进行初始化
            this.form.pid = null;
            this.form.level = 1;
          }

          this.$store
            .dispatch("firm/add", this.form)
            .then(data => {
              console.log("loadData");
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        }
        this.clearForm();
      },
      handleCancel() {
        this.clearForm();
        this.dialogVisible = false;
      },
      handleEdit(index, row) {
        this.form = row;
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        this.open(this.remove, row.firmId);
      },
      remove(params) {
        this.$store
          .dispatch("firm/delete", params)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      clearForm() {
        this.form = {
          firmId: "",
          firmName: "",
          firmCode: "",
          pid: null,
          path: "",
          level: null,
          sort: null,
          location: "",
          districtCode: "",
          distinct: null,
          linkPerson: "",
          linkPhone: "",
          remark: "",
          deleteFlag: true,
          ddAppKey: "",
          ddAppSecret: "",
          domain: "",
          type: null,
          roles: [],
          children: []
        };
      },
      open(func, data) {
        this.$confirm("此操作将删除该企业信息及子企业信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          func(data);
          this.loadData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      },
      getChildren(tree, treeNode, resolve) {
        console.log(tree);
        if (null != tree) {
          this.loadChildren(tree, resolve);
        } else {
          resolve([]);
        }
      },
      /*loadChildren(tree, resolve) {
        this.$store
          .dispatch("firm/loadChildren", tree.firmId)
          .then(data => {
            setTimeout(() => {
              resolve(data.data);
            }, 1000);
          })
          .catch(error => {
            console.log(error);
          });
      },*/
      handleSizeChange: function(size) {
        this.pageSize = size;
        this.loadData();
        console.log(this.pageSize);  //每页下拉显示数据
      },
      handlePrevChange: function() {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].id;
        this.loadData();
      },
      handleNextChange: function() {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].id;
        this.loadData();
      }
    },
    mounted() {
      this.loadData();
    }

  };
</script>
