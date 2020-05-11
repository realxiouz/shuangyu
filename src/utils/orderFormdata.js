
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

// 格式化订单 金额 数据
export function formatAmount(amount) {
    if (amount) {
        return "￥" + this.$numeral(amount).format("0.00");
    } else {
        return amount
    }
}