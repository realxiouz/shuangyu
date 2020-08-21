import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/member/get/list`,
    method: 'get',
    params: params
  });
}

export function getOne(params) {
  return request({
    url: `/member/get/one/${params.memberId}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/member/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(params) {
  return request({
    url: `/member/remove/one/${params.memberId}`,
    method: 'delete'
  });
}

export function saveOne(data) {
  return request({
    url: `/member/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/member/update/one/${data.memberId}`,
    method: 'put',
    data
  });
}
