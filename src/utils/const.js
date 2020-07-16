function genArrByMap(obj) {
  let arr = [];
  for (const key in obj) {
    arr.push({
      label: obj[key],
      value: key
    });
  }
  return arr;
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
