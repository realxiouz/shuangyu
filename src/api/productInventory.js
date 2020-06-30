import request from '@/utils/request';


export function save(data) {
  return request({
    url: '/policy/product/inventory/save/one',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: '/policy/product/inventory/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/policy/product/inventory/update/one/${id}`,
    method: "put",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/policy/product/inventory/remove/one/${id}`,
    method: 'delete'
  });
}


export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/policy/product/inventory/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/policy/product/inventory/list`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/policy/product/inventory/total`,
    method: 'get',
    params: params
  });
}


export function getOne(id) {
  return request({
    url: `/policy/product/inventory/one/${id}`,
    method: 'get'
  });
}
