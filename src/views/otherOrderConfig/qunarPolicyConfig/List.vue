<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;"
        size="mini"
      >
        <el-table-column prop="domain" label="代理商域名" width="200" align="center"></el-table-column>
        <el-table-column label="企业" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatFirmData(scope.row.firmId) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatPartyData(scope.row.thirdId) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="用户名" width="100" align="center"></el-table-column>
        <el-table-column prop="ip" label="IP" width="200" align="center"></el-table-column>
        <el-table-column prop="callbackUrl" label="回调地址" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button @click="onDel(scope.row)" type="text" size="mini" class="btn-danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      ></el-pagination>

      <el-dialog
        title="第三方平台账号信息"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <edit
          v-if="dialogVisible"
          :curNode="curNode"
          :update="update"
          :firmList="firmList"
          :partyList="partyList"
          @onSave="handleSave"
          @onCancel="handleCancel"
        />
      </el-dialog>
    </div>
</template>

<script>
import edit from "./Edit";
  import search from "./Search";

export default {
  name: "qunarPolicyConfig",
  data() {
    return {
      dialogVisible: false,
      loading: true,
      tableData: [],
      partyList: [],
      firmList: [],
      /*记录当前进行操作的节点*/
      curNode: {},
      update: false,
      deleteForSearch: false,
      pageFlag: "next",
      pageSize: 10,
      lastId: null,
      total: 0
    };
  },
  methods: {
    /*加载数据列表*/
    loadData() {
      this.$store
        .dispatch("qunarPolicyConfig/getTotal", { filter: {} })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("qunarPolicyConfig/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: {}
        })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    /*输入条件时可进行条件查询*/
    search(params) {
      this.deleteForSearch = true;
      this.$store
        .dispatch("qunarPolicyConfig/getTotal", {
          //   filter: keyword ? { username: keyword } : {}
          filter: params ? { domain: params.keyword } : {}
        })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("qunarPolicyConfig/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          //   filter: keyword ? { username: keyword } : {}
          filter: params ? { domain: params.keyword } : {}
        })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*添加记录*/
    handleAdd() {
      this.dialogVisible = true;
      this.curNode = {};
      this.update = false;
    },
    /*添加记录时完成数据填写或编辑记录时，点击对数据进行保存*/
    handleSave(formData) {
      this.dialogVisible = false;

      let url = "";
      if (this.update) {
        url = "qunarPolicyConfig/updateOne";
      } else {
        url = "qunarPolicyConfig/addOne";
      }
      this.$store
        .dispatch(url, formData)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    /*点击记录进行编辑*/
    onEdit(row) {
      this.dialogVisible = true;
      this.curNode = row;
      this.update = true;
    },
    /*对员工进行删除*/
    onDel(row) {
      this.open(
        this.delete,
        row.domain,
        "此操作将删除该第三方平台账号信息, 是否继续?"
      );
    },
    /*根据用户ID删除用户*/
    delete(domain) {
      this.$store
        .dispatch("qunarPolicyConfig/removeOne", { domain: domain })
        .then(() => {
          this.lastId = "blank";
          if (1 === this.tableData.length && !this.deleteForSearch) {
            this.handlePrevClick();
          } else {
            this.loadData();
          }
          this.deleteForSearch = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*前翻页*/
    handlePrevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].domain;
      this.loadData();
    },
    /*翻后页*/
    handleNextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].domain;
      this.loadData();
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
    },
    loadFirmData() {
      this.$store
        .dispatch("firm/getTreeList", { filter: {} })
        .then(data => {
          this.firmList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadPartyData() {
      this.$store
        .dispatch("openPlatform/getList", { filters: {} })
        .then(data => {
          this.partyList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    initFirmData(firmID) {
      let firmName = "";
      for (let i = 0; i < this.firmList.length; i++) {
        if (firmID === this.firmList[i].firmId) {
          firmName = this.firmList[i].firmName;
          break;
        }
      }
      return firmName;
    },
    initPartyData(thirdID) {
      let thirdName = "";
      for (let i = 0; i < this.partyList.length; i++) {
        if (thirdID === this.partyList[i].thirdId) {
          thirdName = this.partyList[i].thirdName;
          break;
        }
      }
      return thirdName;
    }
  },
  created() {
    this.loadFirmData();
    // this.loadPartyData();
    this.loadData();
  },
  computed: {
    formatFirmData() {
      return function(firmID) {
        return this.initFirmData(firmID);
      };
    },
    formatPartyData() {
      return function(thirdID) {
        return this.initPartyData(thirdID);
      };
    }
  },
  components: {
      edit,
      search
  }
};
</script>
