import request from '@/utils/request';


export function save(data) {
  return request({
    url: '/product/save/one',
    method: 'post',
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/product/remove/one/${id}`,
    method: 'delete'
  });
}


export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/product/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/product/list`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/product/total`,
    method: 'get',
    params: params
  });
}


export function getOne(id) {
  return request({
    url: `/product/one/${id}`,
    method: 'get'
  });
}
