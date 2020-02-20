import request from '@/utils/request';


export function removeApp(id) {
  return request({
    url: `/admin/app/remove/one/${id}`,
    method: 'delete'
  });
}

export function updApp(data) {
  return request({
    url: '/admin/app/update/one',
    method: 'post',
    data
  });
}

export function getAppList(pageFlag, pageSize, lastId,data) {
  return request({
    url: `/admin/app/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getAppTotal(data) {
  return request({
    url: `/admin/app/total`,
    method: 'get',
    params: data
  });
}

export function saveOrUpd(data) {
  return request({
    url: '/admin/app/saveOrUpd/one',
    method: 'post',
    data
  });
}

