import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (val, fmtStr = 'YYYY-MM-DD hh:mm') => {
  return val ? moment(val).format(fmtStr) : ''
})

Vue.filter('typeVal', i => {
  if (!i.type) {
    return ''
  }
  switch (i.type) {
    case 'String':
      return i['_string']
    case 'Boolean':
      return i['_bool']
    case 'ArrayList':
      return i['_array'].join(',')
    case 'Double':
      return i['_double']
    case 'Float':
      return i['_float']
    case 'Integer':
      return i['_int']
    case 'Byte':
      return i['_byte']
    case 'Short':
      return i['_short']
    case 'Long':
      return i['_long']
    case 'Date':
      return moment(i['_date']).format(i.format || 'YYYY-MM-DD')
    default:
      return i['_string']
  }
})
