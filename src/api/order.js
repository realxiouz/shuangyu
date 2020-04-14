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
    url: `/order/get/tree/${params.rootOrderNo}/${params.category}`,
    method: 'get',
  });
}