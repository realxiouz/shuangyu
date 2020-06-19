<template>
  <div class="bigBox">
    <div class="searchBox">
      <trade-search @onSearch="loadData"></trade-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column label="序号" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeNo" label="交易编号" align="center"></el-table-column>
        <el-table-column prop="outTradeNo" label="商家订单号" align="center"></el-table-column>
        <el-table-column prop="tradeStatus" label="交易状态" align="center"></el-table-column>
        <el-table-column prop="totalAmount" label="交易的订单金额" align="center"></el-table-column>
        <el-table-column prop="discountableAmount" label="可打折金额" align="center"></el-table-column>
        <el-table-column prop="tradeCurrency" label="标价币种" align="center"></el-table-column>
        <el-table-column prop="settleCurrency" label="订单结算币种" align="center"></el-table-column>
        <el-table-column prop="settleAmount" label="结算币种订单金额" align="center"></el-table-column>
        <el-table-column prop="payCurrency" label="订单支付币种" align="center"></el-table-column>
        <el-table-column prop="payAmount" label="支付币种订单金额" align="center"></el-table-column>
        <el-table-column prop="settleTransRate" label="结算币种兑换标价币种汇率" align="center"></el-table-column>
        <el-table-column prop="transPayRate" label="标价币种兑换支付币种汇率" align="center"></el-table-column>
        <el-table-column prop="buyerPayAmount" label="买家实付金额" align="center"></el-table-column>
        <el-table-column prop="pointAmount" label="积分支付的金额" align="center"></el-table-column>
        <el-table-column prop="invoiceAmount" label="发票金额" align="center"></el-table-column>
        <el-table-column prop="sendPayDate" label="本次交易打款给卖家的时间" align="center"></el-table-column>
        <el-table-column label="本次交易打款给卖家的时间" align="center">
          <template slot-scope="scope">
            <span> {{formatDate(scope.row.sendPayDate,"YYYY-MM-DD HH：mm：ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiptAmount" label="实收金额" align="center"></el-table-column>
        <el-table-column prop="storeId" label="商户门店编号" align="center"></el-table-column>
        <el-table-column prop="terminalId" label="商户机具终端编号" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="230">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="handleAddChild(scope.row.tradeId)">添加</el-button>
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row.tradeId)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        :current-page="currentPage"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog
        title="交易记录信息"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="30%"
      >
        <trade-edit
          v-if="dialogVisible"
          @onSave="handleSave"
          @onCancel="handleCancel"
          :edit-trade-id="editTradeId"
          :pid="pid"
          :cur-node="curNode"
          :update="update"
        ></trade-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import tradeSearch from "./Search.vue";
    import tradeEdit from "./Edit.vue";

    export default {
        data() {
            return {
                loading: true,
                dialogVisible: false,
                editTradeId:"",
                update: false,
                curNode: {},
                searchParams: {},
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,

            };
        },
        methods: {
          handleAdd() {
            this.tradeId = "";
            this.pid = "";
            this.dialogVisible = true;
            this.curNode = {};
            this.update = false;
          },
            loadData(params) {
                this.$store
                    .dispatch("trade/getList", {
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(params);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            loadTotal(params) {
                this.$store
                    .dispatch("trade/getTotal", {
                        filter: params
                    })
                    .then(data => {
                        if (data >= 0) {
                            this.total = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
          delete(tradeId) {
            this.$store
              .dispatch("trade/removeOne", {tradeId: tradeId})
              .then(() => {
                this.lastId = "blank";
                if (1 === this.tableData.length) {
                  this.handlePrevClick();
                } else {
                  this.loadData({});
                }
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
          },
            /*初始化用工列表中的生日日期格式*/
            formatDate(dateStr, format) {
                if (null != dateStr) {
                    const date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            },
          handleSave(formData) {
            this.dialogVisible = false;
            this.$store
              .dispatch("trade/save", formData)
              .then(() => {
                this.loadData({});
              })
              .catch(error => {
                console.log(error);
              });
          },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.searchParams.pageSize = this.pageSize;
                this.loadData(this.searchParams);
            },
            prevClick(page) {
                this.currentPage = page;
                this.searchParams.pageSize = this.pageSize;
                this.searchParams.currentPage = this.currentPage;
                this.loadData(this.searchParams);
            },
            nextClick(page) {
                this.currentPage = page;
                this.searchParams.pageSize = this.pageSize;
                this.searchParams.currentPage = this.currentPage;
                this.loadData(this.searchParams);
            },
          handleAddChild(tradeId) {
            this.editAccountId = "";
            this.dialogVisible = true;
            this.pid = tradeId;
          },
          handleEdit(row) {
            this.tradeId = row.tradeId;
            this.pid = "";
            this.dialogVisible = true;
            this.curNode = row;
            this.update = true;
          },
          handleDelete(tradeId) {
            this.open(
              this.delete,
              tradeId,
              "此操作将删除交易记录信息, 是否继续?"
            );
          }
        },
        created() {
            this.loadData(this.searchParams);
        },
        components: {
            tradeSearch,
            tradeEdit
        }
    };
</script>
