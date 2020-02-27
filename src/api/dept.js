import request from '@/utils/request';


export function save(data) {
  return request({
    url: '/dept/save',
    method: 'post',
    data
  });
}

export function removeOne(deptId) {
  return request({
    url: `/dept/remove/one/${deptId}`,
    method: 'delete'
  });
}

export function getPageList(pageFlag, pageSize, lastId, data){
  return request({
    url: `/dept/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getTotal(data) {
  return request({
    url: `/dept/get/total`,
    method: 'get',
    params: data
  });
}



