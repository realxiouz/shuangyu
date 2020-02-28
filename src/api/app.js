import request from '@/utils/request';


export function removeOne(id) {
  return request({
    url: `/app/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/app/update/one',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, lastId,data) {
  return request({
    url: `/app/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getTotal(data) {
  return request({
    url: `/app/total`,
    method: 'get',
    params: data
  });
}

export function save(data) {
  return request({
    url: '/app/save',
    method: 'post',
    data
  });
}

