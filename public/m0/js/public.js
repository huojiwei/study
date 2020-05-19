$(function(){
    $("body").on("tap", "a", function () {
      mui.openWindow({
        url: $(this).attr("href"),
      });
    });
})
/* 获取地址栏中的参数
    1、地址字符串
    2、name要获取参数名
    3、return 参数名称对应的参数值
*/
function getParamsUrl(url, name) {
  var params = url.substr(url.indexOf("?") + 1);
  var param = params.split("&");
  for (let i = 0; i < param.length; i++) {
    const current = param[i].split("=");
    if (current[0] == name) {
      return current[1];
    }
  }
  return null;
}
