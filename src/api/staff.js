import request from "@/utils/request";

export function addOne(data) {
  return request({
    url: "/firm/staff/add/one",
    method: "post",
    data
  });
}

export function addMany(data) {
  return request({
    url: "/firm/staff/add/many",
    method: "post",
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/firm/staff/update/one/${id}`,
    method: "put",
    data
  });
}

export function removeOne(staffId) {
  return request({
    url: `/firm/staff/remove/one/${staffId}`,
    method: "delete"
  });
}

export function getOne(staffId) {
  return request({
    url: `/firm/staff/get/one/${staffId}`,
    method: "get"
  });
}

export function getList(filter) {
  return request({
    url: `/firm/staff/get/list`,
    method: "get",
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: "/firm/staff/get/total",
    method: "get",
    params: filter
  });
}

export function getMany(data) {
  return request({
    url: "/firm/staff/get/many",
    method: "post",
    data
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/firm/staff/get/list/page/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: filter
  });
}

export function getLoginInfo(firmId) {
  return request({
    url: `/firm/staff/login/info`,
    method: "get",
    params: {firmId}
  });
}

export function isExist(params) {
  return request({
    url: `/firm/staff/exist`,
    method: "get",
    params
  });
}

export function relationUser(staffId, userId) {
  return request({
    url: `/firm/staff/relation/user/${staffId}/${userId}`,
    method: "get"
  });
}
