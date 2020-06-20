import request from '@/utils/request';

// 添加一条数据
export function saveOne(data) {
  return request({
    url: '/device/things/project/save/one',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/device/things/project/one/${id}`,
    method: 'get'
  });
}

// 获取总条数
export function getTotal() {
  return request({
    url: "/device/things/project/total",
    method: 'get',
  })
}

// 获取列表
export function getList(params) {
  return request({
    url: `/device/things/project/list`,
    method: 'get',
    params
  });
}

export function getFirmDataList(params) {
  return request({
    url: `/device/things/project/firm/data/list`,
    method: 'get',
    params
  });
}

// 获取列表
export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/device/things/project/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}


export function removeOne(id) {
  return request({
    url: `/device/things/project/remove/one/${id}`,
    method: 'delete'
  });
}





