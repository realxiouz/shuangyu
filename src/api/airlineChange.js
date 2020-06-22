import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/airline/change/add',
    method: 'post',
    data
  });
}

export function saveOne(data) {
  return request({
    url: '/airline/change/save',
    method: 'post',
    data
  });
}

export function removeOne(airline) {
  return request({
    url: `/airline/change/remove/${airline}`,
    method: 'delete'
  });
}

export function getOne(flightId) {
  return request({
    url: `/airline/change/get/${flightId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/airline/change/getList`,
    method: 'get',
    params: filter
  });
}


