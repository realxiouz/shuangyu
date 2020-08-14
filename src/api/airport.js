import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/flight/airport/add/one',
    method: 'post',
    data
  });
}

export function updateOne(airportCode,data) {
  return request({
    url: `/flight/airport/update/one/${airportCode}`,
    method: 'post',
    data
  });
}

export function removeOne(airportCode) {
  return request({
    url: `/flight/airport/remove/one/${airportCode}`,
    method: 'delete'
  });
}

export function getOne(airportCode) {
  return request({
    url: `/flight/airport/one/${airportCode}`,
    method: 'get'
  });
}

export function getOneByAirportName(airportName) {
  return request({
    url: `/flight/airport/one/name/${airportName}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/flight/airport/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/flight/airport/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/flight/airport/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}
