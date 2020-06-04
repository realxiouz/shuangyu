import request from '@/utils/request';

export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/warehouse/get/root/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getRootTotal(params) {
  return request({
    url: `/warehouse/get/root/total`,
    method: "get",
    params: params
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/warehouse/get/async/tree/list/${pid}`,
    method: `get`,
    params: filter
  });
}

export function addOne(data) {
  return request({
    url: '/warehouse/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/warehouse/update/one',
    method: 'post',
    data
  });
}

export function removeOne(warehouseCode) {
  return request({
    url: `/warehouse/remove/one/${warehouseCode}`,
    method: 'delete'
  });
}

export function getOne(warehouseCode) {
  return request({
    url: `/warehouse/one/${warehouseCode}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/warehouse/list`,
    method: 'get',
    params: filter
  });
}

export function getTreeList(filter) {
  return request({
    url: `/warehouse/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/warehouse/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/warehouse/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
