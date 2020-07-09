import request from '@/utils/request';

// 添加一条数据
export function saveOne(data) {
  return request({
    url: '/device/save/one',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/device/one/${id}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/device/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}


export function removeOne(id) {
  return request({
    url: `/device/remove/one/${id}`,
    method: 'delete'
  });
}





