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
    url: `/open/remove/one/${id}`,
    method: "delete"
  });
}

export function getOne(id) {
  return request({
    url: `/open/${id}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/open/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/open/list/`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/open/get/total`,
    method: "get",
    params: params
  });
}
