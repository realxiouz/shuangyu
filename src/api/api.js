import request from '@/utils/request';


export function removeApi(id) {
  return request({
    url: `/api/remove/one/${id}`,
    method: 'delete'
  });
}

export function updApi(data) {
  return request({
    url: '/api/update/one',
    method: 'post',
    data
  });
}

export function getApiList(pageFlag, pageSize, lastId, data){
  return request({
    url: `/api/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getApiTotal(data) {
  return request({
    url: `/api/total`,
    method: 'get',
    params: data
  });
}

export function save(data) {
  return request({
    url: '/api/save/one',
    method: 'post',
    data
  });
}
