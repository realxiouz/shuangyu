import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/member/account/get/list`,
    method: 'get',
    params: params
  });
}

export function getOne(params) {
  return request({
    url: `/member/account/get/one/${params.accountId}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/member/account/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(params) {
  return request({
    url: `/member/account/remove/one/${params.accountId}`,
    method: 'delete'
  });
}

export function saveOne(data) {
  return request({
    url: `/member/account/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/member/account/update/one/${data.accountId}`,
    method: 'put',
    data
  });
}
