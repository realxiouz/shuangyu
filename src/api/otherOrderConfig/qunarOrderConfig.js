import request from '@/utils/request';

// 查询原始单
export function getList(data) {
  return request({
    url: '/qunar/tts/order/get/list',
    method: 'get',
    params: data
  });
}

// 查询原始单
export function Export(data) {
  var myList = new Array();
  for (var key in data) {
    myList.push(key + "=" + data[key]);
  }
  var paramsStr = "?" + myList.join("&");
  //本地
  //window.location.href = 'http://39.108.230.74:18901/ota/prod-api/qunar/tts/order/export/TTS/order' + paramsStr;
  //服务器
  window.location.href = 'http://localhost:28030/dev-api/qunar/tts/order/export/TTS/order' + paramsStr;

}
// 查询原始单数量
export function getTotal(params) {
  return request({
    url: '/qunar/tts/order/get/total',
    method: 'get',
    params: params
  });
}

// 根据原始单号导单
export function exportOrderNo(sourceOrderNo) {
  return request({
    url: `/qunar/tts/order/fetch/lose/order?sourceOrderNo=${sourceOrderNo}`,
    method: 'post',
  });
}

// 根据lastId增量导单
export function exportLastId(data) {
  return request({
    url: `/qunar/tts/order/fetch/lose/orders?domain=${data.domain}&fromLastId=${data.fromLastId}&toLastId=${data.toLastId}`,
    method: 'post',
  });
}

// 根据文件导单
export function exportOrderFile(data) {
  return request({
    url: '/qunar/tts/order/fetch/lose/orders/file',
    method: 'post',
    data
  });
}

export function getOne(domain) {
  return request({
    url: `/qunar/tts/order/config/one/${domain}`,
    method: 'get'
  });
}

export function addOne(data) {
  return request({
    url: '/qunar/tts/order/config/add/one',
    method: 'post',
    data
  });
}

export function save(data) {
  return request({
    url: '/qunar/tts/order/config/save/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/qunar/tts/order/config/update/one',
    method: 'post',
    data
  });
}

