import request from '@/utils/request';


export function save(data) {
  return request({
    url: '/product/stock/keeping/save/one',
    method: 'post',
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/product/stock/keeping/remove/one/${id}`,
    method: 'delete'
  });
}


export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/product/stock/keeping/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/product/stock/keeping/list`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/product/stock/keeping/total`,
    method: 'get',
    params: params
  });
}


export function getOne(id) {
  return request({
    url: `/product/stock/keeping/one/${id}`,
    method: 'get'
  });
}
