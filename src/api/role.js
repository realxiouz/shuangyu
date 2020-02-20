import request from '@/utils/request';

export function addOrUpdateOne(data) {
  return request({
    url: '/admin/role/add/orUpdate/one',
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


export function getPageList(data) {
  return request({
    url: '/admin/role/page/list/'+data.currentPage+"/"+data.pageSize,
    method: 'get'
  });
}
