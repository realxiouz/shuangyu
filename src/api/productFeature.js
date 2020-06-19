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


// 获取总条数
export function getTotal(data) {
    return request({
        url: "/device/product/feature/total",
        method: 'get',
        data
    })
}

// 获取列表
export function getList(data) {
    const { pageFlag, pageSize, lastId } = data
    const resetParam = lastId ? `?lastId=${lastId}` : ""
    return request({
        url: `/device/product/feature/page/list/${pageFlag}/${pageSize}${resetParam}`,
        method: 'get'
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
export function updateOne(data) {
    console.log(data)
    return request({
        url: `/device/product/feature/update/one/${data.featureId}`,
        method: 'post',
        data
    });
}





