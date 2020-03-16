import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/flag/save",
    method: "post",
    data
  });
}

export function removeOne(flagId) {
  return request({
    url: `/third/flag/remove/one/${flagId}`,
    method: "delete"
  });
}

export function getOne(flagId) {
  return request({
    url: `/third/flag/${flagId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: `/third/flag/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal(params) {
  return request({
    url: `/third/flag/get/total/${params}`,
    method: "get"
  });
}
