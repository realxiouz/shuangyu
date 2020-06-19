import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/open/policy/flag/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/third/open/policy/flag/remove/one/${id}`,
    method: "delete"
  });
}

export function getOne(id) {
  return request({
    url: `/third/open/policy/flag/${id}`,
    method: `get`
  });
}

export function getList(params) {
  return request({
    url: `/third/open/policy/flag/list`,
    method: "get",
    params: params
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/third/open/policy/flag/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/third/open/policy/flag/get/total/`,
    method: "get",
    params: params
  });
}
