<template>
  <div class="page">
   <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row style="margin-bottom:15px; margin-left:50px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        style="width: 100%;margin-bottom: 15px;"
        size="mini"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="right"
              :inline="true"
              label-width="120px"
              class="demo-table-expand"
            >
              <el-form-item label="航司:">
                <span>{{ props.row.airlineCode }}</span>
              </el-form-item>
              <el-form-item label="主航班号:">
                <span>{{ props.row.actFlightCode }}</span>
              </el-form-item>
              <el-form-item label="航班号:">
                <span>{{ props.row.flightCode }}</span>
              </el-form-item>
              <el-form-item label="出发地三字码:">
                <span>{{ props.row.dpt }}</span>
              </el-form-item>
              <el-form-item label="出发机场:">
                <span>{{ props.row.dptAirport }}</span>
              </el-form-item>
              <el-form-item label="出发航楼站:">
                <span>{{ props.row.dptTerminal }}</span>
              </el-form-item>
              <el-form-item label="到达地三字码:">
                <span>{{ props.row.arr }}</span>
              </el-form-item>
              <el-form-item label="到达机场:">
                <span>{{ props.row.arrAirport}}</span>
              </el-form-item>
              <el-form-item label="到达航楼站:">
                <span>{{ props.row.arrTerminal }}</span>
              </el-form-item>
              <el-form-item label="起飞时间:">
                <span>{{ formatTime(props.row.dptTime) }}</span>
              </el-form-item>
              <el-form-item label="到达时间:">
                <span>{{ formatTime(props.row.arrTime) }}</span>
              </el-form-item>
              <el-form-item label="航程:">
                <span>{{ props.row.distance + " km"}}</span>
              </el-form-item>
              <el-form-item label="飞行时间:">
                <span>{{ props.row.flightTimes }}</span>
              </el-form-item>
              <el-form-item label="机建费:">
                <span>{{ formatAmount(props.row.constructionFee) }}</span>
              </el-form-item>
              <el-form-item label="燃油费:">
                <span>{{ formatAmount(props.row.fuelTax) }}</span>
              </el-form-item>
              <el-form-item label="儿童燃油费:">
                <span>{{ formatAmount(props.row.childFuelTax) }}</span>
              </el-form-item>
              <el-form-item label="机型:">
                <span>{{ props.row.planeType }}</span>
              </el-form-item>
              <el-form-item label="机型全称:">
                <span>{{ props.row.flightTypeFullName }}</span>
              </el-form-item>
              <el-form-item label="共享标记:">
                <span>{{ props.row.shareFlag ? "是" : "否" }}</span>
              </el-form-item>
              <el-form-item label="经停标记:">
                <span>{{ props.row.stopFlag ? "是" : "否" }}</span>
              </el-form-item>
              <el-form-item label="经停机场三字码:">
                <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link">
                    经停机场
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in props.row.stopAirportCode" :key="item">
                      <span>{{ item }}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
              <el-form-item label="餐食标记:">
                <span>{{ props.row.meal ? "是" : "否" }}</span>
              </el-form-item>
              <el-form-item label="经停次数:">
                <span>{{ props.row.stopCount }}</span>
              </el-form-item>
              <el-form-item label="飞行周期:">
                <span>{{ props.row.cycle }}</span>
              </el-form-item>
              <el-form-item label="退票规则:">
                <span>{{ props.row.refundRule }}</span>
              </el-form-item>
              <el-form-item label="改签规则:">
                <span>{{ props.row.changeRule }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="airlineCode" label="航司" width="100" align="center"></el-table-column>
        <el-table-column prop="flightCode" label="航班号" align="center"></el-table-column>
        <el-table-column prop="dpt" label="出发机场" align="center"></el-table-column>
        <el-table-column prop="arr" label="到达机场" width="100" align="center"></el-table-column>
        <el-table-column prop="dptTime" label="起飞时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.dptTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="arrTime" label="到达时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.arrTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cycle" label="航班周期" width="100" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.flightId)" type="primary" size="mini">编辑</el-button>
            <el-button @click="onDel(scope.row.flightId)" type="danger" size="mini">删除</el-button>
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
      <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/>
    </div>
</template>

<script>
import edit from "./Edit";
import search from "./Search";
import {MIXIN_LIST} from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      flightId:'',
      deleteForSearch: false,
      deleteValue: false,
      keyId: '',
      keyName: 'flightId',
      actions: {
          getPageList: 'flight/getPageList',
          removeOne: 'flight/removeOne'
        }
    };
  },
   components: {
      edit,
      search
    },
  methods: {
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr && dateStr > 0) {
        const date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatTime(time) {
      if (time) {
        return time.substring(0, 2) + " : " + time.substring(2, time.length);
      } else {
        return time;
      }
    },
    formatAmount(amount) {
      if (!amount) {
        return "";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
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
