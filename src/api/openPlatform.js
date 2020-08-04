import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/third/open/platform/get/one/${params.openId}`,
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

export function removeOne(params) {
  return request({
    url: `/third/open/platform/remove/one/${params.openId}`,
    method: 'delete'
  });
}
