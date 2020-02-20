import request from "@/utils/request";

export function save(data) {
  return request({
    url: "/admin/role/save",
    method: "post",
    data
  });
}

export function removeOne(data) {
  return request({
    url: "/admin/role/remove/one/" + data,
    method: "delete"
  });
}


export function getPageList(data) {
  return request({
    url: "/admin/role/page/list/" + data.currentPage + "/" + data.pageSize,
    method: "get"
  });
}

export function getApis() {
  return request({
    url: "/admin/api/get/all",
    method: "get"
  });
}

export function getNavs() {
  return request({
    url: "/admin/nav/get/all",
    method: "get"
  });
}
