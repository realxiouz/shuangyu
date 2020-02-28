import request from '@/utils/request';

export function getFirmList(params) {
  return request({
    url: `/firm/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: `get`,
    params: params.filter
  });
}

export function add(data) {
  debugger;
  return request({
    url: `/firm/save`,
    method: `post`,
    data
  });
}

export function edit(data) {
  return request({
    url: `/firm/save`,
    method: `post`,
    data
  });
}

export function deleteOne(data) {
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

export function loadChildren(params) {
  return request({
    url: `/firm/get/children/list/${params}`,
    method: `get`
  });
}
