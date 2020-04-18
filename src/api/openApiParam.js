import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/open/api/param/save",
    method: "post",
    data
  });
}

export function removeOne(paramId) {
  return request({
    url: `/open/api/param/remove/one/${paramId}`,
    method: "delete"
  });
}

export function getOne(paramId) {
  return request({
    url: `/open/api/param/${paramId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: `/open/api/param/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal() {
  return request({
    url: `/open/api/param/total`,
    method: "get"
  });
}

export function getList(params) {
  return request({
    url: `/open/api/param/list`,
    method: "get",
    params: params
  });
}

export function getApiUrlList() {
  return request({
    url: `/open/api/param/api/url/list`,
    method: "get"
  });
}

export function getOpenPartyList() {
  return request({
    url: `/open/list`,
    method: "get"
  });
}

