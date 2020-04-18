import request from "@/utils/request";


export function save(data) {
  return request({
    url: "/order/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/order/remove/one/${id}`,
    method: "delete"
  });
}

export function getList(params) {
  return request({
    url: `/order/list`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/order/total`,
    method: 'get',
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/order/one/${id}`,
    method: 'get'
  });
}

//统计
export function getTimeCount(params) {
  return request({
    url: `/order/time/count`,
    method: 'get',
    params: params
  });
}

//订单时间统计
export function getCount(params) {
  return request({
    url: `/order/count`,
    method: 'get',
    params: params
  });
}


export function getOrderDetail(orderNo) {
  return request({
    url: `/order/ticket/${orderNo}`,
    method: 'get'
  });
}

// 查最低报价
export function getOrderMinPrice(data) {
  return request({
    url: `/qunar/open/minimum/price`,
    method: 'post',
    data
  });
}

// 查航班
export function getOrderFlight(data) {
  return request({
    url: `/qunar/open/get/flight`,
    method: 'post',
    data
  });
}
// 报价搜素
export function getFlightPrice(data) {
  return request({
    url: `/qunar/open/get/price`,
    method: 'post',
    data
  });
}

// place an order下单

export function placeAnOrder(data) {
  return request({
    url: `/qunar/open/place/an/order`,
    method: 'post',
    data
  });
}

// 蜗牛支付
export function openPay(params) {
  return request({
    url: `/qunar/open/pay`,
    method: 'get',
    params: params
  });
}

// 获取采购订单信息
export function getOrderTree(params) {
  return request({
    url: `qunar/open/order/get/tree/${params.rootOrderNo}/${params.category}`,
    method: 'get',
  });
}

// TTS锁单
export function lockOrder(orderNo) {
  return request({
    url: `/qunar/fuwu/lock?orderNo=${orderNo}`,
    method: 'get',
  });
}

// TTS解锁单
export function unLockOrder(orderNo) {
  return request({
    url: `/qunar/fuwu/unlock?orderNo=${orderNo}`,
    method: 'get',
  });
}

// 调用出票中
export function useGoTicket(orderTaskId) {
  return request({
    url: `/qunar/fuwu/go/ticket?orderTaskId=${orderTaskId}`,
    method: 'get',
  });
}


// 获取消息明细
export function getMessageDetail(orderNo) {
  return request({
    url: `/qunar/fuwu/order/massage/detail?orderNo=${orderNo}`,
    method: 'get',
  });
}


// 退票查询接口
export function refundSearch(purchaseOrderNo) {
  return request({
    url: `/qunar/open/refund/search?purchaseOrderNo=${purchaseOrderNo}`,
    method: 'get',
  });
}

// 获取销售退票信息
export function getRefundHtml(orderNo) {
  return request({
    url: `/qunar/fuwu/get/refund/html?orderNo=${orderNo}`,
    method: 'get',
  });
}

// 退票申请接口
export function refundApply(data) {
  return request({
    url: `/qunar/open/refund/apply`,
    method: 'post',
    data: data

  });
}

// 改签查询接口
export function changeSearch(params) {
  return request({
    url: `/qunar/open/change/search/${params.purchaseOrderNo}/${params.changeDptDate}`,
    method: 'get',
  });
}

// 获取销售改签信息
export function getChangeHtml(orderNo) {
  return request({
    url: `/qunar/fuwu/get/change/html?orderNo=${orderNo}`,
    method: 'get',
  });
}

// 改签申请接口
export function changeApply(data) {
  return request({
    url: `/qunar/open/change/apply`,
    method: 'post',
    data: data

  });
}


// 非蜗牛补单
export function purchaseOrder(data) {
  return request({
    url: `/qunar/open/save/purchase/order`,
    method: 'get',
    data: data

  });
}

// 蜗牛补单
export function woniuOrder(data) {
  return request({
    url: `/qunar/open/save/woniu/order`,
    method: 'get',
    data: data

  });
}
