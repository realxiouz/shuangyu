// 格式化订单状态
export function formatOrderType(row) {
  if (row.orderType === 1) {
    return "其他入库";
  } else if (row.orderType === 2) {
    return "其他出库";
  } else if (row.orderType === 100) {
    return "销售单";
  } else if (row.orderType === 101) {
    return "销售出库单";
  } else if (row.orderType === 102) {
    return "销售退款单";
  } else if (row.orderType === 103) {
    return "销售退票入库单";
  } else if (row.orderType === 104) {
    return "销售改签单";
  } else if (row.orderType == 105) {
    return "销售改签入库单";
  } else if (row.orderType == 106) {
    return "销售改签出库单";
  } else if (row.orderType == 200) {
    return "采购单";
  } else if (row.orderType == 201) {
    return "采购入库单";
  } else if (row.orderType == 202) {
    return "采购退款单";
  } else if (row.orderType == 203) {
    return "采购退票出库单";
  } else if (row.orderType == 204) {
    return "采购改签单";
  } else if (row.orderType == 205) {
    return "采购改签入库单";
  } else if (row.orderType == 206) {
    return "采购改签出库单";
  }
}

export function formatOrderStatus(row) {
  if (row.orderStatus === 0) {
    return "草稿";
  } else if (row.orderStatus === 1) {
    return "已完成";
  } else if (row.orderStatus === 2) {
    return "已确认";
  } else if (row.orderStatus === 3) {
    return "已作废";
  }
}

export function formatWarehouseStatus(row) {
  if (row.warehouseStatus === 0) {
    return "未入库";
  } else if (row.warehouseStatus === 1) {
    return "已入库";
  } else if (row.warehouseStatus === 2) {
    return "未出库";
  } else if (row.warehouseStatus === 3) {
    return "已出库";
  }
}

export function formatPaymentStatus(row) {
  if (row.paymentStatus === 0) {
    return "未付款";
  } else if (row.paymentStatus === 1) {
    return "已付款";
  }
}
