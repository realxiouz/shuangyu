function genArrByMap(obj) {
  let arr = [];
  for (const key in obj) {
    arr.push({
      label: obj[key],
      value: changeTypeToNumber(key)
    });
  }
  return arr;
}

function changeTypeToNumber(val) {
  let res = val * 1
  return isNaN(res) ? val : res;
}

export const PROPERTY_TABLE = [
  { code: 0, value: '文本' },
  { code: 1, value: '开关' },
  { code: 2, value: '数字' },
  { code: 3, value: '日期' },
  { code: 4, value: '时间' },
  { code: 5, value: '评分' },
  { code: 60, value: '单选' },
  { code: 61, value: '多选' },
  { code: 62, value: '下拉' }
  // { code: 9, value: "对象" },
];

export const VOUCHCHER_TEMPLATE_TABLE = [
  { value: 0, label: '日常支出' },
  { value: 1, label: '采购' },
  { value: 2, label: '销售' },
  { value: 3, label: '工资' },
  { value: 4, label: '税金' },
  { value: 5, label: '折旧和摊销' }
];

export const VOUCHCHER_TEMPLATE_MAP = {
  '0': '日常支出',
  '1': '采购',
  '2': '销售',
  '3': '工资',
  '4': '税金',
  '5': '折旧和摊销'
};

export const PAGE_SIZES = [10, 20, 50, 100];

// 机票相关
export const CARD_TYPES_MAP = {
  NI: '身份证',
  PP: '护照',
  HX: '回乡证',
  TB: '台胞证',
  GA: '港澳通行证',
  HY: '国际海员证',
  ID: '其他'
};

export const CARD_TYPES = genArrByMap(CARD_TYPES_MAP);

export const AGE_TYPES_MAP = {
  0: '成人',
  1: '儿童',
  2: '婴儿'
};

export const AGE_TYPES = genArrByMap(AGE_TYPES_MAP);

export const CATEGORY_MAP = [
  { code: 'CASH', value: '现金' },
  { code: 'BANK', value: '银行存款' },
  { code: 'ALIPAY', value: '支付宝' },
  { code: 'WECHAT', value: '微信支付' },
  { code: 'PNRPAY', value: '汇付' },
  { code: 'BHEASY', value: '易生' },
  { code: 'YEEPAY', value: '易宝' },
  { code: 'INTEGRAL', value: '积分' },
  { code: 'COUPON', value: '优惠券' },
  { code: 'TENPAY', value: '财付通' },
  { code: 'QUNARPAY', value: '商户余额代扣' }
];

export const CATEGORY_TYPES = genArrByMap(CATEGORY_MAP);

export const ORDER_TYPES_MAP = {
  1: '其他入库',
  2: '其他出库',
  100: '销售单',
  101: '销售出库单',
  102: '销售退款单',
  103: '销售退票入库单',
  104: '销售改签入库单',
  105: '销售改签出库单',
  200: '采购单',
  201: '采购入库单',
  202: '采购退款单',
  203: '采购退票出库单',
  204: '采购改签出库单',
  205: '采购改签入库单'
}

export const ORDER_STATUS_MAP = {
  0: '草稿',
  1: '已完成',
  2: '已确认',
  3: '已作废',
}
