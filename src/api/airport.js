import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/flight/airport/save',
    method: 'post',
    data
  });
}

export function getOne(airportCode) {
  return request({
    url: `/flight/airport/one/${airportCode}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url: `/flight/airport/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: 'get',
    params: params.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/flight/airport/total',
    method: 'get',
    params
  });
}

export function removeOne(airportCode) {
  return request({
    url: `/flight/airport/remove/one/${airportCode}`,
    method: 'delete'
  });
}
