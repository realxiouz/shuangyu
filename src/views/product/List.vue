<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加商品</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;"
        size="mini"
      >
        <el-table-column prop="productCode" label="商品编码" align="center"></el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="specification" label="规格" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column label="库存">
          <template v-slot="{row}">
            {{row.stock ||'todo'}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <!-- <el-button @click="inventoryUpdate(scope.row.productId)" type="primary" size="mini">库存编辑</el-button> -->
            <el-button @click="handleUpdate(scope.row.productId)" type="text" size="mini" class="btn-primary">商品编辑</el-button>
            <el-button
              @click.native.prevent="onDel(scope.row.productId)"
              type="text" size="mini" class="btn-danger"
            >删除
            </el-button>
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
                keyName:'productId',
                productId: "",
                actions: {
                    getPageList: 'product/getPageList',
                    removeOne: 'product/removeOne'
                }
            };
        },
        methods: {
            handleAdd() {
                let path = "";
                path = "/product/config";
                this.$router.push({
                    path: path
                });
            },
            inventoryUpdate(id) {
                let path = "";
                path = "/product/inventory/edit";
                this.$router.push({
                    path: path,
                    query: {
                        productId: id
                    }
                });
            },
            handleUpdate(id) {
                // let path = "";
                // path = "/product/edit";
                // this.$router.push({
                //     path: path,
                //     query: {
                //         productId: id
                //     }
                // });
                this.$router.push({
                  path: '/product/config',
                  query: {
                    productId: id
                  }
                })
            }, 
        },
        components: {
            search,
            edit
        }
    };
</script>

