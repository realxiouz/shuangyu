<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" style="margin-bottom:15px;margin-left:22px;">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="onAdd"
        >添加</el-button
      >
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column
        prop="airportCode"
        label="三字码"
        align="center"
      ></el-table-column>
      <el-table-column label="机场名称" align="center">
        <template slot-scope="scope">
          <span>{{ formatAirport(scope.row.airportName) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="airportCity"
        label="机场所在城市"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.airportCode)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button @click="onDel(scope.row.airportCode)" type="danger" size="small"
            >删除</el-button
          >
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
    ></el-pagination>

    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"></edit>
    
  </div>
</template>
<script>
import search from "./Search.vue";
import edit from "./Edit.vue";
import {MIXIN_LIST} from "@/utils/mixin";


export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      dialogVisible: false,
      deleteForSearch: false,
      airportCode:'',
      keyName:'airportCode',
      actions: {
        getPageList: 'airport/getPageList',
        removeOne: 'airport/removeOne'
      }
    };
  },
  methods: {
   
    // handleSave(formData) {
    //   this.dialogVisible = false;

    //   let url = "";
    //   if (this.update) {
    //     url = "airport/updateOne";
    //   } else {
    //     url = "airport/addOne";
    //   }
    //   this.$store
    //     .dispatch(url, formData)
    //     .then(() => {
    //       this.loadData();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    handleCancel() {
      this.dialogVisible = false;
    },
    
    delete(airportCode) {
      this.$store
        .dispatch("airport/removeOne", { airportCode: airportCode })
        .then(() => {
          this.lastId = "blank";
          if (1 === this.tableData.length && !this.deleteForSearch) {
            this.handlePrevClick();
          } else {
            this.loadData();
          }
          this.deleteForSearch = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    open(func, data, message) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          func(data);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    initAirport(airportList) {
      if (null != airportList && airportList.length < 5) {
        let nameString = "";
        airportList.forEach(item => {
          nameString = nameString + item + ", ";
        });
        return nameString.substring(0, nameString.length - 2);
      } else if (null != airportList && airportList.length > 5) {
        let nameString = "";
        for (let i = 0; i < 5; i++) {
          nameString = nameString + airportList[i];
        }
        return nameString.substring(0, nameString.length - 2) + "...";
      } else {
        return "";
      }
    }
  },
  computed: {
    formatAirport() {
      return function(airportList) {
        return this.initAirport(airportList);
      };
    }
  },
  components: {
    edit,
    search
  }
};
</script>
