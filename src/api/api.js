import request from '@/utils/request';
import de from "element-ui/src/locale/lang/de";


export function removeOne(id) {
  return request({
    url: `/api/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/api/update/one',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/api/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/api/total`,
    method: 'get',
    params: params
  });
}

export function save(data) {
  return request({
    url: '/api/save',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/api/one/${id}`,
    method: 'get'
  });
}

export function getAll() {
  return request({
    url: `/api/all`,
    method: 'get'
  });
}

export function getMany(params) {
  return request({
    url: `/api/many`,
    method: 'post',
    params
  });
}
