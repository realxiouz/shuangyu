import axIos from 'axios';

// 导出公用方法
export function exportMethod(that, method, url, params, fileName) {
  axIos({
    method: method,
    url: `${url}`,
    params: params,
    responseType: 'blob'
  })
    .then(result => {
      let reader = new FileReader();
      let blob = new Blob([result.data], { type: 'application/vnd.ms-excel' });
      reader.readAsText(blob);
      reader.onload = function(event) {
        if (event && event.returnValue) {
          let str = reader.result;
          if (str.indexOf('code') !== -1) {
            let res = JSON.parse(str.toString());
            that.$message({ type: 'error', message: res.message + '！' });
          } else {
            let blob = new Blob([result.data], {
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
    })
    .catch(error => {
      console.log(error);
    });
}
