import request from '@/utils/request';


export function addApp(data) {
  return request({
    url: '/admin/app/add/one',
    method: 'post',
    data
  });
}

export function updApp(data) {
  return request({
    url: '/admin/app/update/one',
    method: 'post',
    data
  });
}
export function getAppList() {
  return request({
    url: '/admin/app/page/list',
    method: 'get'
  });
}
