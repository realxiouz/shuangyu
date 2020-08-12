import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/firm/app/get/list`,
    method: 'get',
    params: params
  });
}

export function getOne(params) {
  return request({
    url: `/firm/app/get/one/${params.appId}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/app/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(params) {
  return request({
    url: `/firm/app/remove/one/${params.appId}`,
    method: 'delete'
  });
}

export function saveOne(data) {
  return request({
    url: `/firm/app/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/firm/app/update/one/${data.appId}`,
    method: 'put',
    data
  });
}
