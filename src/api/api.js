import request from '@/utils/request';


export function removeApi(id) {
  return request({
    url: `/admin/api/remove/one/${id}`,
    method: 'delete'
  });
}

export function updApi(data) {
  return request({
    url: '/admin/api/update/one',
    method: 'post',
    data
  });
}

export function getApiList(pageFlag, pageSize, lastId, data){
  return request({
    url: `/admin/api/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getApiTotal(data) {
  return request({
    url: `/admin/api/total`,
    method: 'get',
    params: data
  });
}

export function saveOrUpd(data) {
  return request({
    url: '/admin/api/saveOrUpd/one',
    method: 'post',
    data
  });
}
