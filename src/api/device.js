import request from '@/utils/request';

// 添加一条数据
export function addOne(data) {
  return request({
    url: 'device/add/one',
    method: 'post',
    data
  });
}

// 添加一条数据
export function addMany(data) {
  return request({
    url: 'device/add/many',
    method: 'post',
    data
  });
}

// 获取总条数
export function getTotal() {
  return request({
    url: "device/total",
    method: 'get',
  })
}

// 获取列表
export function getList(data) {
  const { pageFlag, pageSize, lastId } = data
  const resetParam = lastId ? `?lastId=${lastId}` : ""
  return request({
    url: `device/page/list/${pageFlag}/${pageSize}${resetParam}`,
    method: 'get'
  });
}
// 删除
export function deleteById(id) {
  return request({
    url: `device/remove/one/${id}`,
    method: 'delete'
  });
}
// 删除ids
// export function deleteByIds(params) {
//   return axios.get(`device/remove/many`, {
//     params: {
//       ids: params.ids
//     },
//     paramsSerializer: params => {
//       return qs.stringify(params, { indices: false })
//     }
//   })
// }
// 修改
export function editById(data) {
  return request({
    url: `device/update/one/${data.deviceId}`,
    method: 'post',
    data
  });
}





