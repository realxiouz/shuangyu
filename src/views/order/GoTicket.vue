<template>
  <div class="bigBox">
    <div class="contentBox">
      <el-row>
        <h3>订单信息:</h3>
      </el-row>
      <el-row :gutter="20">
        <el-form :model="tableData" label-width="110px" size="mini">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单编号:">
              <span>{{tableData.orderNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单类型:">
              <span>{{tableData.categoryName}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="金额:">
              <span>￥{{this.$numeral(tableData.amount).format('0.00')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="航程类型:">
              <span>{{tableData.voyageTypeName}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="contentBox">
      <el-row>
        <h3>乘客信息:</h3>
      </el-row>
      <el-table :data="PassengerData" size="mini" highlight-current-row style="width: 100%;" fit>
        <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100" align="center"></el-table-column>
        <el-table-column label="出生年月" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.birthday,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ageType" label="乘机人类型" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatAgeType(scope.row.ageType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardType" label="乘机人证件类型" width="250" align="center"></el-table-column>
        <el-table-column prop="cardNo" label="乘机人证件号" align="center"></el-table-column>
        <el-table-column label="票面价" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.viewPrice)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="goTicket" size="mini">出票</el-button>
      </el-row>
    </div>
    <div class="contentBox" v-if="flightShow">
      <el-row>
        <h3>航班信息:</h3>
      </el-row>
      <div>
        <el-table>
          <el-table-column label="航班信息"></el-table-column>
          <el-table-column label="航班信息"></el-table-column>
          <el-table-column label="航班信息"></el-table-column>
        </el-table>
        <el-row style="margin-top:20px">
          <el-button type="primary" @click="automaticBuyTicket" size="mini">自动抢票</el-button>
          <el-button type="primary" @click="handleBuyTicket" size="mini">手动抢票</el-button>
        </el-row>
      </div>
      <div>
        <el-dialog title="抢票" center :visible.sync="dialogVisible" width="35%">
          <el-form :model="tableData" label-width="110px" size="mini">
            <el-form-item label="订单编号:">
              <span>{{tableData.orderNo}}</span>
            </el-form-item>
            <el-form-item label="订单类型:">
              <span>{{tableData.categoryName}}</span>
            </el-form-item>
            <el-form-item label="金额:">
              <span>￥{{this.$numeral(tableData.amount).format('0.00')}}</span>
            </el-form-item>
            <el-form-item label="航程类型:">
              <span>{{tableData.voyageTypeName}}</span>
            </el-form-item>
          </el-form>
          <el-row>
            <h3>乘客信息:</h3>
          </el-row>
          <el-table
            :data="PassengerData"
            size="mini"
            highlight-current-row
            style="width: 100%;"
            fit
          >
            <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" width="100" align="center"></el-table-column>
            <el-table-column label="出生年月" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ formatDate(scope.row.birthday,'YYYY-MM-DD') }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cardNo" label="乘机人证件号" align="center"></el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goTicket",
  data() {
    return {
      dialogVisible: false,
      flightShow: false,
      purchaseShow:true,
      flightData: [],
      PassengerData: [],
      tableData: {},
      orderNo: this.$route.query.orderNo
    };
  },
  methods: {
    getOrderDetail() {
      this.$store
        .dispatch("order/getOrderDetail", this.orderNo)
        .then(data => {
          console.log(data);
          if (data) {
            this.tableData = data;
            if (data.passengers) {
              this.PassengerData = data.passengers;
            }
            if (data.flights) {
              this.flightData = data.flights;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.dialogVisible = true;
    },
    handleSave() {
      console.log("aaa",this.orderNo)
      this.$router.push({
        path: "/order/detail",
        query: {
          orderNo: this.orderNo,
          purchaseShow:this.purchaseShow

        }
      });
      this.dialogVisible = false;
    },
    goTicket() {
      this.flightShow = true;
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
    formatAgeType(ageType) {
      if (ageType == 0) {
        return (ageType = "成人");
      } else if (ageType == 1) {
        return (ageType = "儿童");
      } else {
        return (ageType = "婴儿");
      }
    },
    formatAmount1(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    },
    automaticBuyTicket() {},
    handleBuyTicket() {
      this.dialogVisible = true;
    }
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    },
    formatAmount() {
      return function(amount) {
        return this.formatAmount1(amount);
      };
    }
  },
  created() {
    this.getOrderDetail();
  }
};
</script>

<style scoped>
</style>
