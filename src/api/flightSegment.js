import request from '@/utils/request';

export function saveFlightSegment(data) {
  return request({
    url: '/flight/flightSegment/save',
    method: 'post',
    data
  });
}

export function getFlightSegmentPageList(data) {
  return request({
    url: '/flight/flightSegment/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}
export function getFlightSegmentList(data) {
  return request({
    url: '/flight/flightSegment/list',
    method: 'get',
    params: data.searchForm
  });
}

export function getFlightSegmentTotal(params) {
  return request({
    url: '/flight/flightSegment/total',
    method: 'get',
    params
  });
}

export function removeFlightSegment(data) {
  return request({
    url: '/flight/flightSegment/remove/one/' + data,
    method: 'delete'
  });
}
