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

export function exportOrder(params) {
  var myList = new Array();
  for (var key in params) {
    myList.push(key + "=" + params[key]);
  }
  var paramsStr = "?" + myList.join("&");
  window.location.href = 'http://39.108.230.74:18901/ota/prod-api/order/export' + paramsStr;
  //window.location.href = 'http://192.168.0.135:28021/export/order' + paramsStr;
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

// 51报价搜素
export function get51FlightPrice(data) {
  return request({
    url: `/fobook/get/policy/fareInfo`,
    method: 'get',
    params: data
  });
}

// 蜗牛下单
export function placeAnOpenOrder(data) {
  return request({
    url: `/order/qunar/open/place/an/order`,
    method: 'post',
    data
  });
}
// 51下单
export function placeAnFOOrder(data) {
  return request({
    url: `/fobook/place/order`,
    method: 'post',
    data
  });
}

// 检查是否已经下单
export function checkOrder(data) {
  return request({
    url: `/order/qunar/open/check/order`,
    method: 'post',
    data
  });
}


// 拦截蜗牛出票
export function interceptOrder(data) {
  return request({
    url: `/qunar/open/intercept/order`,
    method: 'post',
    data
  });
}

// 蜗牛支付
export function openPay(params) {
  return request({
    url: `/order/qunar/open/pay`,
    method: 'get',
    params: params
  });
}

// 51Book支付
export function foPay(params) {
  return request({
    url: `/fobook/order/pay`,
    method: 'get',
    params: params
  });
}

// 获取采购订单信息
export function getOrderTree(params) {
  return request({
    url: `/order/purchase/get/tree/${params.rootOrderNo}/${params.category}`,
    method: 'get',
  });
}

// TTS锁单
export function lockOrder(orderNo) {
  return request({
    url: `/qunar/tts/fuwu/lock?orderNo=${orderNo}`,
    method: 'get',
  });
}

// TTS解锁单
export function unLockOrder(orderNo) {
  return request({
    url: `/qunar/tts/fuwu/unlock?orderNo=${orderNo}`,
    method: 'get',
  });
}

// 调用出票中
export function useGoTicket(orderTaskId) {
  return request({
    url: `/qunar/tts/fuwu/go/ticket?orderTaskId=${orderTaskId}`,
    method: 'get',
  });
}


// 获取消息明细
export function getMessageDetail(orderNo) {
  return request({
    url: `/qunar/tts/fuwu/order/massage/detail?orderNo=${orderNo}`,
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
    url: `/qunar/tts/fuwu/get/refund/html?orderNo=${orderNo}`,
    method: 'get',
  });
}

// 退票申请接口
export function refundApply(data) {
  return request({
    url: `/order/qunar/open/refund/apply`,
    method: 'post',
    data: data

  });
}

// 确认退票信息
export function affirmRefund(params) {
  return request({
    url: `/qunar/tts/fuwu/affirm/refund`,
    method: 'post',
    params: params

  });
}


// 拒绝退款
export function refundCheckRefuseReason(params) {
  return request({
    url: `/qunar/tts/fuwu/refund/check/refuse/reason`,
    method: 'get',
    params: params

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
    url: `/qunar/tts/fuwu/get/change/html?orderNo=${orderNo}`,
    method: 'get',
  });
}

// 改签申请接口
export function changeApply(data) {
  return request({
    url: `/order/qunar/open/change/apply`,
    method: 'post',
    data: data

  });
}

// 改签支付接口
export function changePay(data) {
  return request({
    url: `/order/qunar/open/change/pay`,
    method: 'post',
    data: data

  });
}

// 确认改签(受理改签)
export function processingChange(data) {
  return request({
    url: `/qunar/tts/fuwu/processing/change`,
    method: 'post',
    data: data

  });
}

// 拒绝改签
export function rejectChange(data) {
  return request({
    url: `qunar/fuwu/reject/change`,
    method: 'post',
    data: data

  });
}


// 自动重填票号
export function autoRewriteTicket(data) {
  return request({
    url: `/qunar/tts/fuwu/auto/rewrite/ticket/no`,
    method: 'post',
    data: data

  });
}

// 重填票号
export function rewriteTicket(data) {
  return request({
    url: `/qunar/tts/fuwu/rewrite/ticket/no`,
    method: 'post',
    data: data

  });
}
// 非蜗牛补单
export function purchaseOrder(data) {
  return request({
    url: `/order/purchase/save`,
    method: 'post',
    data: data

  });
}

// 蜗牛补单
export function woniuOrder(data) {
  return request({
    url: `/qunar/open/save/woniu/order`,
    method: 'post',
    data: data

  });
}

export function qunarDetailHtml(sourceOrderNo) {
  return request({
    url: `qunar/fuwu/get/detail/html?orderNo=${sourceOrderNo}`,
    method: 'get'
  });

}

export function updateBspTicketNo(orderDetails) {
  return request({
    url: '/eterm/order/update/bsp/ticketno',
    method: 'post',
    data: orderDetails
  });
}
