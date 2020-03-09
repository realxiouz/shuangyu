import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/third/party/save",
    method: "post",
    data
  });
}

export function removeOne(data) {
  return request({
    url: "/third/party/remove/one/" + data,
    method: "delete"
  });
}

export function getOne(data) {
  return request({
    url: `/third/party/` + data,
    method: `get`
  });
}



export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: "/third/party/page/list/" + pageFlag + "/" + pageSize + "/" + lastId,
    method: "get",
    params: searchForm
  });
}

export function getTotal(data) {
  return request({
    url: "/third/party/get/total",
    method: "get",
    params: data
  });
}
