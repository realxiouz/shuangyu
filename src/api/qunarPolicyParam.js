import request from "@/utils/request";

export function save(data) {
  debugger
  return request({
    url: "/qunar/policy/param/save",
    method: "post",
    data
  });
}

export function removeOne(paramId) {
  return request({
    url: `/qunar/policy/param/remove/one/${paramId}`,
    method: "delete"
  });
}

export function getOne(paramId) {
  return request({
    url: `/qunar/policy/param/one/${paramId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, searchForm) {
  return request({
    url: `/qunar/policy/param/page/list/${pageFlag}/${pageSize}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal() {
  return request({
    url: `/qunar/policy/param/total`,
    method: "get"
  });
}

export function getList(params) {
  return request({
    url: `/qunar/policy/param/list`,
    method: "get",
    params: params
  });
}

export function getApiUrlList() {
  return request({
    url: `/qunar/policy/param/api/url/list`,
    method: "get"
  });
}
