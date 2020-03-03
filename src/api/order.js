import request from "@/utils/request";


export function save(data) {
  return request({
    url: "/dept/save",
    method: "post",
    data
  });
}

export function removeOne(deptId) {
  return request({
    url: `/dept/remove/one/${deptId}`,
    method: "delete"
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/dept/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: filter
  });
}

export function getTotal(data) {
  return request({
    url: `/dept/get/total`,
    method: "get",
    params: data
  });
}

export function getList(filters) {
  return request({
    url: `/dept/list/`,
    method: "get",
    params: filters
  });
}
export function getOne(id) {
  return request({
    url: `/dept/one/${id}`,
    method: 'get'
  });
}

