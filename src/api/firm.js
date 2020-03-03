import request from '@/utils/request';

export function getPageList(params) {
  return request({
    url: `/firm/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: `get`,
    params: params.filter
  });
}

export function addOne(data) {
  debugger;
  return request({
    url: `/firm/save`,
    method: `post`,
    data
  });
}

export function updateOne(data) {
  return request({
    url: `/firm/save`,
    method: `post`,
    data
  });
}

export function removeOne(data) {
  return request({
    url: `/firm/remove/one/${data}`,
    method: `delete`,
  });
}

export function getTotal() {
  return request({
    url: `/firm/get/total`,
    method: `get`
  });
}

export function getList(params) {
  return request({
    url: `/firm/list`,
    method: `get`,
    params
  });
}
