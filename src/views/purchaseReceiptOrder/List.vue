<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table class="page-table" v-loading="loading" :data="tableData" style="width: 100%;" size="mini">
        <el-table-column prop="orderNo" label="单号" align="center">
          <template slot-scope="scope">
            <div @click="skipDetail(scope.row.orderNo)">{{scope.row.orderNo}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="单据日期" align="center">
          <template slot-scope="scope">
            <div @click="skipDetail(scope.row.orderNo)">{{initDate(scope.row.orderDate, 'YYYY-MM-DD')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderType" label="单据类型" align="center">
          <template slot-scope="scope">
            <div @click="skipDetail(scope.row.orderNo)">{{formatOrderType(scope.row)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="明细" align="center" width="800">
          <template slot-scope="scope">
            <el-table :data="scope.row.orderDetails" border size="mini" @row-click="skipDetail(scope.row.orderNo)">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" :inline="true" label-width="120px">
                    <div class="detail">
                      <div
                        :v-if="props.row.propertyItems.length > 0"
                        v-for="(i, index) in props.row.propertyItems"
                        :key="index"
                      >
                        <el-form-item :label="`${i.name}:`" v-if="!i.hidden">
                          <span>{{ getValByType(i) }}</span>
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
              <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
              <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
              <el-table-column prop="amount" label="金额" align="center">
              </el-table-column>
            </el-table>

            <el-table
              :data="scope.row.passengers"
              border
              style="margin-top:10px;"
            >
              <el-table-column label="乘客类型" width="80">
                <template v-slot="{ row }">
                  <el-tag type="primary">{{ ageMap[row.ageType] }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="fullName" />
              <el-table-column label="电话" prop="phone" width="120" />
              <el-table-column label="证件类型" width="90">
                <template v-slot="{ row }">
                  <el-tag type="primary">{{ cardMap[row.idCardType] }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="证件号" prop="idCardNo" />
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
          label="状态"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="warehouseStatus"
          :formatter="formatPaymentStatus"
          label="付款状态"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="280">
          <template slot-scope="scope">
            <el-button v-show="scope.row.orderStatus == 0" @click="onEdit(scope.row.orderNo)" type="text" size="mini" class="btn-primary">
              编辑
            </el-button>
            <el-button v-show="scope.row.orderStatus != 0" @click="skipDetail(scope.row.orderNo)" type="text" size="mini" class="btn-primary">查看
            </el-button>
            <el-button v-show="scope.row.orderStatus == 0" @click="handleWarehouse(scope.row)" type="text" size="mini" class="btn-primary">入库
            </el-button>
            <el-button v-show="scope.row.orderStatus == 0" @click="onDel(scope.row.orderNo)" type="text" size="mini" class="btn-danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        background
        prev-text="上一页"
        next-text="下一页"
        :total="total"
        @prev-click="onPrev"
        @next-click="onNext"
        @size-change="onSizeChange"
        layout="total,sizes,prev,next"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
        @current-change="onCurrentChange"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
</template>

<script>
    import search from "./Search.vue";
    import {
        formatOrderStatus,
        formatOrderType,
        formatPaymentStatus,
        formatWarehouseStatus
    } from "@/utils/productStatus.js";

    import { MIXIN_LIST } from "@/utils/mixin";
    import { CARD_TYPES_MAP, AGE_TYPES_MAP } from "@/utils/const";

    export default {
        mixins: [MIXIN_LIST],
        data() {
            return {
                cardMap: CARD_TYPES_MAP,
                ageMap: AGE_TYPES_MAP,

                keyId: "",
                keyName: "orderNo",
                actions: {
                  getPageList: "productOrder/getPageList",
                  removeOne: "productOrder/removeOne"
                },
                params: {
                  orderType: 201
                }
            };
        },
        methods: {
            formatOrderType,
            formatOrderStatus,
            formatWarehouseStatus,
            formatPaymentStatus,
            handleAdd() {
                this.skipDetail();
            },
            handleWarehouse(row) {
                this.$store
                    .dispatch("productOrder/inWarehouseOrder", {orderNo: row.orderNo, data: row})
                    .then(() => {
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            onEdit(orderNo) {
                this.skipDetail(orderNo);
            },
            skipDetail(orderNo) {
                this.$router.push({path: '/purchase/receipt/order/edit', query: {orderNo: orderNo}});
            },
            initDate(dateStr, format) {
                if (dateStr > 0) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            },
            getValByType(i) {
              switch (i.type) {
                case "String":
                  return i["_string"];
                case "Boolean":
                  return i["_bool"];
                case "ArrayList":
                  return i["_array"].join(",");
                case "Double":
                  return i["_double"];
                case "Float":
                  return i["_float"];
                case "Integer":
                  return i["_int"];
                case "Byte":
                  return i["_byte"];
                case "Short":
                  return i["_short"];
                case "Long":
                  return i["_long"];
                case "Date":
                  return this.$moment(i["_date"]).format(i.format || "YYYY-MM-DD");
                default:
                  return i["_string"];
              }
            }
        },
        components: {
            search
        }
    };
</script>

<style>
  .detail {
    display: flex;
    flex-wrap: wrap;
  }

</style>
