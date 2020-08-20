<template>
  <div class="page">
    <card title="采购">
      <el-table :data="leftData">

      </el-table>
    </card>
    <card title="销售">
      <el-table :data="leftData">

      </el-table>
    </card>
  </div>
</template>

<script>
export default {
  name: 'orderRoot',
  data() {
    return {
      leftData: [],
      rightData: [],
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