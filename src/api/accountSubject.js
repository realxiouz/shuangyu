import request from "@/utils/request";


export function save(data) {
  return request({
    url: "/finance/account/subject/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/account/subject/remove/one/${id}`,
    method: "delete"
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/finance/account/subject/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/finance/account/subject/get/root/total`,
    method: "get",
    params: params
  });
}

export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/finance/account/subject/get/root/list/page/${pageFlag}/${pageSize}`,
    method: "get",
    params: filter
  });
}

export function getList(params) {
  return request({
    url: `/finance/account/subject/get/list`,
    method: "get",
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/finance/account/subject/get/one/${id}`,
    method: 'get'
  });
}

export function getSelectingList(filter) {
  return request({
    url: `/finance/account/subject/list/selecting`,
    method: 'get',
    params: filter
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/finance/account/subject/async/tree/list/${pid}`,
    method: 'get',
    params: filter
  });
}

