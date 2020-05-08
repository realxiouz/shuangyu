<template>
  <div class="bigBox">
    <div class="searchBox">
      <order-search @onSearch="handleSearch"></order-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        size="mini"
      >
        <el-table-column prop="orderNo" label="单号" align="center"></el-table-column>
        <el-table-column prop="parentNo" label="父单号" align="center"></el-table-column>
        <el-table-column prop="sourceNo" label="外部单号" align="center"></el-table-column>
        <el-table-column prop="contactName" label="联系人姓名" align="center"></el-table-column>
        <el-table-column prop="invoiceNo" label="发票号" align="center"></el-table-column>
        <el-table-column prop="staffName" label="销售员/经办人姓名" align="center"></el-table-column>
        <el-table-column prop="expireDate" label="到期日期" align="center"></el-table-column>
        <el-table-column prop="orderDate" label="单据日期" align="center"></el-table-column>
        <el-table-column prop="orderType" label="单据类型" align="center"></el-table-column>
        <el-table-column prop="warehouseCode" label="仓库编码" align="center"></el-table-column>
        <el-table-column prop="warehouseName" label="仓库名称" align="center"></el-table-column>
        <el-table-column prop="warehouseStatus" label="出入库状态" align="center"></el-table-column>
        <el-table-column prop="warehouseType" label="出入库类型" align="center"></el-table-column>
        <el-table-column prop="warehouseDate" label="出入库时间" align="center"></el-table-column>
        <el-table-column prop="expressNo" label="快递号码" align="center"></el-table-column>
        <el-table-column prop="expressName" label="快递公司名称" align="center"></el-table-column>
        <el-table-column prop="expressStatus" label="快递状态" align="center"></el-table-column>
        <el-table-column prop="tradeNo" label="交易单号" align="center"></el-table-column>
        <el-table-column prop="paymentStatus" label="付款状态" align="center"></el-table-column>
        <el-table-column prop="paymentMode" label="付款方式" align="center"></el-table-column>
        <el-table-column prop="totalAmount" label="成交金额" align="center"></el-table-column>
        <el-table-column prop="receiptAmount" label="实收金额" align="center"></el-table-column>
        <el-table-column prop="fundAccountCode" label="结算账户编码" align="center"></el-table-column>
        <el-table-column prop="fundAccountName" label="结算账户名称" align="center"></el-table-column>
        <el-table-column prop="recordDate" label="制单时间" align="center"></el-table-column>
        <el-table-column prop="recordName" label="制单人姓名" align="center"></el-table-column>
        <el-table-column prop="firmName" label="企业/单位名称" align="center"></el-table-column>
        <el-table-column prop="domain" label="企业/单位域名" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.orderNo)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.orderNo,scope.$index,tableData)"
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
    import orderSearch from "./Search";
    import orderEdit from "./Edit";

    export default {
        data() {
            return {
                lastId: "0",
                pageFlag: "next",
                pageSize: 10,
                dialogVisible: false,
                loading: true,
                tableData: [],
                total: 0
            };
        },
        methods: {
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            prevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].orderNo;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].orderNo;
                this.loadData();
            },
            loadTotal(searchForm) {
                this.$store
                    .dispatch("productOrder/getTotal", {
                        filters: searchForm
                    })
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadData(searchForm) {
                this.$store
                    .dispatch("productOrder/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        lastId: this.lastId,
                        filter: searchForm
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(searchForm);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            handleAdd() {
                let path = "";
                path = "/productOrder/config";
                this.$router.push({
                    path: path
                });
            },
            handleUpdate(id) {
                let path = "";
                path = "/productOrder/edit";
                this.$router.push({
                    path: path,
                    query: {
                        orderNo: id
                    }
                });
            },
            handleRemove(id, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch("productOrder/removeOne", {appId: id}).then(() => {
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
            handleSearch(params) {

            }
        },
        created() {
            this.loadData();
        },
        components: {
            orderSearch,
            orderEdit
        }
    };
</script>
