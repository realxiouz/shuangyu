import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/policy/flag/param/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/policy/flag/param/remove/one/${id}`,
    method: "delete"
  });
}

export function getOne(id) {
  return request({
    url: `/policy/flag/param/${id}`,
    method: `get`
  });
}

export function getList(params) {
  return request({
    url: `/policy/flag/param/list`,
    method: "get",
    params: params
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/policy/flag/param/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/policy/flag/param/get/total/`,
    method: "get",
    params: params
  });
}
