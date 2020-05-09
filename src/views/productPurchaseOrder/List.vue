<template>
  <div class="bigBox">
    <div class="searchBox">
      <product-search @onSearch="loadData"></product-search>
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
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
    import productSearch from "./Search.vue";

    export default {
        data() {
            return {
                loading: true,
                searchForm: {},
                curNode: {},
                tableData: [],
                lastId: "blank",
                pageFlag: "next",
                pageSize: 10,
                total: 0
            };
        },
        methods: {
            loadData(searchForm) {
                this.searchForm = searchForm;
                searchForm['orderType'] = 2;
                this.$store.dispatch("productOrder/getTotal", {filter: searchForm})
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$store.dispatch("productOrder/getPageList", {pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId,filter: searchForm})
                    .then(data => {
                        this.tableData = data;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            },
            handleAdd() {
                this.skipDetail();
            },
            handleEdit(row) {
                this.skipDetail(row.orderNo);
            },
            handlePrevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].orderNo;
                this.loadData(this.searchForm);
            },
            handleNextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].orderNo;
                this.loadData(this.searchForm);
            },
            handleDelete(row) {
                this.open( this.delete, row.orderNo, "此操作将删除该信息, 是否继续?");
            },
            delete(orderNo) {
                this.$store
                    .dispatch("productOrder/removeOne", {orderNo: orderNo})
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
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
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            skipDetail(orderNo){
                this.$router.push({path: '/product/purchase/order/edit', query:{orderNo: orderNo}});
            }
        },
        mounted() {
            this.loadData({});
        },
        components: {
            productSearch
        }
    };
</script>
