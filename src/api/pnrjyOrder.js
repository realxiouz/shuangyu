import request from "@/utils/request";

export function exportOrder(orderType, file) {
  debugger
  return request({
    url: "/pnrjy/order/export?orderType="+orderType,
    method: "post",
    file
  });
}

