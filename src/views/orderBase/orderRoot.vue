<template>
  <div class="page">
    <el-row :gutter="30">
      <el-col :span="12">
        <el-divider>采购</el-divider>
        <el-tree
          :data="leftData"
          :props="dataProp"
        >
          <template v-slot="{data}">
            <div style="display:flex;justify-content:space-between;align-items:center;flex:1">
              <div>
                <el-tag>{{data.orderType | orderType}}</el-tag>
                <el-tag>{{data.orderStatus | orderStatus}}</el-tag>
              </div>
              <div>
                <template v-if="data.orderType==100||data.orderType==200">
                  <el-button type="text" @click="onReturn(data)">退</el-button>
                  <el-button type="text" @click="onChange(data)">改</el-button>
                </template> 
                <el-button type="text" @click="onDetail(data)">详情</el-button>
              </div>
            </div>
          </template>
        </el-tree>
      </el-col>
      <el-col :span="12">
        <el-divider>销售</el-divider>
        <el-tree
          :data="rightData"
          :props="dataProp"
        >
          <template v-slot="{data}">
            <div style="display:flex;justify-content:space-between;align-items:center;flex:1">
              <div>
                <el-tag>{{data.orderType | orderType}}</el-tag>
                <el-tag>{{data.orderStatus | orderStatus}}</el-tag>
              </div>
              <div>
                <template v-if="data.orderType==100||data.orderType==200">
                  <el-button type="text" @click="onDetail(data)">退</el-button>
                  <el-button type="text" @click="onDetail(data)">改</el-button>
                </template> 
                <el-button type="text" @click="onDetail(data)">详情</el-button>
              </div>
            </div>
          </template>
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'orderRoot',
  data() {
    return {
      leftData: [],
      rightData: [],
      dataProp: {
        label: 'label',
        children: 'children'
      },
    }
  },
  methods: {
    getData() {
      this.getLeftData()
      this.getRightData()
    },
    getLeftData() {
      this.$store.dispatch('productOrder/getPurchaseList', {
        rootOrderNo: this.$route.query.rootNo
      }).then(data => {
        this.leftData = data
      })
    },
    getRightData() {
      this.$store.dispatch('productOrder/getSellList', {
        rootOrderNo: this.$route.query.rootNo
      }).then(data => {
        this.rightData = data
      })
    },
    onShowPassenger() {
      console.log('show passengers')
    },
    onDetail(i) {
      this.$router.push({
        name: "orderBaseEdit",
        query: {
          orderType: i.orderType,
          orderNo: i.orderNo
        }
      });
    },
    onReturn(i) {

    },
    onChange(i) {

    }
  },
  watch: {
    "$route.query.rootNo": {
      handler(val) {
        val && this.getData()
      },
      immediate: true
    }
  }
}
</script>