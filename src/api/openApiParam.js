import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/api/param/save",
    method: "post",
    data
  });
}

export function removeOne(paramId) {
  return request({
    url: `/third/api/param/remove/one/${paramId}`,
    method: "delete"
  });
}

export function getOne(paramId) {
  return request({
    url: `/third/api/param/${paramId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: `/third/api/param/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal() {
  return request({
    url: `/third/api/param/total`,
    method: "get"
  });
}

export function getList(params) {
  return request({
    url: `/third/api/param/list`,
    method: "get",
    params: params
  });
}

export function getApiUrlList() {
  return request({
    url: `/third/api/param/api/url/list`,
    method: "get"
  });
}

export function getThirdPartyList() {
  return request({
    url: `/third/list`,
    method: "get"
  });
}

