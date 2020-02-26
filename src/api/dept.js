import request from '@/utils/request';


export function removeDept(deptId) {
  return request({
    url: `/dept/remove/one/${deptId}`,
    method: 'delete'
  });
}

export function getDeptList(pageFlag, pageSize, lastId, data){
  return request({
    url: `/dept/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getDeptTotal(data) {
  return request({
    url: `/dept/get/total`,
    method: 'get',
    params: data
  });
}

export function deptSave(data) {
  return request({
    url: '/dept/save',
    method: 'post',
    data
  });
}

