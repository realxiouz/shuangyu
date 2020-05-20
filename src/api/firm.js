import request from '@/utils/request';

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/firm/page/list/${pageFlag}/${pageSize}`,
    method: `get`,
    params: filter
  });
}

export function addOne(data) {
  return request({
    url: `/firm/add/one`,
    method: `post`,
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/firm/update/one/${id}`,
    method: `post`,
    data
  });
}

export function removeOne(firmID) {
  return request({
    url: `/firm/remove/one/${firmID}`,
    method: `delete`
  });
}

export function getOne(firmId) {
  return request({
    url: `/firm/get/one/${firmId}`,
    method: `get`
  });
}

export function getTotal(filter) {
  return request({
    url: `/firm/get/total`,
    method: `get`,
    params: filter
  });
}

export function getTreeList(filter) {
  return request({
    url: `/firm/tree/list`,
    method: `get`,
    params: filter
  });
}

export function getList(filter) {
  return request({
    url: `/firm/list`,
    method: `get`,
    params: filter
  });
}
