import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/job/tag/one/${params.tagId}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/job/tag/save/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/job/tag/list`,
    method: 'get',
    params
  });
}

export function getPageList(params) {
  return request({
    url: `/job/tag/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: `/job/tag/remove/one/${data.tagId}`,
    method: 'delete'
  });
}
