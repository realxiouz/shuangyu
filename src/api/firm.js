import request from '@/utils/request';

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/firm/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: `get`,
    params: filter
  });
}

export function addOne(firm) {
  return request({
    url: `/firm/add/one`,
    method: `post`,
    firm
  });
}

export function updateOne(firm) {
  return request({
    url: `/firm/update/one`,
    method: `post`,
    firm
  });
}

export function removeOne(firmID) {
  return request({
    url: `/firm/remove/one/${firmID}`,
    method: `delete`,
  });
}

export function getTotal(filter) {
  return request({
    url: `/firm/get/total`,
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
