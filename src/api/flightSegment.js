import request from '@/utils/request';

export function saveSegment(data) {
  return request({
    url: '/flight/segment/save',
    method: 'post',
    data
  });
}

export function getSegmentPageList(data) {
  return request({
    url: '/flight/segment/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}
export function getSegmentList(data) {
  return request({
    url: '/flight/segment/list',
    method: 'get',
    params: data.searchForm
  });
}

export function getSegmentTotal(params) {
  return request({
    url: '/flight/segment/total',
    method: 'get',
    params
  });
}

export function removeSegment(data) {
  return request({
    url: '/flight/segment/remove/one/' + data,
    method: 'delete'
  });
}
