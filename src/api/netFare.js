import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/flight/fare/net/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/flight/fare/net/update/one',
    method: 'post',
    data
  });
}

export function removeOne(flightCode) {
  return request({
    url: `/flight/fare/net/remove/one/${flightCode}`,
    method: 'delete'
  });
}

export function getOne(flightCode) {
  return request({
    url: `/flight/fare/net/one/${flightCode}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/flight/fare/net/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/flight/fare/net/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/flight/fare/net/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: {
      lastId,
      ...filter
    }
  });
}
