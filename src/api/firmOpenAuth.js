import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/firm/open/auth/get/one/${params.authId}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/firm/open/auth/save/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/firm/open/auth/get/list`,
    method: 'get',
    params
  });
}

export function getPageList(args) {
  const { pageFlag, pageSize, ...params } = args;
  return request({
    url: `/firm/open/auth/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(params) {
  return request({
    url: `/firm/open/auth/remove/one/${params.authId}`,
    method: 'delete'
  });
}
