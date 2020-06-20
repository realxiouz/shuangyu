import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/qunar/tts/policy/attr/save/one",
    method: "post",
    data
  });
}

export function removeOne(paramId) {
  return request({
    url: `/qunar/tts/policy/attr/remove/one/${paramId}`,
    method: "delete"
  });
}

export function getOne(paramId) {
  return request({
    url: `/qunar/tts/policy/attr/one/${paramId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, searchForm) {
  return request({
    url: `/qunar/tts/policy/attr/page/list/${pageFlag}/${pageSize}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal(params) {
  return request({
    url: `/qunar/tts/policy/attr/total`,
    method: "get",
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/qunar/tts/policy/attr/list`,
    method: "get",
    params: params
  });
}

export function getApiUrlList() {
  return request({
    url: `/qunar/tts/policy/attr/api/url/list`,
    method: "get"
  });
}
