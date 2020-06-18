import request from '@/utils/request';

export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/policy/warehouse/get/root/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getRootTotal(params) {
  return request({
    url: `/policy/warehouse/get/root/total`,
    method: "get",
    params: params
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/policy/warehouse/get/async/tree/list/${pid}`,
    method: `get`,
    params: filter
  });
}

export function addOne(data) {
  return request({
    url: '/policy/warehouse/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/policy/warehouse/update/one/${id}`,
    method: 'put',
    data
  });
}

export function removeOne(warehouseId) {
  return request({
    url: `/policy/warehouse/remove/one/${warehouseId}`,
    method: 'delete'
  });
}

export function getOne(warehouseCode) {
  return request({
    url: `/policy/warehouse/one/${warehouseCode}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/policy/warehouse/list`,
    method: 'get',
    params: filter
  });
}

export function getTreeList(filter) {
  return request({
    url: `/policy/warehouse/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/policy/warehouse/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/policy/warehouse/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
