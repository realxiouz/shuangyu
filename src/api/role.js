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
    url: "/admin/role/page/list/" +data.pageFlag+"/"+data.pageSize+"/"+data.lastId+"?"+data.map,
    method: "get"
  });
}

export function getTotal(data) {
  return request({
    url: "/admin/role/get/total",
    method: "get",
    data
  });
}

export function getNavs() {
  return request({
    url: "/admin/nav/get/all",
    method: "get"
  });
}

