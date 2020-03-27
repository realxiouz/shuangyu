import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/role/save",
    method: "post",
    data
  });
}

export function removeOne(roleID) {
  return request({
    url: `/role/remove/one/${roleID}`,
    method: "delete"
  });
}

export function getOne(roleID) {
  return request({
    url: `/role/get/one/${roleID}`,
    method: `get`
  });
}

export function getMany() {
  return request({
    url: `/role/get/many`,
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


export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/role/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: "/role/get/total",
    method: "get",
    params: filter
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
