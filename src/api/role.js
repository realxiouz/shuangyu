import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/admin/role/add/one',
    method: 'post',
    data
  });
}

export function removeOne(data) {
  return request({
    url: '/admin/role/remove/one/'+data,
    method: 'delete'
  });
}


export function updateOne(data) {
  return request({
    url: '/admin/role/update/one',
    method: 'get',
    params: {data}
  });
}

export function getPageList(data) {
  return request({
    url: '/admin/role/page/list/'+data.currentPage+"/"+data.pageSize,
    method: 'get'
  });
}
