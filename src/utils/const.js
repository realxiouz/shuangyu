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
  let res = val * 1;
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
  { value: 3, label: '付款' },
  { value: 4, label: '工资' },
  { value: 5, label: '税金' },
  { value: 6, label: '折旧和摊销' }
];

export const VOUCHCHER_TEMPLATE_MAP = {
  '0': '日常支出',
  '1': '采购',
  '2': '销售',
  '3': '付款',
  '4': '工资',
  '5': '税金',
  '6': '折旧和摊销'
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
  { code: 'BANK_TRANSFER', value: '银行转账' },
  { code: 'ALIPAY', value: '支付宝' },
  { code: 'WXPAY', value: '微信支付' },
  { code: 'ONLINE_BANKING', value: '网银' },
  { code: 'PLFPAY', value: '余额' },
  { code: 'PNRPAY', value: '汇付' },
  { code: 'BHEASY', value: '易生' },
  { code: 'YEEPAY', value: '易宝' },
  { code: 'INTEGRAL', value: '积分' },
  { code: 'COUPON', value: '优惠券' },
  { code: 'TENPAY', value: '财付通' },
  { code: 'QUNARPAY', value: '商户余额代扣' }
];

export const CATEGORY_TYPES = genArrByMap(CATEGORY_MAP);

export const PAYMENT_MAP = [
  { code: 'CASH', value: '现金' },
  { code: 'BANK_TRANSFER', value: '银行转账' },
  { code: 'ALIPAY', value: '支付宝' },
  { code: 'WXPAY', value: '微信支付' },
  { code: 'ONLINE_BANKING', value: '网银' },
  { code: 'PLFPAY', value: '余额' },
  { code: 'PNRPAY', value: '汇付' },
  { code: 'BHEASY', value: '易生' },
  { code: 'YEEPAY', value: '易宝' },
  { code: 'INTEGRAL', value: '积分' },
  { code: 'COUPON', value: '优惠券' },
  { code: 'TENPAY', value: '财付通' },
  { code: 'QUNARPAY', value: '商户余额代扣' }
];

export const PAYMENT_TYPES = genArrByMap(PAYMENT_MAP);

export const ORDER_TYPES_MAP = {
  OTHER_IN: '其他入库',
  OTHER_OUT: '其他出库',
  SELL: '销售单',
  SELL_OUT: '销售出库单',
  SELL_REFUND: '销售退款单',
  SELL_REFUND_IN: '销售退票入库单',
  SELL_CHANGE_IN: '销售改签入库单',
  SELL_CHANGE_OUT: '销售改签出库单',
  BUY: '采购单',
  BUY_IN: '采购入库单',
  BUY_REFUND: '采购退款单',
  BUY_REFUND_OUT: '采购退票出库单',
  BUY_CHANGE_OUT: '采购改签出库单',
  BUY_CHANGE_IN: '采购改签入库单'
};

export const ORDER_STATUS_MAP = {
  DRAFT: '草稿',
  COMPLETED: '已完成',
  CONFIRMED: '已确认',
  INVALID: '已作废',
  DISALLOW: '驳回',
  CLOSED: '已关闭'
};

export const WAREHOUSE_STATUS_MAP = {
  IN: '未入库',
  IN_OK: '已入库',
  OUT: '未出库',
  OUT_OK: '已出库'
};

// 会员类型
export const MEMBER_TYPES = [
  { code: 'FIRM', value: '企业' },
  { code: 'USER', value: '个人' }
];

export const MEMBER_TYPE_OBJ = {
  FIRM: '企业',
  USER: '个人'
};

// 会员状态
export const MEMBER_STATUS = [
  { code: 'ENABLE', value: '可用' },
  { code: 'DISABLE', value: '禁用' }
];

export const MEMBER_STATUS_OBJ = {
  ENABLE: '可用',
  DISABLE: '禁用'
};

// 银行卡类型
export const BANK_CARD_TYPES = [
  { code: 'DEBIT_CARD', value: '借记卡' },
  { code: 'CREDIT_CARD', value: '信用卡' }
];

export const BANK_CARD_TYPES_OBJ = {
  DEBIT_CARD: '借记卡',
  CREDIT_CARD: '信用卡'
};
