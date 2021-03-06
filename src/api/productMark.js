import request from "@/utils/request";

export function addOne(data) {
  return request({
    url: "/third/open/product/mark/add/one",
    method: "post",
    data
  });
}

export function updateOne(data) {
  return request({
    url: "/third/open/product/mark/update/one",
    method: "post",
    data
  });
}

export function removeOne(paramId) {
  return request({
    url: `/third/product/mark/remove/one/${paramId}`,
    method: "delete"
  });
}

export function getOne(paramId) {
  return request({
    url: `/third/product/mark/${paramId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/third/product/mark/page/list/${pageFlag}/${pageSize}`,
    method: "get",
    params
  });
}

export function getTotal(params) {
  return request({
    url: '/third/product/mark/total',
    method: "get",
    params: params

  });
}

export function getList(params) {
  return request({
    url: '/third/product/mark/list',
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
    url: '/third/open/flag/list',
    method: "get",
    params: filter
  });
}

export function getListByFlagIds(flagIds) {
  return request({
    url: '/third/open/flag/list/flagIds',
    method: "get",
    params: {flagIds: flagIds}
  });
}
