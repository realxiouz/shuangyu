import request from "@/utils/request";


export function save(data) {
  return request({
    url: "/dept/save",
    method: "post",
    data
  });
}

export function addOne(data) {
  return request({
    url: `/dept/add/one`,
    method: `post`,
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/dept/update/one/${id}`,
    method: 'put',
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/dept/remove/one/${id}`,
    method: "delete"
  });
}


export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/dept/get/root/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/dept/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/dept/get/async/tree/list/${pid}`,
    method: `get`,
    params: filter
  });
}

export function getTotal(params) {
  return request({
    url: `/dept/get/total`,
    method: "get",
    params: params
  });
}

export function getRootTotal(params) {
  return request({
    url: `/dept/get/root/total`,
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

export function getTreeList(params) {
  return request({
    url: `/dept/tree/list`,
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

