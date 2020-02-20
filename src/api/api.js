import request from '@/utils/request';


export function addApi(data) {
  return request({
    url: '/admin/api/add/one',
    method: 'post',
    data
  });
}

export function removeApi(id) {
  return request({
    url: `/admin/api/remove/one/${id}`,
    method: 'get'
  });
}

export function updApi(data) {
  return request({
    url: '/admin/api/add/one',
    method: 'post',
    data
  });
}

export function getApiList(pageSize, lastId, data){
  return request({
    url: `/admin/api/page/list/${pageSize}/${lastId}`,
    method: 'get',
    params: {data}
  });
}

