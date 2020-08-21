<template>
  <div class="page">
    <!-- <card title="采购">
      <el-table
        :data="leftData"
        border
        v-loading="leftLoading"
        row-key="orderNo"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="orderNo" label="单号" />
        <el-table-column label="单据日期">
          <template slot-scope="scope">{{ scope.row.orderDate | time("YYYY-MM-DD") }}</template>
        </el-table-column>
        <el-table-column label="单据类型">
          <template v-slot="{row}">{{ row.orderType|orderType }}</template>
        </el-table-column>
        <el-table-column label="明细" width="800">
          <template slot-scope="scope">
            <el-table :data="scope.row.orderDetails" border>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" :inline="true" label-width="120px">
                    <div class="detail">
                      <div
                        v-if="props.row.propertyItems.length > 0"
                        v-for="(i, index) in props.row.propertyItems"
                        :key="index"
                      >
                        <el-form-item :label="`${i.name}:`" v-if="!i.hidden">
                          <span>{{ i | typeVal }}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="productCode" label="商品编码" width="200" />
              <el-table-column prop="productName" label="商品名称" align="center" />
              <el-table-column prop="brandName" label="品牌" align="center" />
              <el-table-column prop="skuName" label="属性名称" align="center" />
              <el-table-column prop="price" label="单价" align="center" />
              <el-table-column prop="quantity" label="数量" width="60" />
              <el-table-column label="库存" width="60">
                <template v-slot="{row}">
                  <el-link type="primary">{{row.inventoryQuantity}}</el-link>
                </template>
              </el-table-column>
            </el-table>

            <el-table :data="scope.row.passengers" border style="margin-top:10px;">
              <el-table-column label="乘客类型" width="80">
                <template v-slot="{ row }">
                  <el-tag type="primary">{{ row.ageType|ageType }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="fullName" />
              <el-table-column label="电话" prop="phone" width="120" />
              <el-table-column label="证件类型" width="90">
                <template v-slot="{ row }">
                  <el-tag type="primary">{{ row.idCardType|cardType }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="证件号" prop="idCardNo" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="成交金额" />
        <el-table-column prop="receiptAmount" label="实收金额" />
        <el-table-column label="确认状态" width="80">
          <template v-slot="{row}">{{row.orderStatus|orderStatus}}</template>
        </el-table-column>
        <el-table-column label="发货状态" width="80">
          <template v-slot="{row}">{{row.warehouseStatus|warehouseStatus}}</template>
        </el-table-column>
      </el-table>
    </card> -->
    <card title="销售">
      <el-table
        :data="rightData"
        border
        v-loading="rightLoading"
        row-key="orderNo"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="orderNo" label="单号" />
        <!-- <el-table-column label="单据日期">
          <template slot-scope="scope">{{ scope.row.orderDate | time("YYYY-MM-DD") }}</template>
        </el-table-column>
        <el-table-column label="单据类型">
          <template v-slot="{row}">{{ row.orderType|orderType }}</template>
        </el-table-column>
        <el-table-column label="明细" width="800">
          <template slot-scope="scope">
            <el-table :data="scope.row.orderDetails" border>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" :inline="true" label-width="120px">
                    <div class="detail">
                      <div
                        v-if="props.row.propertyItems.length > 0"
                        v-for="(i, index) in props.row.propertyItems"
                        :key="index"
                      >
                        <el-form-item :label="`${i.name}:`" v-if="!i.hidden">
                          <span>{{ i | typeVal }}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="productCode" label="商品编码" width="200" />
              <el-table-column prop="productName" label="商品名称" align="center" />
              <el-table-column prop="brandName" label="品牌" align="center" />
              <el-table-column prop="skuName" label="属性名称" align="center" />
              <el-table-column prop="price" label="单价" align="center" />
              <el-table-column prop="quantity" label="数量" width="60" />
              <el-table-column label="库存" width="60">
                <template v-slot="{row}">
                  <el-link type="primary">{{row.inventoryQuantity}}</el-link>
                </template>
              </el-table-column>
              <template v-if="
                scope.row.orderType=='SELL_CHANGE_OUT'||
                scope.row.orderType=='SELL_CHANGE_IN'||
                scope.row.orderType=='BUY_CHANGE_IN'||
                scope.row.orderType=='BUY_CHANGE_OUT'
              ">
                <el-table-column label="类型">
                  <template v-slot="{row}">
                    <el-tag>{{row.changeFlag?'改签单':'原单'}}</el-tag>
                  </template>
                </el-table-column>
              </template>
            </el-table>

            <el-table :data="scope.row.passengers" border style="margin-top:10px;">
              <el-table-column label="乘客类型" width="80">
                <template v-slot="{ row }">
                  <el-tag type="primary">{{ row.ageType|ageType }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="fullName" />
              <el-table-column label="电话" prop="phone" width="120" />
              <el-table-column label="证件类型" width="90">
                <template v-slot="{ row }">
                  <el-tag type="primary">{{ row.idCardType|cardType }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="证件号" prop="idCardNo" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="成交金额" />
        <el-table-column prop="receiptAmount" label="实收金额" />
        <el-table-column label="确认状态" width="80">
          <template v-slot="{row}">{{row.orderStatus|orderStatus}}</template>
        </el-table-column>
        <el-table-column label="发货状态" width="80">
          <template v-slot="{row}">{{row.warehouseStatus|warehouseStatus}}</template>
        </el-table-column> -->
      </el-table>
      
    </card>
    <card title="测试">
      <el-table
        :data="tableData"
        border
        v-loading="rightLoading"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </card>
  </div>
</template>

<script>
export default {
  name: "orderRoot",
  data() {
    return {
      leftData: [],
      rightData: [],
      leftLoading: false,
      rightLoading: false,

      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    getData() {
      this.getLeftData();
      this.getRightData();
    },
    getLeftData() {
      this.leftLoading = true;
      this.$store
        .dispatch("productOrder/getPurchaseList", {
          rootOrderNo: this.$route.query.rootNo
        })
        .then(data => {
          this.leftData = data;
        })
        .finally(_ => {
          this.leftLoading = false;
        });
    },
    getRightData() {
      this.rightLoading = true;
      this.$store
        .dispatch("productOrder/getSellList", {
          rootOrderNo: this.$route.query.rootNo
        })
        .then(data => {
          this.rightData = data.map(i => {
            let o = {
              orderNo: i.orderNo,
              children: i.children
            }

            return o
          });
          // this.rightData = data
          console.log(data)
          // this.rightData = [
          //   {recordId: 1, orderNo: 1, children: [{
          //     recordId: 2, orderNo: 2
          //   },{recordId: 3, orderNo: 3}]}
          // ]
        })
        .finally(_ => {
          this.rightLoading = false;
        });
    },
    onShowPassenger() {
      console.log("show passengers");
    },
    onDetail(i) {
      this.$router.push({
        name: "orderBaseEdit",
        query: {
          orderType: i.orderType,
          orderNo: i.orderNo
        }
      });
    },
    onReturn(i) {},
    onChange(i) {}
  },
  watch: {
    "$route.query.rootNo": {
      handler(val) {
        val && this.getData();
      }
      // immediate: true
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>
.detail {
  display: flex;
  flex-wrap: wrap;
}
</style>