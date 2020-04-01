import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/finance/account/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/finance/account/update/one',
    method: 'post',
    data
  });
}

export function removeOne(fundAccountId) {
  return request({
    url: `/finance/account/remove/one/${fundAccountId}`,
    method: 'delete'
  });
}

export function getOne(fundAccountId) {
  return request({
    url: `/finance/account/one/${fundAccountId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/finance/account/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/finance/account/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/finance/account/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
