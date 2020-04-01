<template>
  <div>
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
      <span style="font-weight:700;color:#303133;" v-if="!apiVisible">{{this.curNode.title}}</span>
      <span></span>
      <el-button type="primary" size="mini" @click="apisEdit" :disabled="apiVisible">添加</el-button>
    </el-row>
    <el-table
      :data="tableData"
      fit
      tooltip-effect="dark"
      highlight-current-row
      size="mini"
      style="width: 100%;margin-bottom:15px"
    >
      <el-table-column prop="apiName" label="API名称" align="center"></el-table-column>
      <el-table-column prop="category" label="类别" align="center"></el-table-column>
      <el-table-column label="是否启用" align="center" width="100">
        <template slot-scope="scope">
          <el-switch disabled :value="scope.row.enable" @change="enableSwitch(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="handlePrevChange"
      @next-click="handleNextChange"
    ></el-pagination>

    <el-dialog
      title="编辑"
      center
      :visible.sync="dialogVisible"
      width="33%"
      :close-on-click-modal="false"
    >
      <el-transfer
        v-model="transferData"
        :data="allApiData"
        :props="transferProps"
        :titles="titles"
      ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleTransCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleTransSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Edit",
  /*apiVisible为false时不可编辑*/
  props: ["apiVisible", "curNode"],
  data() {
    return {
      dialogVisible: false,
      /*数据列表*/
      tableData: [],
      /*所有的可选api数据*/
      allApiData: [],
      /*已选择的api数据*/
      transferData: [],
      pageFlag: "next",
      pageSize: 10,
      lastId: "0",
      total: 0,
      titles: ["apis", "已选api"],
      transferProps: {
        key: "apiId",
        label: "apiName"
      }
    };
  },
  methods: {
    /*加载所有的api数据*/
    loadAllApis() {
      this.$store
        .dispatch("api/getAll", {})
        .then(data => {
          this.allApiData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*根据apiID数组加载api数据列表*/
    loadApisTableList(apiIDList) {
      this.$store
        .dispatch("api/getMany", { apiIDList: apiIDList })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*点击修改api按钮*/
    apisEdit() {
      this.loadAllApis();
      this.transferData = this.curNode.apis;
      this.dialogVisible = true;
    },
    /*修改是否启用状态*/
    enableSwitch(row) {
      row.enable = row.enable ? false : true;

      this.$store
        .dispatch("api/updateOne", row)
        .then(() => {
          this.tableLoad();
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*更新表格数据*/
    tableLoad() {
      this.total = this.curNode.apis.length;
      this.loadApisTableList(this.curNode.apis);
      if (1 === this.tableData.length) {
        this.tableData = [];
      }
    },
    handleTransCancel() {
      this.dialogVisible = false;
      this.clearTransfer();
    },
    /*在选择完成api后进行保存*/
    handleTransSave() {
      this.dialogVisible = false;
      this.curNode.apis = this.transferData;
      this.$store
        .dispatch("nav/updateOne", { nav: this.curNode })
        .then(() => {
          //对数据列表进行重新加载
          this.tableLoad();
        })
        .catch(error => {
          console.log(error);
        });
      this.clearTransfer();
    },
    /*点击上一页*/
    handlePrevChange() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].id;
      this.loadData();
    },
    /*点击下一页*/
    handleNextChange() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].id;
      this.loadData();
    },
    /*选择导航节点后对该节点进行编辑*/
    clearTransfer() {
      this.allApiData = [];
      this.transferData = [];
    }
  },
  watch: {
    curNode() {
      /*监听导航节点的点击并加载其中的api列表*/
      this.tableLoad();
      // console.log(this.curNode);
    }
  }
};
</script>
