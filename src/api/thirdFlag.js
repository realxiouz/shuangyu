import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/flag/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/third/flag/remove/one/${id}`,
    method: "delete"
  });
}

export function getOne(id) {
  return request({
    url: `/third/flag/${id}`,
    method: `get`
  });
}

export function getList(params) {
  return request({
    url: `/third/flag/list`,
    method: "get",
    params: params
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/third/flag/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/third/flag/get/total/`,
    method: "get",
    params: params
  });
}
