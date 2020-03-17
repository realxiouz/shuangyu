<template>
  <div class="order-container">
    <el-form :inline="true" ref="form" :rules="rules"  :model="formData"  :label-position="labelPosition" label-width="100%" >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="起始日期:"  prop="startDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="formData.startDate" style="width: 100%;" ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束日期:"  prop="endDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="formData.endDate" style="width: 100%;" ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="特殊查询:"  prop="specialQuery">
            <el-select v-model="formData.specialQuery" placeholder="全部" >
              <el-option label="测试1" value="shanghai"></el-option>
              <el-option label="测试2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人电话:"  prop="namePhone">
            <el-input v-model="formData.namePhone" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="乘机人姓名:"  prop="nameAirplane">
            <el-input v-model="formData.nameAirplane" style="width: 230px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单号:"  prop="orderNumber">
            <el-input v-model="formData.orderNumber" style="width: 230px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="票号:"  prop="ticketNumber">
            <el-input v-model="formData.ticketNumber" style="width: 230px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="PNR:"  prop="PNR">
            <el-input v-model="formData.PNR" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单状态:"  prop="orderStatus">
            <el-select v-model="formData.orderStatus" placeholder="全部">
              <el-option label="出票中" value="ing"></el-option>
              <el-option label="退票完成" value="exit"></el-option>
              <el-option label="出票完成" value="ok"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航班起始日期:"  prop="flightStartDate">
            <el-col>
              <el-date-picker type="date" placeholder="选择日期" v-model="formData.flightStartDate" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航班截止日期:"  prop="flightEndDate">
            <el-col>
              <el-date-picker type="date" placeholder="选择日期" v-model="formData.flightEndDate" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航班号:"  prop="flightNumber">
            <el-input v-model="formData.flightNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单类型:"  prop="orderType">
            <el-select v-model="formData.orderType" placeholder="选择类型">
              <el-option label="测试1" value="1"></el-option>
              <el-option label="测试2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单来源:"  prop="orderSource">
            <el-select v-model="formData.orderSource" placeholder="全部">
              <el-option label="去哪网" value="qunawang"></el-option>
              <el-option label="飞猪" value="feizhu"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航程类型:" prop="flightType" >
            <el-radio-group v-model="formData.flightType">
              <el-radio v-model="radio" label="1">单程</el-radio>
              <el-radio v-model="radio" label="2">往返</el-radio>
              <el-radio v-model="radio" label="3">全部</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="$emit('onSearch',formData)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('onAdd')" >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
   function defaultData() {
     return{
      //
      //航班字段
      FlightDate:'',//出发日期
      flightId:'',//主键唯一标识
      airLine:'',//航司
      actFlightCode:'',//主航班号
      flightCode:'',//航班号
      dpt:'',//出发地三字码
      dptAirport:'',//出发机场
      dptTerminal:'',//出发航楼站
      dptTime:'',//起飞时间
      arr:'',//到达地三字码
      arrAirport:'',//到达机场
      arrTerminal:'',//到达航站楼
      arrTime:'',//到达时间
      distance:'',//航程
      flightTimes:'',//飞行时间
      constructionFee:'',//机建费
      fuelTax:'',//燃油费
      childFuelTax:'',//儿童燃油费
      planeType:'',//机型
      flightTypeFullName:'',//机型全称
      shareFlag:'',//共享标记
      stopFlag:'',//经停标记
      stopAirportCode:'',//经停机场三字码
      meal:'',//餐食标记
      stopCount:'',//经停次数
      cycle:'',//飞行周期
      RefundChangeRule:'',//退改规则
      //
      //乘客字段
            cardNo:'',//乘机人证件号
            cardType:'',//乘机人证件类型:NI=身份证PP=护照ID=其他HX=回乡证TB=台胞证GA=港澳通行证HY=国际海员证
            ageType:'',//乘机人类型 0 为成人,1 为儿童，2为婴儿
            birthday:'',//出生年月
            gender:'',//性别
            name:'',//姓名

      //
        orderDate:'',//订单日期
        takeOffArrive:'',//起飞-到达
        totalPriceNumber:'',//总价/人数
        policyId:'',//政策ID
        balance:'',//是否退差额
        lockingPeople:'',//锁定人
        orderType:'',//订单类型
        flightType:'',//航程类型
        orderSource:'',//订单来源
        flightNumber:'',//航班号
        flightEndDate:'',//航班截止日期
        flightStartDate:'',//航班起始日期
        orderStatus:'',//订单状态
        PNR:'',       //PNR
        ticketNumber:'',//票号
        orderNumber:'',//订单号
        nameAirplane:'',//乘机人姓名
        namePhone:'',//联系人电话
        specialQuery: '',//特殊查询
        endDate:'',//结束日期
        startDate: '',//起始日期

        //
        roles: []
     };
    };
    export default {
        name: "orderEdit",

        data() {
            return {

                radio:'全部',
                labelPosition: 'left',
                searchForm: {},
                lastId: "0",
                pageFlag: "next",
                pageSize: 10,
                formData: defaultData,
                dialogVisible: false,
                total: 0,
                tableData: [],

                allRoles: [],
                paramsRoles: [],
                rules: {
                  orderNumber: [
                        {required: true, message: "请输入订单号", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: '长度在 1到 20 个字符'
                        }
                    ],
                  flightType: [
                        {required: true, message: "请输入类型", trigger: "blur"}
                    ],
                  orderDate: [
                        {required: true, message: "请输入订单日期", trigger: "blur"},

                    ],
                  takeOffArrive: [
                        {required: true, message: "请输入起飞时间/地点，到达时间地点", trigger: "blur"},

                    ],
                  flightNumber: [
                        {required: true, message: "请输入航班日期/航班号", trigger: "blur"},

                    ],
                  PNR: [
                    {required: true, message: "请输入PNR", trigger: "blur"},

                  ],
                  totalPriceNumber: [
                    {required: true, message: "请输入总价/人数", trigger: "blur"},

                  ],
                  orderStatus: [
                    {required: true, message: "请输入订单状态", trigger: "blur"},

                  ],
                  policyId: [
                    {required: true, message: "请输入政策ID", trigger: "blur"},

                  ],
                  balance: [
                    {required: true, message: "请输入是否退差额", trigger: "blur"},

                  ],
                  lockingPeople: [
                    {required: true, message: "请输入锁定人", trigger: "blur"},

                  ],
                  startDate: [
                    {required: true, message: "请输入起始日期", trigger: "blur"},

                  ],
                  endDate: [
                    {required: true, message: "请输入结束日期", trigger: "blur"},

                  ],
                  specialQuery: [
                    {required: true, message: "请输入特殊查询", trigger: "blur"},

                  ],
                  namePhone: [
                    {required: true, message: "请输入联系人电话", trigger: "blur"},

                  ],
                  nameAirplane: [
                    {required: true, message: "请输入乘机人姓名", trigger: "blur"},

                  ],
                  ticketNumber: [
                    {required: true, message: "请输入票号", trigger: "blur"},

                  ],
                  flightStartDate: [
                    {required: true, message: "请输入航班起始日期", trigger: "blur"},

                  ],
                  flightEndDate: [
                    {required: true, message: "请输入航班截止日期", trigger: "blur"},

                  ],
                  orderType: [
                    {required: true, message: "请输入订单类型", trigger: "blur"},

                  ],
                  orderSource: [
                    {required: true, message: "请输入订单来源", trigger: "blur"},

                  ],
                }
            };
        },
        methods: {
          gotoLink() {
            this.$router.replace('orderFlightName')
          },
            prevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].deptId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].deptId;
                this.loadData();
            },
            loadData() {

            },

            loadTotal: function () {

            },
            handleAdd() {
                this.formData = defaultData;
                this.dialogVisible = true;
            },
            handleSearch() {//查询
                this.loadData();
                this.loadTotal();
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
              const params = this.formData;
              this.$emit("onSave");
            },
            handleUpdate() {//编辑
                this.$store
                    .dispatch("", )
                    .then(data => {
                        this.formData = data;
                        this.dialogVisible = true;
                    }).catch(error => {
                    console.log(error);
                });
                this.loadRoles();
            },
            handleSizeChange() {
            },
        },
    };
</script>

