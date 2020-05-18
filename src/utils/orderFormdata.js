
// 格式化订单 乘客 数据
export function formatPassengers(data) {
    if (!data || data.length == 0) {
        return "";
    }
    let str = "";
    data.forEach(item => {
        str += item.name + "<br/>";
    });
    return str;
}


// 格式化订单 票号 数据
export function formatTicketNo(ticketNo) {
    if (ticketNo && ticketNo.length > 0) {
        let str = "";
        ticketNo.forEach((item, index) => {
            if (item) {
                str += item + "<br/>";
            }
        });
        return str;
    } else {
        return (ticketNo = "");
    }
}

// 格式化订单 航班 数据
export function formatFlightDate(data) {
    if (!data || data.length == 0) {
        return "";
    }
    return this.initDate(data[0].flightDate, "YYYY-MM-DD");
}

// 格式化订单 航班号 数据
export function formatFlightNo(data) {
    if (!data || data.length == 0) {
        return "";
    }
    return data[0].flightCode;
}

// 格式化订单 航司 数据
export function formatAirlineCode(data) {
    if (!data || data.length == 0) {
        return "";
    }
    return data[0].airlineCode;
}

// 格式化订单 舱位 数据
export function formatCabin(data) {
    if (!data || data.length == 0) {
        return "";
    }
    return data[0].cabin;
}


// 格式化订单 航班 数据
export function formatFlight(data) {
    if (!data || data.length == 0) {
        return "";
    }
    return (
        data[0].dpt +
        " " +
        data[0].arr +
        "<br/>" +
        data[0].dptTime +
        " " +
        data[0].arrTime
    );
}
export function formatFlight2(data) {
    if (!data || data.length == 0) {
        return "";
    }
    return (
        data[0].dep +
        " " +
        data[0].arr +
        "<br/>" +
        data[0].depTime +
        " " +
        data[0].arrTime
    );
}

// 航班日期/航班号

export function formatFlighCode(data) {
    if (!data || data.length == 0) {
        return "";
    }
    return (
        data[0].depDay +
        "<br/>" +
        data[0].code
    );
}



// 格式化订单 金额 数据
export function formatAmount(amount) {
    if (amount) {
        return "￥" + this.$numeral(amount).format("0.00");
    } else {
        return amount
    }
}

// 处理去哪儿订单 总价 / 人数  数据
export function formatAmountAndPeople(data) {
    if (data.length < 0) {
        return ""
    } else {
        let amount = 0
        data.forEach(item => {
            amount += Number(item.price)
        })
        return "￥" + this.$numeral(amount).format("0.00") + ' / ' + data.length
    }
}
//格式化去哪儿订单状态
export function formatQunarStatus(row) {
    switch (row.status) {
        case "PAY_OK":
            return "支付成功等待出票";
            break;
        case "TICKET_LOCK":
            return "出票中";
            break;
        case "TICKET_OK":
            return "出票完成";
            break;
        case "CANCEL_OK":
            return "订单取消";
            break;
        case "APPLY_CHANGE":
            return "改签申请中";
            break;
        case "CHANGE_OK":
            return "改签完成";
            break;
        case "APPLY_4_RETURN_PAY":
            return "未出票申请退款";
            break;
        case "APPLY_REFUNDMENT":
            return "退票申请中";
            break;
        case "WAIT_REFUNDMENT":
            return "退票完成等待退款";
            break;
        case "REFUND_OK":
            return "退款完成";
            break;
        case "WAIT_CONFIRM":
            return "等待座位确认";
            break;
        case "ORDER_SUCCESS_WAIT_4_PRICE_CONFIRM":
            return "订座成功等待价格确认";
            break;
        case "BOOK_OK":
            return "订座成功等待支付";
        default:
            return "";
    }
}


export const qunarStatus = [
    {
        value: "PAY_OK",
        label: "支付成功等待出票"
    },
    {
        value: "TICKET_LOCK",
        label: "出票中"
    },
    {
        value: "TICKET_OK",
        label: "出票完成"
    },
    {
        value: "CANCEL_OK",
        label: "订单取消"
    },
    {
        value: "APPLY_CHANGE",
        label: "改签申请中"
    },

    {
        value: "CHANGE_OK",
        label: "改签完成"
    },
    {
        value: "APPLY_4_RETURN_PAY",
        label: "未出票申请退款"
    },
    {
        value: "APPLY_REFUNDMENT",
        label: "退票申请中"
    },
    {
        value: "WAIT_REFUNDMENT",
        label: "退票完成等待退款"
    },
    {
        value: "REFUND_OK",
        label: "退款完成"
    }, {
        value: "WAIT_CONFIRM",
        label: "等待座位确认"
    },
    {
        value: "ORDER_SUCCESS_WAIT_4_PRICE_CONFIRM",
        label: "订座成功等待价格确认"
    },
    {
        value: "BOOK_OK",
        label: "订座成功等待支付"
    },
]