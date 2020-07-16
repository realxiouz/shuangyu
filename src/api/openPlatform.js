import request from '@/utils/request';

export function getOne(id) {
  return request({
    url: `/third/open/platform/get/one/${id}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/third/open/platform/save/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/third/open/platform/get/list`,
    method: 'get',
    params
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/third/open/platform/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(id) {
  return request({
    url: `/third/open/platform/remove/one/${id}`,
    method: 'delete'
  });
}
