import request from '@/utils/request';


export function save(data) {
  return request({
    url: '/policy/product/save/inventory/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/policy/product/update/one/${id}`,
    method: "put",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/policy/product/remove/one/${id}`,
    method: 'delete'
  });
}


export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/policy/product/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/policy/product/list`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/policy/product/total`,
    method: 'get',
    params: params
  });
}


export function getOne(id) {
  return request({
    url: `/policy/product/one/${id}`,
    method: 'get'
  });
}
