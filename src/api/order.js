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

export function getOrderDetail(orderNo) {
  return request({
    url: `/order/ticket/${orderNo}`,
    method: 'get'
  });
}

// 查最低报价
export function getOrderMinPrice(data) {
  return request({
    url: `/minimum/price`,
    method: 'post',
    data
  });
}

// 查航班
export function getOrderFlight(data) {
  return request({
    url: `/get/flight`,
    method: 'post',
    data
  });
}
// 报价搜素
export function getOrderPrice(data) {
  return request({
    url: `/get/price`,
    method: 'post',
    data
  });
}