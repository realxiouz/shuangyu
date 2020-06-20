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
    method: "post",
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

export function getMany(staffIdList) {
  return request({
    url: "/firm/staff/many",
    method: "get",
    params: staffIdList
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/firm/staff/get/list/page/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: filter
  });
}

/*filter为对用户进行查询所需的条件*/
export function associateUser(filter) {
  return request({
    url: `/firm/staff/associate/user`,
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

export function isExist(account) {
  return request({
    url: `/firm/staff/exist`,
    method: "post",
    params: {account}
  });
}

export function relationUser(staffId, userId) {
  return request({
    url: `/firm/staff/relation/user/${staffId}/${userId}`,
    method: "get"
  });
}
