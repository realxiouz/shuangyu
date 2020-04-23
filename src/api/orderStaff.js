import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/order/staff/save',
    method: 'post',
    data
  });
}

export function getOne(staffId) {
  return request({
    url: `/order/staff/one/${staffId}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url:  `/order/staff/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: 'get',
    params: params.searchForm
  });
}

export function setMonitor(staffId) {
  return request({
    url:  `/order/staff/set/monitor/${staffId}`,
    method: 'get',
  });
}

export function getList(params) {
  return request({
    url: '/order/staff/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getOnlineList(params) {
  return request({
    url: '/order/staff/online/list',
    method: 'get',
    params: params.searchForm
  });
}

export function staffOnline(params) {
  return request({
    url: '/order/staff/online',
    method: 'get',
    params: params
  });
}

export function updateStaffOnline(params) {
  return request({
    url: '/order/staff/update/online',
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: '/order/staff/total',
    method: 'get',
    params:params
  });
}

export function removeOne(staffId) {
  return request({
    url: `/order/staff/remove/one/${staffId}`,
    method: 'delete'
  });
}
