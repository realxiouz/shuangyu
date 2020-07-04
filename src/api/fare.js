import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/flight/fare/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  let { fareId, ...rest } = data
  return request({
    url: `/flight/fare/update/one/${fareId}`,
    method: 'put',
    data: rest
  });
}

export function removeOne(fareId) {
  return request({
    url: `/flight/fare/remove/one/${fareId}`,
    method: 'delete'
  });
}

export function getOne(fareId) {
  return request({
    url: `/flight/fare/one/${fareId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/flight/fare/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/flight/fare/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/flight/fare/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: {
      lastId,
      ...filter
    }
  });
}
