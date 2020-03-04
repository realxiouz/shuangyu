<template>
  <div class="order-container">
    <el-form :inline="true" :model="searchForm"  :label-position="labelPosition" label-width="110px" >
      <el-row :gutter="20">
        <el-col :span="6">
      <el-form-item label="起始日期:">
          <el-date-picker type="date" placeholder="选择日期" v-model="formData.startDate" style="width: 100%;" ></el-date-picker>
      </el-form-item>
          </el-col>
        <el-col :span="6">
      <el-form-item label="结束日期:">
          <el-date-picker type="date" placeholder="选择日期" v-model="formData.endDate" style="width: 100%;" ></el-date-picker>
      </el-form-item>
        </el-col>
        <el-col :span="6">
      <el-form-item label="特殊查询:">
        <el-select v-model="formData.specialQuery" placeholder="全部" >
          <el-option label="测试1" value="shanghai"></el-option>
          <el-option label="测试2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
        </el-col>
        <el-col :span="6">
      <el-form-item label="联系人电话:">
        <el-input v-model="formData.namePhone" ></el-input>
      </el-form-item>
          </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
      <el-form-item label="乘机人姓名:">
        <el-input v-model="formData.nameAirplane" style="width: 230px"></el-input>
      </el-form-item>
          </el-col>
        <el-col :span="6">
      <el-form-item label="订单号:">
        <el-input v-model="formData.orderNumber" style="width: 230px"></el-input>
      </el-form-item>
          </el-col>
        <el-col :span="6">
      <el-form-item label="票号:">
        <el-input v-model="formData.ticketNumber" style="width: 230px"></el-input>
      </el-form-item>
        </el-col>
        <el-col :span="6">
      <el-form-item label="PNR:">
        <el-input v-model="formData.PNR" ></el-input>
      </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
      <el-form-item label="订单状态:">
        <el-select v-model="formData.orderStatus" placeholder="全部">
          <el-option label="出票中" value="ing"></el-option>
          <el-option label="退票完成" value="exit"></el-option>
          <el-option label="出票完成" value="ok"></el-option>
        </el-select>
      </el-form-item>
          </el-col>
        <el-col :span="6">
      <el-form-item label="航班起始日期:">
        <el-col>
          <el-date-picker type="date" placeholder="选择日期" v-model="formData.flightStartDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
        </el-col>
        <el-col :span="6">
      <el-form-item label="航班截止日期:">
        <el-col>
          <el-date-picker type="date" placeholder="选择日期" v-model="formData.flightEndDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
        </el-col>
        <el-col :span="6">
      <el-form-item label="航班号:">
        <el-input v-model="formData.flightNumber"></el-input>
      </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单类型:">
            <el-select v-model="formData.orderType" placeholder="选择类型">
              <el-option label="测试1" value="1"></el-option>
              <el-option label="测试2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
      <el-form-item label="订单来源:">
        <el-select v-model="formData.orderSource" placeholder="全部">
          <el-option label="去哪网" value="qunawang"></el-option>
          <el-option label="飞猪" value="feizhu"></el-option>
        </el-select>
      </el-form-item>
            </el-col>
        <el-col :span="6">
      <el-form-item label="航程类型:" prop="flightType">
        <el-radio-group v-model="formData.flightType">
          <el-radio v-model="radio" label="单程">单程</el-radio>
          <el-radio v-model="radio" label="往返">往返</el-radio>
          <el-radio v-model="radio" label="全部">全部</el-radio>
        </el-radio-group>
      </el-form-item>
          </el-col>
      </el-row>




      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>

      </el-form>
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="deptId"
              border
              :tree-props="{children: 'children', hasChildren: 'test'}"
    >
      <el-table-column
        prop="orderNumber"
        label="订单号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="flightType"
        label="类型"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="orderDate"
        label="订单日期"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="takeOffArrive"
        label="起飞-到达"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="flightDateNumber"
        label="航班日期/航班号"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="PNR"
        label="PNR"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="totalPriceNumber"
        label="总价/人数"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policyId"
        label="政策ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="balance"
        label="是否退差额"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="lockingPeople"
        label="锁定人"
        width="100"
      ></el-table-column>

      <!--     操作  按钮  需要 编辑 添加 删除  -->
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">
<!--          <el-button @click="handleAdd(scope.row.deptId)" type="success" size="mini">添加</el-button>-->
          <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="danger"
                     size="mini">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog :inline="true" title="订单信息" :visible.sync="dialogVisible" width="90%">
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


        <el-table :data="tableData"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="deptId"
                  border
                  :tree-props="{children: 'children', hasChildren: 'test'}"
        >
          <el-table-column
            prop="orderNumber"
            label="出发日期"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="flightType"
            label="主键唯一标识"
            width="150"
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

          <!--     操作  按钮  需要 编辑 添加 删除  -->
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="300">
            <template slot-scope="scope">
              <!--          <el-button @click="handleAdd(scope.row.deptId)" type="success" size="mini">添加</el-button>-->
              <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
              <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="danger"
                         size="mini">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-table :data="tableData"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="deptId"
                  border
                  :tree-props="{children: 'children', hasChildren: 'test'}"
        >
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

          <!--     操作  按钮  需要 编辑 添加 删除  -->
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="400">
            <template slot-scope="scope">
              <!--          <el-button @click="handleAdd(scope.row.deptId)" type="success" size="mini">添加</el-button>-->
              <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
              <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="danger"
                         size="mini">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>
