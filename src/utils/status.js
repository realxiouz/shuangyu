// 格式化订单状态

export function formatStatus(row) {
  if (row.status === 1) {
    return "下单成功";
  } else if (row.status === 2) {
    return "支付成功等待出票";
  } else if (row.status === 3) {
    return "出票中";
  } else if (row.status === 4) {
    return "出票完成";
  } else if (row.status === 5) {
    return "订单取消";
  } else if (row.status === 10) {
    return "未出票申请退款";
  } else if (row.status === 11) {
    return "退票申请中";
  } else if (row.status == 12) {
    return "退票完成等待退款";
  } else if (row.status == 13) {
    return "退款完成";
  } else if (row.status == 19) {
    return "退款驳回";
  } else if (row.status == 20) {
    return "改签申请中";
  } else if (row.status == 21) {
    return "改签完成";
  } else if (row.status == 29) {
    return "改签驳回";
  } else if (row.status == 40) {
    return "等待座位确认";
  } else if (row.status == 41) {
    return "订座成功等待价格确认";
  } else if (row.status == 50) {
    return "蜗牛订单号错误";
  }
}

export function formatOrderStatus(row) {
  if (row.orderStatus === 1) {
    return "下单成功";
  } else if (row.orderStatus === 2) {
    return "支付成功等待出票";
  } else if (row.orderStatus === 3) {
    return "出票中";
  } else if (row.orderStatus === 4) {
    return "出票完成";
  } else if (row.orderStatus === 5) {
    return "订单取消";
  } else if (row.orderStatus === 10) {
    return "未出票申请退款";
  } else if (row.orderStatus === 11) {
    return "退票申请中";
  } else if (row.orderStatus == 12) {
    return "退票完成等待退款";
  } else if (row.orderStatus == 13) {
    return "退款完成";
  } else if (row.orderStatus == 19) {
    return "退款驳回";
  } else if (row.orderStatus == 20) {
    return "改签申请中";
  } else if (row.orderStatus == 21) {
    return "改签完成";
  } else if (row.orderStatus == 29) {
    return "改签驳回";
  } else if (row.orderStatus == 40) {
    return "等待座位确认";
  } else if (row.orderStatus == 41) {
    return "订座成功等待价格确认";
  } else if (row.orderStatus == 50) {
    return "蜗牛订单号错误";
  }
}

export const statusData = [
  {
    value: 1,
    label: "下单成功"
  },
  {
    value: 2,
    label: "下支付成功等待出票单成功"
  },
  {
    value: 3,
    label: "出票中"
  },
  {
    value: 4,
    label: "出票完成"
  },
  {
    value: 5,
    label: "订单取消"
  },
  {
    value: 10,
    label: "未出票申请退款"
  },
  {
    value: 11,
    label: "退票申请中"
  },
  {
    value: 12,
    label: "退票完成等待退款"
  },
  {
    value: 13,
    label: "退款完成"
  },
  {
    value: 19,
    label: "退款驳回"
  },
  {
    value: 20,
    label: "改签申请中"
  },
  {
    value: 21,
    label: "改签完成"
  },
  {
    value: 29,
    label: "改签驳回"
  },
  {
    value: 40,
    label: "等待座位确认"
  },
  {
    value: 41,
    label: "订座成功等待价格确认"
  },
  {
    value: 50,
    label: "蜗牛订单号错误"
  }
]

// 格式化订单分类
export function formatCategory(row) {
  return row.category === 0 ? "销售单" : "采购单";
}

// 格式化订单类型
export function formatOrderType(row) {
  if (row.orderType === 10) {
    return "出票";
  } else if (row.orderType === 20) {
    return "退票";
  } else if (row.orderType === 21) {
    return "二次退票";
  } else if (row.orderType === 22) {
    return "退差";
  } else if (row.orderType === 23) {
    return "退改";
  } else if (row.orderType === 30) {
    return "改签";
  } else if (row.orderType === 31) {
    return "二次改签";
  } else if (row.orderType === 40) {
    return "未出票申请退款";
  } else {
    return row.orderType
  }
}

//订单类型
export const orderType = [
  {
    value: 10,
    label: "出票"
  },
  {
    value: 20,
    label: "退票"
  },
  {
    value: 21,
    label: "二次退票"
  },
  {
    value: 22,
    label: "退差"
  },
  {
    value: 23,
    label: "退改"
  },
  {
    value: 30,
    label: "改签"
  },
  {
    value: 31,
    label: "二次改签"
  },
  {
    value: 32,
    label: "改签驳回"
  }
]

