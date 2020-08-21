import axIos from 'axios';

// 导出excel公用方法
export function exportExcel(that, method, url, params, fileName) {
  axIos({
    method: method,
    url: process.env.VUE_APP_BASE_API + `${url}`,
    params: params,
    responseType: 'blob'
  })
    .then(result => {
      if (result && result.data) {
        let data = result.data;
        let reader = new FileReader();
        let blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        reader.readAsText(blob);
        reader.onload = function(event) {
          if (event && event.returnValue) {
            let str = reader.result;
            if (str.indexOf('code') !== -1) {
              let res = JSON.parse(str.toString());
              that.$message({ type: 'error', message: res.message + '！' });
            } else {
              let blob = new Blob([data], {
                type: 'application/vnd.ms-excel'
              });
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = URL.createObjectURL(blob);
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              that.$message({ type: 'success', message: '导出成功！' });
            }
          }
        };
      } else {
        that.$message({ type: 'warning', message: '未获取到服务端返回结果！' });
      }
    })
    .catch(error => {
      console.log(error);
    });
}
