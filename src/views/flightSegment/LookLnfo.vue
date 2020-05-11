<template>
  <div>
    <div v-if="isFlights">
      <span v-if="flights" v-html="_flightsData" style="line-height:1.5;"></span>
      <span v-else>此航段没有航班信息</span>
    </div>
    <div v-else>
      <span v-if="airlines" v-html="_airlinesData" style="line-height:1.5;"></span>
      <span v-else>此航段没有航司信息</span>
    </div>

    <div slot="footer" class="dialog-footer" style="text-align:right;margin-top:15px;">
      <el-button size="mini" @click="$emit('onCancel')">返 回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "lookLnfo",
  props: ["isFlights", "flights", "airlines"],
  data() {
    return {
      flightsData: "",
      airlinesData: ""
    };
  },
  computed: {
    _flightsData: function() {
      if (this.flights) {
        let temp = "";
        this.flights.forEach(item => {
          temp += item + " , ";
        });
        return temp.substring(0, temp.length - 2);
      }
    },
    _airlinesData: function() {
      if (this.airlines) {
        let temp = "";
        this.airlines.forEach(item => {
          temp += item + " , ";
        });
        return temp.substring(0, temp.length - 2);
      }
    }
  },
  methods: {},
  created() {}
};
</script>
