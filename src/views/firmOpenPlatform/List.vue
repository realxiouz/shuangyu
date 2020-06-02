<template>
  <div class="bigBox">
    <div class="searchBox">
      <firm-search @onSearch="handleSearch"></firm-search>
    </div>
    <div class="contentBox">
      <!--
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      -->
      <el-table
        highlight-current-row
        v-loading="loading"
        size="mini"
        :data="tableData"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
              <!--
              <el-form-item label="企业名称">
                <span>{{ props.row.firmName }}</span>
                <el-button type="primary" @click="detailsOnClick('http://www.baidu.com')">点击跳转</el-button>
              </el-form-item>
              -->
            <el-row :gutter="10">
              <template v-for="item in props.row.configNavs">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                  <el-button :key="item" type="primary" @click="detailsOnClick(item.uri)">{{ item.name }}</el-button>
                </el-col>
              </template>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="accountName" label="收款人户名" align="left" sortable width="180"></el-table-column>
        <el-table-column prop="accountType" label="资金账号类型" :formatter="accountTypeFormat" align="center" width="100"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账号" align="center" width="180"></el-table-column>
        <el-table-column prop="bankName" label="银行名称" align="center" width="180"></el-table-column>
        <el-table-column prop="categoryCode" label="类别编码" align="center" width="180"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称" align="center" width="180"></el-table-column>
        <el-table-column prop="domain" label="企业域名" align="center" width="180"></el-table-column>
        <el-table-column prop="financeEmail" label="联系人电子邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="financeName" label="财务联系人" align="center" width="180"></el-table-column>
        <el-table-column prop="financePhone" label="联系人电话" align="center" width="180"></el-table-column>
        <el-table-column prop="merchantDomain" label="商户(客户/供应商)域名" align="center" width="180"></el-table-column>
        <el-table-column prop="merchantType" label="类型" :formatter="merchantTypeFormat" align="center" width="180"></el-table-column>
        <el-table-column prop="openCode" label="开放平台编码" align="center" width="180"></el-table-column>
        <el-table-column prop="openName" label="开放平台名称" align="center" width="180"></el-table-column>
        <el-table-column prop="paymentType" label="付款方式" align="center" width="180"></el-table-column>
        <el-table-column prop="priority" label="重要性" align="center" width="180"></el-table-column>
        <el-table-column prop="paymentType" label="付款方式" align="center" width="180"></el-table-column>
        <el-table-column prop="staffName" label="负责人姓名" align="center" width="180"></el-table-column>
        <el-table-column prop="taxNo" label="税务登记号" align="center" width="180"></el-table-column>
        <el-table-column prop="taxRate" label="税率" align="center" width="180"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
    import firmEdit from "./Edit";
    import firmSearch from "./Search";
    var test = [
      {
        "accountName": "string",
        "accountType": 0,
        "bankAccount": "string",
        "bankName": "string",
        "categoryCode": "string",
        "categoryName": "string",
        "configNavs": [
          {
            "name": "string",
            "uri": "string"
          },
          {
            "name": "string1",
            "uri": "string1"
          }
        ],
        "configUri": "string",
        "domain": "string",
        "financeEmail": "string",
        "financeName": "string",
        "financePhone": "string",
        "firm": {
          "adcode": "string",
          "address": "string",
          "adname": "string",
          "birthDate": 0,
          "domain": "string",
          "email": "string",
          "firmCode": "string",
          "firmId": "string",
          "firmName": "string",
          "firmType": 0,
          "fullName": "string",
          "gender": 0,
          "hasChildren": true,
          "level": 0,
          "location": {},
          "officialUrl": "string",
          "openId": "string",
          "path": "string",
          "phone": "string",
          "pid": "string",
          "roles": [
            "string"
          ],
          "tags": [
            "string"
          ]
        },
        "firmId": "string",
        "merchantDomain": "string",
        "merchantId": "string",
        "merchantType": 0,
        "openCode": "string",
        "openId": "string",
        "openName": "string",
        "paymentType": "string",
        "priority": 0,
        "remark": "string",
        "sharedStaffs": [
          "string"
        ],
        "sort": 0,
        "staffId": "string",
        "staffName": "string",
        "taxNo": "string",
        "taxRate": 0
      }
    ];
    export default {
        data() {
            return {
                //loading: true,
                loading:false,
                //tableData: [],
                tableData:test,
                pageFlag: 1,
                pageSize: 10,
                lastId: null,
                total: 0
            };
        },
        methods: {
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].firmId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].firmId;
                this.loadData();
            },
            /*加载列表*/
            loadData(params = {}) {
                if (this.lastId) {
                    params.lastId = this.lastId;
                }
                this.$store
                    .dispatch("firm/getConfigPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(params);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            loadTotal(params) {
                this.$store
                    .dispatch("firm/getConfigTotal", {filter: params})
                    .then(data => {
                        if (data) {
                            this.total = data.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            /*根据关键字进行搜索*/
            handleSearch(params) {
                const newParams = {};
                if (params) {
                    for (let key in params) {
                        if (params[key]) {
                            newParams[key] = params[key];
                        }
                    }
                }
                this.loadData(newParams);
                this.$message({
                    type: "success",
                    message: "查询成功！"
                });
            },
          //点击展开行中的按钮
          detailsOnClick(url){
              window.open(url);
          },
          //账户类型格式化值
          accountTypeFormat(row) {
            switch(row.accountType)
            {
              case 0:
                return "现金";
              case 1:
                return "银行存款";
              case 2:
                return "支付宝";
              case 3:
                return "微信支付";
              case 4:
                return "汇付";
              case 5:
                return "易宝";
            }
          },
          //客户类型格式化值
          merchantTypeFormat(row){
            switch(row.accountType)
            {
              case 0:
                return "现金";
              case 1:
                return "银行存款";
              case 2:
                return "支付宝";
            }
          }
        },
        mounted() {
          //this.loadData();
        },
        components: {
            firmSearch
        }
    };
</script>
