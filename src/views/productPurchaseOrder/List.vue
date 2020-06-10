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
        <el-table-column prop="orderNo" label="单号" align="center"></el-table-column>
        <el-table-column prop="orderDate" label="单据日期" align="center">
          <template slot-scope="prop">
            {{initDate(prop.row.orderDate, 'YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="orderType" :formatter="formatOrderType" label="单据类型" align="center">
        </el-table-column>
        <el-table-column label="明细" align="center" width="800">
          <template slot-scope="scope">
            <el-table :data="scope.row.orderDetails" border size="mini">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" :inline="true" label-width="120px">
                    <div class="detail">
                      <div v-if="props.row.propertyItems.length >0"
                           v-for="(item, index) in props.row.propertyItems"
                           :key="index">
                        <el-form-item :label="item.name +':'" v-if="item.code != 'flightDate'">
                          <span>{{ item.value }}</span>
                        </el-form-item>
                        <el-form-item :label="item.name +':'" v-if="item.code == 'flightDate'">
                          <span>    {{initDate(item.value, 'YYYY-MM-DD')}}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </template>
              </el-table-column>
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
        <el-table-column prop="totalAmount" label="成交金额" align="center"></el-table-column>
        <el-table-column prop="receiptAmount" label="实收金额" align="center"></el-table-column>
        <!--        <el-table-column prop="recordDate" label="制单时间" align="center">-->
        <!--          <template slot-scope="prop">-->
        <!--            {{initDate(prop.row.recordDate, 'YYYY-MM-DD')}}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column prop="recordName" label="制单人姓名" align="center"></el-table-column>-->
        <el-table-column
          prop="orderStatus"
          :formatter="formatOrderStatus"
          label="确认状态"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="warehouseStatus"
          :formatter="formatWarehouseStatus"
          label="收货状态"
          width="80"
          align="center"
        ></el-table-column>
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
    import {
        formatOrderStatus,
        formatOrderType,
        formatPaymentStatus,
        formatWarehouseStatus
    } from "@/utils/productStatus.js";

    export default {
        data() {
            return {
                loading: true,
                searchForm: {},
                curNode: {},
                tableData: [],
                pageFlag: 1,
                pageSize: 10,
                lastId: null,
                total: 0
            };
        },
        methods: {
            formatOrderType,
            formatOrderStatus,
            formatWarehouseStatus,
            formatPaymentStatus,
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].orderNo;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].orderNo;
                this.loadData();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            loadData(searchForm = {}) {
                if (this.lastId) {
                    searchForm.lastId = this.lastId;
                }
                searchForm['orderType'] = 200;
                this.$store.dispatch("productOrder/getPageList", {
                    pageFlag: this.pageFlag,
                    pageSize: this.pageSize,
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
                this.$router.push({path: '/product/purchase/order/edit', query: {orderNo: orderNo}});
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
        mounted() {
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
