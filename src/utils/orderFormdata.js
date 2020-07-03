
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
//持续时长
export function formatDuration(data) {
  if (!data) {
    return "";
  } else {
    let days = parseInt(data/(1000 * 60 * 60 * 24));
    let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = parseInt((data % (1000 * 60)) / 1000);
    let str = "";
    if(days>0){
      str = days+"天"+hours + "时" + minutes + "分钟" + seconds + "秒";
      return str;
    }else if (hours > 0) {
      str = hours + "时" + minutes + "分钟" + seconds + "秒";
      return str;
    }else if (minutes > 0) {
      str = minutes + "分钟" + seconds + "秒";
      return str;
    } else {
      str = seconds + "秒";
      return str;
    }
  }
}

//格式化订单时限时间,出票任务：显示出票时限，退票和改签任务：显示创建时间+120分钟
export function formatTimeLimit(row) {
  if(row.taskType==1){
    if (!row.deadlineTicketTime || row.deadlineTicketTime.length == 0) {
      return '';
    }
    return this.initDate(row.deadlineTicketTime, "YYYY-MM-DD HH:mm:ss");
  }else if(row.taskType==2){
    if (!row.createTime || row.createTime.length == 0) {
      return '';
    }
    return this.$moment(new Date(row.createTime)).add(120,'minutes').format("YYYY-MM-DD HH:mm:ss");
  }else if(row.taskType==3){
    if (!row.createTime || row.createTime.length == 0) {
      return '';
    }
    return this.$moment(new Date(row.createTime)).add(120,'minutes').format("YYYY-MM-DD HH:mm:ss");
  }else{
    return ''
  }

}
//时限时间计算，出票任务：出票时限-当前时间，出票和改签任务：创建时间+120分钟-当前时间
export function formatDiffTimeLimit(row){
  if(row.taskType==1) {
    let deadLinTicketTime = new Date(row.deadlineTicketTime);
    let nowTime = new Date();
    let diffMs = this.$moment(deadLinTicketTime).diff(this.$moment(nowTime));
    let timeLimitStr = this.formatTimeLimitDuration(diffMs);
    return timeLimitStr;
  }else if(row.taskType==2){
    let createTime = new Date(row.createTime);
    let nowTime = new Date();
    let diffMs = this.$moment(createTime).add(120,'minutes').diff(this.$moment(nowTime));
    let timeLimitStr = this.formatTimeLimitDuration(diffMs);
    return timeLimitStr;
  }else if(row.taskType==3){
    let createTime = new Date(row.createTime);
    let nowTime = new Date();
    let diffMs = this.$moment(createTime).add(120,'minutes').diff(this.$moment(nowTime));
    let timeLimitStr = this.formatTimeLimitDuration(diffMs);
    return timeLimitStr;
  }
}
//时限是否显示风格
export function formattimeLimitStyle(row){
  let diffMs = 0;
  let nowTime = new Date();
  if(row.taskType==1) {
    let deadLinTicketTime = new Date(row.deadlineTicketTime);
    diffMs = this.$moment(deadLinTicketTime).diff(this.$moment(nowTime));
    if(diffMs>0 && diffMs<this.$moment.duration(60,'minutes')){
      return '#FF0000';
    }else if (diffMs>=this.$moment.duration(60,'minutes') && diffMs<this.$moment.duration(120,'minutes')){
      return '#FF5555';
    }else if(diffMs>=this.$moment.duration(120,'minutes') && diffMs<this.$moment.duration(240,'minutes')){
      return '#FF8888';
    }else if(diffMs>=this.$moment.duration(240,'minutes')){
      return '#99DD00';
    }else{
      return '#AAAAAA';
    }
  }else if(row.taskType==2){
    let createTime = new Date(row.createTime);
    diffMs = this.$moment(createTime).add(120,'minutes').diff(this.$moment(nowTime));
    if(diffMs>0 && diffMs<this.$moment.duration(30,'minutes')){
      return '#FF0000';
    }else if (diffMs>=this.$moment.duration(30,'minutes') && diffMs<this.$moment.duration(60,'minutes')){
      return '#FF5555';
    }else if(diffMs>=this.$moment.duration(60,'minutes') && diffMs<this.$moment.duration(90,'minutes')){
      return '#FF8888';
    }else if(diffMs>=this.$moment.duration(90,'minutes')){
      return '#99DD00';
    }else{
      return '#AAAAAA';
    }
  }else if(row.taskType==3){
    let createTime = new Date(row.createTime);
    diffMs = this.$moment(createTime).add(120,'minutes').diff(this.$moment(nowTime));
    if(diffMs>0 && diffMs<this.$moment.duration(30,'minutes')){
      return '#FF0000';
    }else if (diffMs>=this.$moment.duration(30,'minutes') && diffMs<this.$moment.duration(60,'minutes')){
      return '#FF5555';
    }else if(diffMs>=this.$moment.duration(60,'minutes') && diffMs<this.$moment.duration(90,'minutes')){
      return '#FF8888';
    }else if(diffMs>=this.$moment.duration(90,'minutes')){
      return '#99DD00';
    }else{
      return '#AAAAAA';
    }
  }
}
//时限时间计算
export function formatTimeLimitDuration(data) {
  if (!data) {
    return "";
  } else {
    let days = parseInt(data/(1000 * 60 * 60 * 24));
    let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = parseInt((data % (1000 * 60)) / 1000);
    let str = "";
    if(days>0){
      str = days+"天"+hours + "时";
      return str;
    }else if (hours > 0) {
      str = hours + "时" + minutes + "分钟";
      return str;
    }else if (minutes > 0) {
      str = minutes + "分钟";
      return str;
    } else {
      str = seconds + "秒";
      return str;
    }
  }
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
