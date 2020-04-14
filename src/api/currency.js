import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/finance/currency/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/finance/currency/update/one',
    method: 'post',
    data
  });
}

export function removeOne(code) {
  return request({
    url: `/finance/currency/remove/one/${code}`,
    method: 'delete'
  });
}

export function getOne(code) {
  return request({
    url: `/finance/currency/one/${code}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/finance/currency/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/finance/currency/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/finance/currency/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
