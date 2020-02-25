import request from '@/utils/request';


export function removeOne(deptId) {
  return request({
    url: `/remove/one/${deptId}`,
    method: 'delete'
  });
}

export function getDeptList(pageFlag, pageSize, lastId, data){
  return request({
    url: `/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getDeptTotal(data) {
  return request({
    url: `/get/total`,
    method: 'get',
    params: data
  });
}

export function deptSave(data) {
  return request({
    url: '/save',
    method: 'post',
    data
  });
}

