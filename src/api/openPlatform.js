import request from '@/utils/request';


export function removeOne(id) {
  return request({
    url: `/open/platform/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(id, data) {
  return request({
    url: `/open/platform/update/one/${id}`,
    method: 'put',
    data
  });
}

export function getList(params) {
  return request({
    url: `/open/platform/get/list`,
    method: 'get',
    params: params
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/open/platform/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getTotal(params) {
  return request({
    url: `/open/platform/get/total`,
    method: 'get',
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/open/platform/get/one/${id}`,
    method: 'get'
  });
}

export function addOne(data) {
  return request({
    url: "/open/platform/add/one",
    method: "post",
    data
  });
}
