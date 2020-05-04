import request from "@/utils/request";

export function addOne(data) {
  return request({
    url: "/open/product/mark/add/one",
    method: "post",
    data
  });
}

export function updateOne(data) {
  return request({
    url: "/open/product/mark/update/one",
    method: "post",
    data
  });
}

export function removeOne(paramId) {
  return request({
    url: `/product/mark/remove/one/${paramId}`,
    method: "delete"
  });
}

export function getOne(paramId) {
  return request({
    url: `/product/mark/${paramId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: `/product/mark/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/product/mark/total',
    method: "get",
    params: params

  });
}

export function getList(params) {
  return request({
    url: '/product/mark/list',
    method: "get",
    params: params
  });
}


export function getFirmList() {
  return request({
    url: '/firm/list',
    method: 'get'
  });
}

export function getFlagList(filter) {
  return request({
    url: '/open/flag/list',
    method: "get",
    params: filter
  });
}

export function getListByFlagIds(flagIds) {
  return request({
    url: '/open/flag/list/flagIds',
    method: "get",
    params: {flagIds: flagIds}
  });
}
