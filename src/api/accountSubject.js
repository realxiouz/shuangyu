import request from "@/utils/request";


export function save(data) {
  return request({
    url: "/subject/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/subject/remove/one/${id}`,
    method: "delete"
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/subject/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/subject/get/total`,
    method: "get",
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/subject/list`,
    method: "get",
    params: params
  });
}
export function getOne(id) {
  return request({
    url: `/subject/one/${id}`,
    method: 'get'
  });
}

