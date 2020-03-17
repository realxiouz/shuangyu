import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/party/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/third/party/remove/one/${id}`,
    method: "delete"
  });
}

export function getOne(id) {
  return request({
    url: `/third/party/${id}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/third/party/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/third/party/list/`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/third/party/get/total`,
    method: "get",
    params:params
  });
}
