<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="航司二字码">
        <el-input v-model="searchForm.airlineCode" placeholder="航司二字码"></el-input>
      </el-form-item>
      <el-form-item label="舱位">
        <el-input v-model="searchForm.cabin" placeholder="舱位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-button type="primary" @click="add">添加</el-button>
    </el-form>
    <el-table :data="tableData" ref="tableData" @row-dblclick="handleEdit" style="width: 100%">
      <el-table-column
        prop="airlineCode"
        label="航司二字码"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="cabin"
        label="舱位"
        width="300"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="removeOne(scope.row.refundChangeRuleId)" type="danger" size="small">删除</el-button>
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
      :total="total">
    </el-pagination>
    <el-dialog title="退改规则信息" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="90px" :inline="true">
        <el-form-item prop="airlineCode" label="航司二字码">
          <el-select v-model="form.airlineCode" @change="initCabins" filterable allow-create>
            <el-option
              v-for="item in airlines"
              :key="item.airlineCode"
              :label="item.airlineName"
              :value="item.airlineCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cabin" label="舱位">
          <el-select v-model="form.cabin" filterable allow-create default-first-option>
            <el-option
              v-for="item in cabins"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row v-for="(ruleItem, index) in form.rules" :key="form.rules[index].key">
          <el-form-item>
            <el-input v-model="form.rules[index].id" placeholder="退改规则标识（例如：T0  G0）"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.rules[index].value" placeholder="退改规则值"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.rules[index].label" placeholder="退改规则说明"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="index!=0" type="danger" class="el-icon-remove-outline"
                       @click="deleteRuleItem(index)"></el-button>
            <el-button v-if="index==0" type="primary" class="el-icon-circle-plus-outline"
                       @click="addRuleItem()"></el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getAirlineList} from '@/api/airline'

  export default {
    name: 'refundChangeRule',
    data() {
      return {
        searchForm: {},
        airlines: [{}],
        cabins: [{}],
        form: {
          airlineCode: '',
          cabin: '',
          rules: [{}]
        },
        dialogVisible: false,
        tableData: [],
        lastId: '0',
        pageFlag: 'next',
        pageSize: 10,
        total: 0,
        currentPage: 0
      };
    },
    methods: {
      add() {
        this.dialogVisible = true;
      },
      addRuleItem() {
        this.form.rules.push({});
      },
      deleteRuleItem(index) {
        this.form.rules.splice(index, 1);
      },
      initAirlines() {
        getAirlineList({}).then(response => {
          if (response.data) {
            this.airlines = response.data;
          }
        }).catch(error => {
          console.log(error);
        });
      },
      initCabins(airlineCode) {
        this.form.cabin = '';
        var cabinsArr = [];
        for (var i = 0; i < this.airlines.length; i++) {
          if (this.airlines[i].airlineCode == airlineCode) {
            cabinsArr = this.airlines[i].cabins.split(",");
            break;
          }
        }
        var _cabins = [{}];
        if (cabinsArr.length > 0) {
          for (var j = 0; j < cabinsArr.length; j++) {
            _cabins.push({value: cabinsArr[j], label: cabinsArr[j]});
          }
        }
        this.cabins=_cabins;
      },
      loadData() {
        this.$store
          .dispatch('refundChangeRule/list', {
            pageSize: this.pageSize,
            lastId: this.lastId,
            pageFlag: this.pageFlag,
            searchForm: this.searchForm
          })
          .then(data => {
            this.loadTotal(this.searchForm);
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTotal() {
        this.$store
          .dispatch('refundChangeRule/total', this.searchForm)
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.lastId = '0';
        this.loadData();
      },
      prevClick() {
        this.pageFlag = 'prev';
        this.lastId = this.tableData[0].refundChangeRuleId;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = 'next';
        this.lastId = this.tableData[this.tableData.length - 1].refundChangeRuleId;
        this.loadData();
      },
      removeOne(id) {
        this.$confirm('是否确定删除退改规则信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch('refundChangeRule/removeOne', id)
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        }).catch(err => {
          console.error(err);
        });
      },
      handleEdit(row) {
        this.dialogVisible = true;
        this.form = row;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        console.log(this.form);
        this.$store
          .dispatch('refundChangeRule/save', this.form)
          .then(data => {
            console.log(data);
            this.lastId = '0';
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      handleSearch() {
        this.lastId = '0';
        this.loadData();
      },
    },
    mounted() {
      this.loadData();
      this.initAirlines();
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
