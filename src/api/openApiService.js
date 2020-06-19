import request from "@/utils/request";

//添加第三方Api
export function addApi(data) {
  return request({
    url: "/third/open/api/add/one",
    method: "post",
    data
  });
}


// 获取第三方api列表
export function getList(filter) {
  return request({
    url: "/third/open/api/list",
    method: "get",
    params: filter
  });
}

//获取分页列表
export function getPageList(pageFlag, pageSize, lastId, searchForm) {
  return request({
    url: `/third/open/api/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: "get",
    params: searchForm
  });
}


// 获取第三方api总数
export function getTotal() {
  return request({
    url: `/third/open/api/total`,
    method: "get"
  });
}


// 删除第三方API信息
export function removeOne(paramId) {
  return request({
    url: `/third/open/api/remove/one/${paramId}`,
    method: "delete"
  });
}

// 修改第三方API信息
export function updateOne(data) {
  return request({
    url: `/third/open/api/update/one`,
    method: "post",
    data
  });
}

// 获取第三方api信息
export function getOne(paramId) {
  return request({
    url: `/third/open/api/one/${paramId}`,
    method: `get`
  });
}
