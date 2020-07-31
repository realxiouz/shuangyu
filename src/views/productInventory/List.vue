<template>
  <div class="page">
      <search class="page-search" @onSearch="onSearch"></search>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        size="mini"
      >
        <el-table-column prop="productCode" label="商品编码" align="center"></el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
        <el-table-column prop="maxStockQuantity" label="库存上线" align="center"></el-table-column>
        <el-table-column prop="minStockQuantity" label="库存下线" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="price" label="单价" align="center"></el-table-column>
        <el-table-column prop="cost" label="成本" align="center"></el-table-column>
        <el-table-column prop="skuName" label="属性名称" align="center"></el-table-column>
        <el-table-column prop="skuId" label="sku" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.inventoryId)" type="primary" size="mini">查看</el-button>
            <el-button @click="onDel(scope.row.inventoryId)" type="danger" size="mini">删除 </el-button>
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
    import search from "./Search";
    import edit from "./Edit";
    import {MIXIN_LIST} from "@/utils/mixin";

    export default {
        mixins: [MIXIN_LIST],
        name: "list",
        data() {
            return {
                dialogVisible: false,
                inventoryId:'',
                keyName:'inventoryId',
                actions: {
                    getPageList: 'productInventory/getPageList',
                    removeOne: 'productInventory/removeOne'
                }
            };
        },
        methods: {
            handleUpdate(id) {
                let path = "";
                path = "/product/inventory/edit";
                this.$router.push({
                    path: path,
                    query: {
                        inventoryId: id
                    }
                });
            }
        },
        created() {
            this.loadData();
        },
        components: {
            search,
          //  edit
        }
    };
</script>

