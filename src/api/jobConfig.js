import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/job/config/one/${params.configId}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/job/config/save/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/job/config/list`,
    method: 'get',
    params
  });
}

export function getPageList(params) {
  return request({
    url: `/job/config/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: `/job/config/remove/one/${data.configId}`,
    method: 'delete'
  });
}
