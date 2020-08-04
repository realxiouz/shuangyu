import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/third/open/policy/attr/get/one/${params.openPolicyAttrId}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/third/open/policy/attr/save/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/third/open/policy/attr/get/list`,
    method: 'get',
    params
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/third/open/policy/attr/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(params) {
  return request({
    url: `/third/open/policy/attr/remove/one/${params.openPolicyAttrId}`,
    method: 'delete'
  });
}
