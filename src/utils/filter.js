import Vue from 'vue';
import moment from 'moment';


Vue.filter('time', (val, fmtStr = 'YYYY-MM-DD hh:mm') => {
    return val ? moment(val).format(fmtStr) : ''
})