import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/third/remove/one/${id}`,
    method: "delete"
  });
}

export function getOne(id) {
  return request({
    url: `/third/${id}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/third/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/third/list/`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/third/get/total`,
    method: "get",
    params:params
  });
}
