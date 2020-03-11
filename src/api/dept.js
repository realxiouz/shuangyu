import request from "@/utils/request";


export function save(data) {
  return request({
    url: "/dept/save",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/dept/remove/one/${id}`,
    method: "delete"
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/dept/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/dept/get/total`,
    method: "get",
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/dept/list`,
    method: "get",
    params: params
  });
}
export function getOne(id) {
  return request({
    url: `/dept/one/${id}`,
    method: 'get'
  });
}

