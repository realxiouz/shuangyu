import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/policy/interface/param/save",
    method: "post",
    data
  });
}

export function removeOne(paramId) {
  return request({
    url: `/policy/interface/param/remove/one/${paramId}`,
    method: "delete"
  });
}

export function getOne(paramId) {
  return request({
    url: `/policy/interface/param/${paramId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: `/policy/interface/param/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal() {
  return request({
    url: `/policy/interface/param/total`,
    method: "get"
  });
}

export function getList(params) {
  return request({
    url: `/policy/interface/param/list`,
    method: "get",
    params: params
  });
}

export function getPolicyEnumList() {
  return request({
    url: `/policy/interface/param/policy/enum/list`,
    method: "get"
  });
}

export function getThirdPartyList() {
  return request({
    url: `/third/party/list`,
    method: "get"
  });
}

