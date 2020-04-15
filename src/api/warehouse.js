import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/finance/warehouse/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/finance/warehouse/update/one',
    method: 'post',
    data
  });
}

export function removeOne(code) {
  return request({
    url: `/finance/warehouse/remove/one/${code}`,
    method: 'delete'
  });
}

export function getOne(code) {
  return request({
    url: `/finance/warehouse/one/${code}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/finance/warehouse/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/finance/warehouse/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/finance/warehouse/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
