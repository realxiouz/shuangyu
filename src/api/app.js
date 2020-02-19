import request from '@/utils/request';


export function addApp(data) {
  return request({
    url: '/admin/app/add/one',
    method: 'post',
    data
  });
}

export function removeApp(id) {
  return request({
    url: `/admin/app/remove/one/${id}`,
    method: 'get'
  });
}

export function updApp(data) {
  return request({
    url: '/admin/app/update/one',
    method: 'post',
    data
  });
}

export function getAppList(pageNum, pageSize) {
  return request({
    url: `/admin/app/page/list/${pageNum}/${pageSize}`,
    method: 'get'
  });
}


