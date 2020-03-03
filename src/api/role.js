import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/role/save",
    method: "post",
    data
  });
}

export function removeOne(data) {
  return request({
    url: "/role/remove/one/" + data,
    method: "delete"
  });
}

export function getOne(data) {
  return request({
    url: `/role/get/one/` + data,
    method: `get`
  });
}

export function getRoleList(filter) {
  return request({
    url: "/role/list",
    method: "get",
    params: filter
  });
}


export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: "/role/page/list/" + pageFlag + "/" + pageSize + "/" + lastId,
    method: "get",
    params: searchForm
  });
}

export function getTotal(data) {
  return request({
    url: "/role/get/total",
    method: "get",
    params: data
  });
}

export function getNavsTreeData() {
  return request({
    url: "/nav/get/sync/tree",
    method: "get"
  });
}

export function getAll() {
  return request({
    url: "/role/all",
    method: "get"
  });
}
