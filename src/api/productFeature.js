import request from '@/utils/request';


// 添加一条数据
export function saveOne(data) {
  return request({
    url: '/device/product/feature/save/one',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/device/product/feature/${id}`,
    method: 'get'
  });
}

// 获取列表
export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/device/product/feature/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

// 删除
export function removeOne(id) {
  return request({
    url: `/device/product/feature/remove/one/${id}`,
    method: 'delete'
  });
}

// 修改
export function updateOne(id, data) {
  return request({
    url: `/device/product/feature/update/one/${id}`,
    method: 'post',
    data
  });
}





