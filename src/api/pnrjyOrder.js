import request from "@/utils/request";

export function exportOrder(data) {
  return request({
    url: "/pnrjy/order/export",
    method: "post",
    data
  });
}

