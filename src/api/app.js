import request from '@/utils/request';


export function removeApp(id) {
  return request({
    url: `/app/remove/one/${id}`,
    method: 'delete'
  });
}

export function updApp(data) {
  return request({
    url: '/app/update/one',
    method: 'post',
    data
  });
}

export function getAppList(pageFlag, pageSize, lastId,data) {
  return request({
    url: `/app/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getAppTotal(data) {
  return request({
    url: `/app/total`,
    method: 'get',
    params: data
  });
}

export function saveOrUpd(data) {
  return request({
    url: '/app/save/one',
    method: 'post',
    data
  });
}

