<template>
  <div class="bigBox">
    <div class="searchBox">
      <product-search @onSearch="loadData"></product-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table v-loading="loading" :data="tableData" style="width: 100%;margin-bottom: 15px;" size="mini">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" :inline="true" label-width="120px" class="demo-table-expand">
              <el-form-item label="父单号">
                <span>{{ props.row.parentNo }}</span>
              </el-form-item>
              <el-form-item label="外部单号">
                <span>{{ props.row.sourceNo }}</span>
              </el-form-item>
              <el-form-item label="单号">
                <span>{{ props.row.orderNo }}</span>
              </el-form-item>
              <el-form-item label="客户账号">
                <span>{{ props.row.merchantId }}</span>
              </el-form-item>
              <el-form-item label="联系人">
                <span>{{ props.row.contactName }}</span>
              </el-form-item>
              <el-form-item label="发票号">
                <span>{{ props.row.invoiceNo }}</span>
              </el-form-item>
              <el-form-item label="经办人">
                <span>{{ props.row.staffName }}</span>
              </el-form-item>
              <el-form-item label="到期日期">
                <span>{{ initDate(props.row.expireDate, 'YYYY-MM-DD') }}</span>
              </el-form-item>
              <el-form-item label="单据日期">
                <span>{{ initDate(props.row.orderDate, 'YYYY-MM-DD') }}</span>
              </el-form-item>
              <el-form-item label="单据类型">
                <span>{{ initOrderType(props.row.orderType) }}</span>
              </el-form-item>
              <el-form-item label="仓库编码">
                <span>{{ props.row.warehouseCode }}</span>
              </el-form-item>
              <el-form-item label="仓库名称">
                <span>{{ props.row.warehouseName }}</span>
              </el-form-item>
              <el-form-item label="出入库状态">
                <span>{{ initWarehouseStatus(props.row.warehouseStatus) }}</span>
              </el-form-item>
              <el-form-item label="出入库类型">
                <span>{{ props.row.warehouseType }}</span>
              </el-form-item>
              <el-form-item label="出入库时间">
                <span>{{ initDate(props.row.warehouseDate, 'YYYY-MM-DD') }}</span>
              </el-form-item>
              <el-form-item label="快递号码">
                <span>{{ props.row.expressNo }}</span>
              </el-form-item>
              <el-form-item label="快递公司">
                <span>{{ props.row.expressName }}</span>
              </el-form-item>
              <el-form-item label="快递状态">
                <span>{{ props.row.expressStatus }}</span>
              </el-form-item>
              <el-form-item label="交易单号">
                <span>{{ props.row.tradeNo }}</span>
              </el-form-item>
              <el-form-item label="付款状态">
                <span>{{ initPaymentStatus(props.row.paymentStatus) }}</span>
              </el-form-item>
              <el-form-item label="付款方式">
                <span>{{ props.row.paymentMode }}</span>
              </el-form-item>
              <el-form-item label="成交金额">
                <span>{{ formatAmount(props.row.totalAmount) }}</span>
              </el-form-item>
              <el-form-item label="实收金额">
                <span>{{ formatAmount(props.row.receiptAmount) }}</span>
              </el-form-item>
              <el-form-item label="结算账户">
                <span>{{ props.row.fundAccountName }}</span>
              </el-form-item>
              <el-form-item label="制单人">
                <span>{{ props.row.recordName }}</span>
              </el-form-item>
              <el-form-item label="制单时间">
                <span>{{ initDate(props.row.recordDate, 'YYYY-MM-DD') }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="单据日期" align="center">
          <template slot-scope="prop">
            {{initDate(prop.row.orderDate, 'YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="orderType" label="单据类型" align="center">
          <template slot-scope="prop">
            <span>{{initOrderType(prop.row.orderType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="warehouseDate" label="出库时间" align="center">
          <template slot-scope="prop">
            {{initDate(prop.row.warehouseDate, 'YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="tradeNo" label="交易单号" align="center"></el-table-column>
        <el-table-column prop="totalAmount" label="成交金额" align="center"></el-table-column>
        <el-table-column prop="receiptAmount" label="实收金额" align="center"></el-table-column>
        <el-table-column prop="recordDate" label="制单时间" align="center">
          <template slot-scope="prop">
            {{initDate(prop.row.recordDate, 'YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="recordName" label="制单人姓名" align="center"></el-table-column>
        <el-table-column label="明细" align="center" width="580">
          <template slot-scope="scope">
            <el-table :data="scope.row.orderDetails" border size="mini">
              <el-table-column prop="productCode" label="商品编码" align="center"></el-table-column>
              <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
              <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
              <el-table-column prop="skuName" label="属性名称" align="center"></el-table-column>
              <el-table-column prop="price" label="单价" align="center"></el-table-column>
              <el-table-column prop="stockQuantity" label="库存" align="center"></el-table-column>
              <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
              <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
              <el-table-column prop="amount" label="金额" align="center">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
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
    import productSearch from "./Search.vue";

    export default {
        data() {
            return {
                loading: true,
                searchForm: {},
                curNode: {},
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0
            };
        },
        methods: {
            /*翻前页*/
            handlePrevClick(size) {
                this.pageSize = size;
                this.searchForm.pageSize = this.pageSize;
                this.currentPage = 1;
                this.searchForm.currentPage = this.currentPage;
                this.loadData(this.searchParams);
            },
            /*翻后页*/
            handleNextClick(page) {
                this.currentPage = page;
                this.searchForm.pageSize = this.pageSize;
                this.searchForm.currentPage = this.currentPage;
                this.loadData(this.searchParams);
                this.loadData();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            loadData(searchForm = {}) {
                searchForm['orderType'] = 104;
                this.$store.dispatch("productOrder/getList", {
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
                        console.log(error);
                        this.loading = false;
                    });
            },
            loadTotal(searchForm) {
                this.$store
                    .dispatch("productOrder/getTotal", {
                        filter: searchForm
                    })
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAdd() {
                this.skipDetail();
            },
            handleEdit(row) {
                this.skipDetail(row.orderNo);
            },
            handleDelete(row) {
                this.open(this.delete, row.orderNo, "此操作将删除该信息, 是否继续?");
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
                            this.loadData();
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
            skipDetail(orderNo) {
                this.$router.push({path: '/product/shipment/order/edit', query: {orderNo: orderNo}});
            },
            initOrderType(orderType) {
                switch (orderType) {
                    case 1:
                        return '销售';
                    case 2:
                        return '采购';
                    case 10:
                        return '销售发货单';
                    case 11:
                        return '销售退货单';
                    case 12:
                        return '销售变更单';
                    case 20:
                        return '采购入库单';
                    case 21:
                        return '采购退货单';
                    case 22:
                        return '采购变更单';
                    default:
                        return '其他';
                }
            },
            initDate(dateStr, format) {
                if (dateStr > 0) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            },
            initWarehouseStatus(warehouseStatus) {
                switch (warehouseStatus) {
                    case 0:
                        return '未出库';
                    case 1:
                        return '已出库';
                }
            },
            initPaymentStatus(paymentStatus) {
                if (0 === paymentStatus) {
                    return '未付款';
                }
                return '已付款';
            },
            formatAmount(amount) {
                if (!amount) {
                    return "";
                }
                return "￥" + this.$numeral(amount).format("0.00");
            }
        },
        created() {
            this.loadData();
        },
        components: {
            productSearch
        }
    };
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
