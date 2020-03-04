<template>
  <div class="order-container">

    <vue-orderFilght ></vue-orderFilght>


    <el-dialog title="订单乘客信息" :visible.sync="dialogFormVisible"  width="70%">
      <el-form ref="form" :rules="rules" :model="formData" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="formData.name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别:" prop="gender">
              <el-select v-model="formData.gender" placeholder="请选择" >
                <el-option label="男" value=""></el-option>
                <el-option label="女" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生年月:" prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" v-model="formData.birthday" style="width: 100%;" ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="乘机人类型:" prop="ageType">
              <el-select v-model="formData.ageType" placeholder="请选择乘机人类型" >
                <el-option label="儿童" value=""></el-option>
                <el-option label="成人" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="乘机人证件类型:" prop="cardType">
              <el-select v-model="formData.cardType" placeholder="请选择乘机人证件类型" >
                <el-option label="身份证" value=""></el-option>
                <el-option label="军人证" value=""></el-option>
                <el-option label="测试" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="乘机人证件号:"  prop="cardNo">
              <el-input v-model="formData.cardNo" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 定</el-button>
        </div>

    </el-dialog>

      <el-form ref="form" :rules="rules" :model="formData" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="6">
        <el-form-item label="订单号" prop="orderNumber">
          <el-input v-model="formData.orderNumber" ></el-input>
        </el-form-item>
            </el-col>
          <el-col :span="6">
        <el-form-item label="类型" prop="flightType">
          <el-input v-model="formData.flightType" ></el-input>
        </el-form-item>
            </el-col>
          <el-col :span="6">
        <el-form-item label="订单日期" prop="orderDate">
          <el-input v-model="formData.orderDate" ></el-input>
        </el-form-item>
            </el-col>
          <el-col :span="6">
        <el-form-item label="起飞-到达" prop="takeOffArrive">
          <el-input v-model="formData.takeOffArrive" ></el-input>
        </el-form-item>
            </el-col>
          </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
        <el-form-item label="航班日期/航班号" prop="flightNumber" >
          <el-input v-model="formData.flightNumber" ></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="6">
        <el-form-item label="PNR" prop="PNR">
          <el-input v-model="formData.PNR"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="6">
        <el-form-item label="总价/人数" prop="totalPriceNumber">
          <el-input v-modelr="formData.totalPriceNumber"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="6">
        <el-form-item label="订单状态" prop="orderStatus">
          <el-input v-model="formData.orderStatus"></el-input>
        </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
        <el-form-item label="政策ID" prop="policyId">
          <el-input v-model="formData.policyId"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="6">
        <el-form-item label="是否退差额" prop="balance">
          <el-input v-model="formData.balance"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="6">
        <el-form-item label="锁定人" prop="lockingPeople">
          <el-input v-model="formData.lockingPeople"></el-input>
        </el-form-item>
          </el-col>
        </el-row>

          <el-button type="primary" @click="handleAdd">添加航班信息</el-button>
        <el-table>
          <el-table-column
            prop="orderNumber"
            label="出发日期"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="orderDate"
            label="航司"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="takeOffArrive"
            label="主航班号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="flightDateNumber"
            label="航班号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="PNR"
            label="出发地三字码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="totalPriceNumber"
            label="出发机场"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="orderStatus"
            label="出发航站楼"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="policyId"
            label="起飞时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="balance"
            label="到达地三字码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="到达机场"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="到达航站楼"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="到达时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="航程"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="飞行时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="机建费"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="燃油费"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="儿童燃油费"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="机型"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="机型全称"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="共享标记"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="经停标记"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="经停机场三字码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="餐食标记"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="经停次数"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="飞行周期"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="lockingPeople"
            label="退改规则"
            width="100"
          ></el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="300">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
              <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="danger"
                         size="mini">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <br>

        <el-button type="primary" @click="dialogFormVisible = true">添加乘客信息</el-button>
        <el-table>
          <el-table-column
            prop="orderNumber"
            label="姓名"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="flightType"
            label="性别"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="orderDate"
            label="出生年月"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="takeOffArrive"
            label="乘机人类型"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="flightDateNumber"
            label="乘机人证件类型"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="PNR"
            label="乘机人证件号"
            width="350"
          ></el-table-column>


          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="400">
            <template slot-scope="scope">

              <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
              <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="danger"
                         size="mini">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>




  </div>
</template>
<script>
  import orderFilght from './component/orderFilght.vue'

  const defaultData = {

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
        Number:'',//人数
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
    export default {
        name: "",
      components:{
        "vue-orderFilght": orderFilght
      },
        data() {
            return {
                labelPosition: 'left',
                pageFlag: "next",
                pageSize: 10,
                formData: defaultData,
                dialogVisible:false,
                dialogFormVisible: false,
                total: 0,
                tableData: null,

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
                  FlightDate: [
                    {required: true, message: "请输入出发日期", trigger: "blur"},

                  ],

                }
            };
        },
        methods: {

            handleCancel() {
                this.dialogVisible = false;
            },
            // handleSave() {//保存
            //     this.$refs['form'].validate((valid) => {
            //         if (valid){}
            //     })
            // },
            handleUpdate() {//编辑

            },

            handleRemove() {//删除

            },

        },
    };
</script>

