import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/flight/airline/change/add',
    method: 'post',
    data
  });
}

export function saveOne(data) {
  return request({
    url: '/flight/airline/change/save',
    method: 'post',
    data
  });
}

export function removeOne(airline) {
  return request({
    url: `/flight/airline/change/remove/${airline}`,
    method: 'delete'
  });
}

export function getOne(flightId) {
  return request({
    url: `/flight/airline/change/get/${flightId}`,
    method: 'get'
  });
}

export function getList(args) {
  const {...params} = args
  return request({
    url: `/flight/airline/change/getList`,
    method: 'get',
    params
  });
}


