const validateCode = (rule, value, callback) => {
    const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!regPhone.test(value)) {
        return callback(new Error("请输入格式正确的手机号！"));
    } else {
        return callback();
    }
};

export const rules = {
    deviceName: {
        required: true,
        message: "请输入设备名称",
        trigger: "blur"
    },
    deviceCode: {
        required: true,
        message: "请输入设备编码",
        trigger: "blur"
    },
    deviceKey: {
        required: true,
        message: "请输入设备Key",
        trigger: "blur"
    },
    accountId: {
        required: true,
        message: "请输入客户/供应商账号",
        trigger: "blur"
    },
    activateDate: {
        required: true,
        message: "请选择激活时间",
        trigger: "blur"
    },

    contactName: {
        required: true,
        message: "请输入联系人姓名",
        trigger: "blur"
    },
    contactPhone: [
        {
            required: true,
            message: "请输入联系人电话",
            trigger: "blur"
        },
        { validator: validateCode, trigger: "blur" }
    ],
    domain: {
        required: true,
        message: "请输入企业/单位域名",
        trigger: "blur"
    },
    firmId: { required: true, message: "请输入企业/单位", trigger: "blur" },
    firmName: {
        required: true,
        message: "请输入企业/单位名称",
        trigger: "blur"
    },
    lastOnlineTime: {
        required: true,
        message: "请输入最后上线时间",
        trigger: "blur"
    },
    merchantId: {
        required: true,
        message: "请输入商户(客户/供应商)id",
        trigger: "blur"
    },
    merchantName: {
        required: true,
        message: "请输入商户(客户/供应商)姓名",
        trigger: "blur"
    },
    otaVersion: {
        required: true,
        message: "请输入固件版本",
        trigger: "blur"
    },
    password: {
        required: true,
        message: "请输入连接密码",
        trigger: "blur"
    },
    productCode: {
        required: true,
        message: "请输入商品编码",
        trigger: "blur"
    },
    productId: { required: true, message: "请输入商品id", trigger: "blur" },
    productName: {
        required: true,
        message: "请输入商品名称",
        trigger: "blur"
    },
    projectId: { required: true, message: "请输入项目id", trigger: "blur" },
    projectName: {
        required: true,
        message: "请输入项目名称",
        trigger: "blur"
    },
    remark: { required: true, message: "请输入备注", trigger: "blur" },
    status: { required: true, message: "请选择当前状态", trigger: "blur" }
}

let getRand = ()=>{
    return Math.random().toFixed(3)
}
export const defaultDeviceForm = {
    deviceName: "设备-"+getRand(), //*	string //设备名称
    deviceCode: "code-"+getRand(), //*	string //设备编码
    deviceKey: "key-"+getRand(), //*	string //设备Key
    accountId: "account-"+getRand(), //*	string客户/供应商账号
    // activateDate: "12333", //*	integer($int64) //激活时间
    // addDate: "12333", //*	integer($int64) //添加时间
    contactId: "0001", //*	string //联系人ID
    contactName: "小明", //*	string //
    contactPhone: "15680717777", //*	string //联系人电话
    // deviceId: "12333", //*	string //设备Id
    domain: "https://www.code.com", //*	string //企业/单位域名
    firmId: "00021", //*	string //企业/单位
    firmName: "企业1", //*	string //企业/单位名称
    // ip: "12333", //*	string //IP地址
    // lastOnlineTime: "12333", //*	integer($int64) //最后上线时间
    merchantId: "商户id-"+getRand(), //*	string //商户(客户/供应商)
    merchantName: "1111", //*	string //商户(客户/供应商)名称
    otaVersion: "固-v."+getRand(), //*	string //固件版本
    password: "mima1111", //*	string //连接密码
    productCode: "p-"+getRand(), //*	string //商品编码
    productId: "pid-"+getRand(), //*	string //商品ID
    productName: "1111", //*	string //商品名称
    projectId: "proid-"+getRand(), //*	string //项目
    projectName: "proname"+getRand(), //*	string //项目名称
    remark: "这是一条备注", //	string //备注
    // sort: "12333", //	integer($int32) //排序号
    status: 1 //*	integer($int32) //当前状态
  }