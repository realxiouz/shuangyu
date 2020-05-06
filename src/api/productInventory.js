import request from '@/utils/request';


export function save(data) {
  return request({
    url: '/product/inventory/save/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: "/product/inventory/update/one",
    method: "post",
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/product/inventory/remove/one/${id}`,
    method: 'delete'
  });
}


export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/product/inventory/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/product/inventory/list`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/product/inventory/total`,
    method: 'get',
    params: params
  });
}


export function getOne(id) {
  return request({
    url: `/product/inventory/one/${id}`,
    method: 'get'
  });
}