// 格式化航程类型
export function formatVoyageType(row) {
  if (row.voyageType === 0) {
    return "单程";
  } else if (row.voyageType === 1) {
    return "往返";
  } else if (row.voyageType === 2) {
    return "连程";
  } else {
    return ""
  }
}

// 格式化乘客类型
export function formatAgeType(row) {
  if (row.ageType === 0) {
    return "成人";
  } else if (row.ageType === 1) {
    return "儿童";
  } else {
    return "婴儿"
  }
}

// 	格式化乘机人证件类型:
export function formatCardType(row) {
  if (row.cardType === "NI"||row.cardType ==1) {
    return "身份证";
  } else if (row.cardType === "PP") {
    return "护照";
  } else if (row.cardType === "ID") {
    return "其他";
  } else if (row.cardType === "HX") {
    return "回乡证";
  } else if (row.cardType === "TB") {
    return "台胞证";
  } else if (row.cardType === "GA") {
    return "港澳通行证";
  } else if (row.cardType === "HY") {
    return "国际海员证";
  } else {
    return row.cardType
  }
}

export function subjectCategory(row) {
  if (row.category == "0") {
    return "资产类";
  } else if (row.category == "1") {
    return "负债类";
  } else if (row.category == "2") {
    return "权益类";
  } else if (row.category == "3") {
    return "成本类";
  } else if (row.category == "4") {
    return "损益类";
  } else {
    return row.category
  }
}

//格式化订单任务
export function formatTaskStatus(row) {
  if (row.taskStatus == "0") {
    return "生成未派单";
  } else if (row.taskStatus == "1") {
    return "派单未处理";
  } else if (row.taskStatus == "2") {
    return "提交";
  } else if (row.taskStatus == "3") {
    return "转单";
  } else if (row.taskStatus == "4") {
    return "完成";
  } else if (row.taskStatus == "5") {
    return "任务打回重新派给另外一个人";
  } else if (row.taskStatus == "9") {
    return "取消";
  } else {
    return row.taskStatus
  }
}

export const taskStatusValue = [
  {
    value: "0",
    label: "生成未派单"
  },
  {
    value: "1",
    label: "派单未处理"
  }, {
    value: "2",
    label: "提交"
  },
  {
    value: "3",
    label: "转单"
  }, {
    value: "4",
    label: "完成"
  },
  {
    value: "5",
    label: "任务打回重新派给另外一个人"
  },
  {
    value: "9",
    label: "取消"
  },
]

//格式化订单任务类型
export function formatTaskType(row) {
  if (row.taskType == 1) {
    return "出票";
  } else if (row.taskType == 2) {
    return "退票";
  } else if (row.taskType == 3) {
    return "改签";
  } else if (row.taskType == 4) {
    return "未出票申请退款";
  } else if (row.taskType == 5) {
    return "消息";
  } else if (row.taskType == 6) {
    return "质检";
  } else if (row.taskType == 11) {
    return "补订单";
  } else if (row.taskType == 12) {
    return "填写订单号";
  } else if (row.taskType == 13) {
    return "补流水";
  } else if (row.taskType == 14) {
    return "重复下单或支付";
  } else if (row.taskType == 20) {
    return "应收与扫描不匹配";
  } else if (row.taskType == 30) {
    return "降舱出票";
  } else {
    return "";
  }
}

export const taskTypeValue = [
  {
    value: 1,
    label: "出票"
  },
  {
    value: 2,
    label: "退票"
  },
  {
    value: 3,
    label: "改签"
  },
  {
    value: 4,
    label: "未出票申请退款"
  },
  {
    value: 5,
    label: "消息"
  },
  {
    value: 6,
    label: "质检"
  },
  {
    value: 11,
    label: "补订单"
  },
  {
    value: 12,
    label: "填写订单号"
  }
  ,
  {
    value: 13,
    label: "补流水"
  },
  {
    value: 14,
    label: "重复下单或支付"
  },
  {
    value: 20,
    label: "应收与扫描不匹配"
  },
  {
    value: 30,
    label: "降舱出票"
  }
]

//格式化订单任务类型
export function formatOpenType(row) {
  if (row.openType == -1) {
    return "客户";
  } else if (row.openType == 0) {
    return "客户/供应商";
  } else if (row.openType == 1) {
    return "供应商";
  } else {
    return "";
  }
}
