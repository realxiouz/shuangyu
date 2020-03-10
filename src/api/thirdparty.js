import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/party/save",
    method: "post",
    data
  });
}

export function removeOne(thirdId) {
  return request({
    url: `/third/party/remove/one/${thirdId}`,
    method: "delete"
  });
}

export function getOne(thirdId) {
  return request({
    url: `/third/party/${thirdId}`,
    method: `get`
  });
}


export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: `/third/party/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: searchForm
  });
}

export function getTotal(thirdName) {
  return request({
    url: `/third/party/get/total/${thirdName}`,
    method: "get"
  });
}