<!--        <template>-->
<!--          <el-transfer-->
<!--            :titles="['全部角色', '已选角色']"-->
<!--            filter-placeholder="角色名称"-->
<!--            v-model="formData.roles"-->
<!--            @change="handleChange"-->
<!--            :props="{ key: 'roleId',label: 'roleName' }"-->
<!--            :data="allRoles">-->
<!--          </el-transfer>-->
<!--        </template>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>

    const defaultData = {
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
        deptName: "",
        firmId: "",
        domain: "",
        ddId: "",
        ddParentIdId: "",
        roles: []
    };
    export default {
        name: "order",
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

                }
            };
        },
        methods: {
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
            loadData() {//获取数据列表
                if (!this.searchForm.deptName) {
                    this.searchForm = {};
                }
                this.$store
                    .dispatch("order/getList",
                        this.searchForm
                    ).then(data => {
                    console.log(data)
                    if (data) {
                        this.tableData = data;
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            loadRoles() {
                this.$store
                    .dispatch("role/getRoleList")
                    .then(data => {
                        this.allRoles = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // loadOneRole(id) {
            //     this.$store
            //         .dispatch("role/getOne", id)
            //         .then(data => {
            //             if (data) {
            //                 this.paramsRoles.push(data);
            //             }
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         });
            // },
            loadTotal: function () {//查总数
                if (!this.searchForm.deptName) {
                    this.searchForm = {};
                }
                this.$store
                    .dispatch("order/getTotal", {
                        filter: this.searchForm
                    }).then(response => {
                    this.total = response.data;
                }).catch(error => {
                    console.log(error);
                });
            },
            // handleAddChild(deptId) {//添加子级
            //     this.formData = defaultData;
            //     this.formData.pid = deptId;
            //     this.loadRoles();
            //     this.dialogVisible = true;
            // },
            handleAdd() {//添加
                this.formData = defaultData;
                this.loadRoles();
                this.dialogVisible = true;
            },
            handleSearch() {//查询
                this.loadData();
                this.loadTotal();
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {//保存
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (this.paramsRoles && this.paramsRoles.length > 0) {
                            this.formData.roles = this.paramsRoles;
                        }
                        this.$store
                            .dispatch("order/save", this.formData)
                            .then(() => {
                                this.handleSearch();
                            }).catch(error => {
                            console.log(error);
                        });
                        this.dialogVisible = false;
                    }
                })
            },
            handleUpdate(deptId) {//编辑
                this.$store
                    .dispatch("order/getOne", deptId)
                    .then(data => {
                        this.formData = data;
                        let arr = [];
                        if (this.formData.roles && this.formData.roles.length > 0) {
                            this.formData.roles.forEach((item) => {
                                arr.push(item.roleId)
                            })
                            this.formData.roles = arr;
                        }
                        this.dialogVisible = true;
                    }).catch(error => {
                    console.log(error);
                });
                this.loadRoles();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            handleRemove(id) {//删除
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("order/removeOne", id)
                        .then(() => {
                            this.loadData();
                        });
                }).catch(err => {
                    console.error(err);
                });
            },
            handleChange(value, direction, movedKeys) {
                this.paramsRoles = [];
                value.forEach((item) => {
                    this.loadOneRole(item)
                })
            }
        },
        mounted() {
            this.handleSearch();
        }
    };
</script>

