import request from "@/utils/request";

export function addOne(data) {
  return request({
    url: "/staff/add/one",
    method: "post",
    data
  });
}

export function addMany(data) {
  return request({
    url: "/staff/add/many",
    method: "post",
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/staff/update/one/${id}`,
    method: "post",
    data
  });
}

export function removeOne(staffId) {
  return request({
    url: `/staff/remove/one/${staffId}`,
    method: "delete"
  });
}

export function getOne(staffId) {
  return request({
    url: `/staff/one/${staffId}`,
    method: "get"
  });
}

export function getList(filter) {
  return request({
    url: `/staff/list`,
    method: "get",
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: "/staff/total",
    method: "get",
    params: filter
  });
}

export function getMany(staffIdList) {
  return request({
    url: "/staff/many",
    method: "get",
    params: staffIdList
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/staff/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: filter
  });
}

/*filter为对用户进行查询所需的条件*/
export function associateUser(filter) {
  return request({
    url: `/staff/associate/user`,
    method: "get",
    params: filter
  });
}

export function getLoginInfo(firmId) {
  return request({
    url: `/staff/login/info`,
    method: "get",
    params: {firmId}
  });
}

export function isExist(account) {
  return request({
    url: `/staff/exist`,
    method: "post",
    params: {account}
  });
}

export function relationUser(staffId, userId) {
  return request({
    url: `/staff/relation/user/${staffId}/${userId}`,
    method: "get"
  });
}
