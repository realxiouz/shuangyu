import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/qunar/bsp/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id,data) {
  return request({
    url: `/qunar/bsp/config/update/one/${configId}`,
    method: 'post',
    data
  });
}

export function removeOne(configId) {
  return request({
    url: `/qunar/bsp/config/remove/one/${configId}`,
    method: 'delete'
  });
}

export function getOne(filter) {
  return request({
    url: `/qunar/bsp/config/one`,
    method: 'get',
        params: filter
  });
}

export function getList(filter) {
  return request({
    url: `/qunar/bsp/config/list`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/qunar/bsp/config/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}
