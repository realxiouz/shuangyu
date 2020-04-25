import request from '@/utils/request';


export function addOne(data) {
  return request({
    url: `/firm/other/add/one`,
    method: `post`,
    data
  });
}

export function updateOne(data) {
  return request({
    url: `/firm/other/update/one`,
    method: `post`,
    data
  });
}

export function removeOne(otherId) {
  return request({
    url: `/firm/other/remove/one/${otherId}`,
    method: `delete`,
  });
}

export function getOne(otherId) {
  return request({
    url: `/firm/other/one/${otherId}`,
    method: `get`
  });
}

export function getList(filter) {
  return request({
    url: `/firm/other/list`,
    method: `get`,
    params: filter
  });
}


