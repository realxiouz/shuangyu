import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/flight/airport/save',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/flight/airport/one/${id}`,
    method: 'get'
  });
}

export function getPageList(data) {
  return request({
    url: '/flight/airport/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/flight/airport/total',
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: '/flight/airport/remove/one/' + data,
    method: 'delete'
  });
}
