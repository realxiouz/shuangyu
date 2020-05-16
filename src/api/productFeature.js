import request from '@/utils/request';



// 添加一条数据
export function addOne(data) {
    return request({
        url: 'product/feature/add/one',
        method: 'post',
        data
    });
}


// 获取总条数
export function getTotal(data) {
    return request({
        url: "/product/feature/total",
        method: 'get',
        data
    })
}

// 获取列表
export function getList(data) {
    const { pageFlag, pageSize, lastId } = data
    const resetParam = lastId ? `?lastId=${lastId}` : ""
    return request({
        url: `product/feature/page/list/${pageFlag}/${pageSize}${resetParam}`,
        method: 'get'
    });
}
// 删除
export function delFeatureById(id) {
    return request({
        url: `product/feature/remove/one/${id}`,
        method: 'delete'
    });
}

// 修改
export function editFeatureById(data) {
    console.log(data)
    return request({
        url: `/product/feature/update/one/${data.featureId}`,
        method: 'post',
        data
    });
}





