import request from "@/utils/request";


export function save(data) {
  return request({
    url: "/order/report/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/order/report/remove/one/${id}`,
    method: "delete"
  });
}

export function getList(params) {
  return request({
    url: `/order/report/list`,
    method: "get",
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/order/report/one/${id}`,
    method: 'get'
  });
}

