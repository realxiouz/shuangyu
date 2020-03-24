<template>
  <div class="bigBox">
    <div class="searchBox">
      <order-search @onSearch="handleSearch"></order-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table :data="tableData" size="mini" highlight-current-row style="width: 100%;margin-bottom:15px;" border fit>
        <el-table-column prop="orderNo" label="订单号" width="180" align="center"></el-table-column>
        <el-table-column prop="policyCode" label="政策代码" align="center"></el-table-column>
        <el-table-column prop="statusName" label="订单状态" width="80" align="center"></el-table-column>
        <el-table-column label="订单日期" width="110" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.createTime" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.createTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="订单类型" width="80" align="center"></el-table-column>
        <el-table-column label="航班号" width="80" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span style="margin-left: 10px">{{ formatFlightNo(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="航班日期" width="110" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span style="margin-left: 10px">{{ formatFlightDate(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="起飞-到达" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span style="margin-left: 10px">{{ formatFlight(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="voyageTypeName" label="航程类型" width="80" align="center"></el-table-column>
        <el-table-column prop="pnr" label="PNR" width="150" align="center"></el-table-column>
        <el-table-column label="总价" width="80" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.amount"></i>
            <span style="margin-left: 10px">{{ formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="乘客" align="center" width="200">
          <template slot-scope="scope">
            <i v-if="scope.row.passengers"></i>
            <span style="margin-left: 10px">{{ formatPassengers(scope.row.passengers)}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="handleOrderDetail(scope.row)" type="primary" size="mini">查看</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row.orderNo)">删除</el-button>
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
    </div>
  </div>
</template>

<script>
    import orderSearch from "./Search.vue";

    export default {
        name: "orderList",
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                dialogVisible: false,
                tableData: [],
                searchParams: {}
            };
        },
        methods: {
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.loadData(this.searchParams);
            },
            prevClick(page) {
                this.currentPage = page;
                this.loadData(this.searchParams);
            },
            nextClick(page) {
                this.currentPage = page;
                this.loadData(this.searchParams);
            },
            loadData(params) {
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                this.$store
                    .dispatch("order/getList", {
                        filters: params
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadTotal(params) {
                this.$store
                    .dispatch("order/getTotal", {
                        filters: params
                    })
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleSearch(params) {
                if (!params) {
                    params = {};
                    this.searchParams = params;
                    this.loadData(this.searchParams);
                    this.loadTotal(this.searchParams);
                } else {
                    const newParams = {};
                    if (params.name) {
                        newParams.name = params.name;
                    }
                    if (params.cardNo) {
                        newParams.cardNo = params.cardNo;
                    }
                    if (params.orderNo) {
                        newParams.orderNo = params.orderNo;
                    }
                    if (params.rootOrderNo) {
                        newParams.rootOrderNo = params.rootOrderNo.toLocaleLowerCase();
                    }
                    if (params.pnr) {
                        newParams.pnr = params.pnr.toLocaleLowerCase();
                    }
                    if (params.status) {
                        newParams.status = params.status;
                    }
                    if (params.flightDate) {
                        newParams.flightDate = params.flightDate;
                    }
                    if (params.cabin) {
                        newParams.cabin = params.cabin;
                    }
                    if (params.flightCode) {
                        newParams.flightCode = params.flightCode;
                    }
                    if (params.orderSource) {
                        newParams.orderSource = params.orderSource;
                    }
                    if (params.voyageType) {
                        newParams.voyageType = params.voyageType;
                    }
                    this.searchParams = newParams;
                    this.loadData(this.searchParams);
                    this.loadTotal(this.searchParams);
                }
            },
            handleRemove(orderNo) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store
                            .dispatch("order/removeOne", {orderNo: orderNo})
                            .then(() => {
                                this.loadData(this.searchParams);
                                this.loadTotal();
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
            },
            handleAdd() {
                this.dialogVisible = true;
            },
            handleOrderDetail(row) {
                this.$router.push({name: "orderDetail", params: row});
            },
            /*初始化用工列表中的生日日期格式*/
            initDate(dateStr, format) {
                if (null != dateStr) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            },
            formatFlight(data) {
                if (!data || data.length == 0) {
                    return "";
                }
                return data[0].dptTime +
                    " " +
                    data[0].dpt +
                    " - " +
                    data[0].arrTime +
                    " " +
                    data[0].arr;
            },
            formatFlightDate(data) {
                if (!data || data.length == 0) {
                    return "";
                }
                return this.initDate(data[0].flightDate, "YYYY-MM-DD");
            },
            formatFlightNo(data) {
                if (!data || data.length == 0) {
                    return "";
                }
                return data[0].flightCode;
            },
            formatPassengers(data) {
                if (!data || data.length == 0) {
                    return "";
                }
                let str = "";
                data.forEach(item => {
                    str += item.name + ",";
                });

                return str.substring(0, str.length - 1);
            },
            formatAmount(amount) {
                if (!amount) {
                    return "";
                }
                return '￥' + this.$numeral(amount).format('0.00');
            }
        },
        computed: {
            formatDate() {
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                };
            }
        },
        components: {
            orderSearch
        },
        created() {
            this.loadData(this.searchParams);
            this.loadTotal();
        }
    };
</script>
