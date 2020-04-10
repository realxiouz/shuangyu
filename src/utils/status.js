// 格式化订单状态

export function formateStatus(row) {
    if (row.status === 1) {
        return "下单成功";
    } else if (row.status === 2) {
        return "支付成功等待出票";
    } else if (row.status === 3) {
        return "出票中";
    } else if (row.status === 4) {
        return "出票完成";
    } else if (row.status === 5) {
        return "订单取消";
    } else if (row.status === 10) {
        return "未出票申请退款";
    } else if (row.status === 11) {
        return "退票申请中";
    } else if (row.status == 12) {
        return "退票完成等待退款";
    } else if (row.status == 13) {
        return "退款完成";
    } else if (row.status == 19) {
        return "退款驳回";
    } else if (row.status == 20) {
        return "退票申请中";
    } else if (row.status == 21) {
        return "改签完成";
    } else if (row.status == 29) {
        return "改签驳回";
    } else if (row.status == 40) {
        return "等待座位确认";
    } else if (row.status == 41) {
        return "订座成功等待价格确认";
    } else if (row.status == 50) {
        return "蜗牛订单号错误";
    }
}

// 格式化订单分类
export function formateCategory(row) {
    return row.category === 0 ? "销售单" : "采购单";
}

// 格式化订单类型
export function formateOrderType(row) {
    if (row.orderType === 10) {
        return "出票";
    } else if (row.orderType === 20) {
        return "退票";
    } else if (row.orderType === 21) {
        return "二次退票";
    } else if (row.orderType === 22) {
        return "退差";
    } else if (row.orderType === 23) {
        return "退改";
    } else if (row.orderType === 30) {
        return "改签";
    } else if (row.orderType === 31) {
        return "二次改签";
    } else {
        return row.orderType
    }
}

// 格式化航程类型

export function formateVoyageType(row) {
    if (row.voyageType === 0) {
        return "单程";
    } else if (row.voyageType === 1) {
        return "往返";
    } else if (row.voyageType === 2) {
        return "连程";
    } else {
        return ""
    }
}

// 格式化乘客类型

export function formatAgeType(row) {
    if (row.ageType === 0) {
        return "成人";
    } else if (row.ageType === 1) {
        return "儿童";
    } else {
        return "婴儿"
    }
}
