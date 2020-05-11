<template>
  <div>
    <div v-if="isFlights">
      <span v-if="flights" v-html="_flightsData"></span>
      <span v-else>此航司没有航班信息</span>
    </div>
    <div v-else>
      <span v-if="segments" v-html="_segmentsData"></span>
      <span v-else>此航司没有航段信息</span>
    </div>

    <div slot="footer" class="dialog-footer" style="text-align:right;margin-top:15px;">
      <el-button size="mini" @click="$emit('onCancel')">返 回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "lookLnfo",
  props: ["isFlights", "flights", "segments"],
  data() {
    return {
      flightsData: "",
      segmentsData: ""
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
    _segmentsData: function() {
      if (this.segments) {
        let temp = "";
        this.segments.forEach(item => {
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
