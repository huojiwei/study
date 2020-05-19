var keyword = getParamsUrl(location.href, "keyword");
var html = "";
var page = 1;
var picSort = 1;
var numSort = 1;
var This = null;
$(function () {
  /* 
    根据用户输入结果展示搜索结果
    */

  mui.init({
    pullRefresh: {
      container: refreshContainer, //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up: {
        height: 50, //可选.默认50.触发上拉加载拖动距离
        auto: true, //可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: "没有更多数据了", //可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: getData, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
    },
  });
    $("#picSort").on("tap", function () {
      picSort = picSort == 1 ? 2 : 1;
      html = "";
      page = 1;
      mui("#refreshContainer").pullRefresh().refresh(true); //重置上拉加载
      getData();
      console.log(picSort);
    });  
    $("#numSort").on("tap",function(){
        numSort = numSort == 1 ? 2 : 1;
        html = "";
        page = 1;
        mui("#refreshContainer").pullRefresh().refresh(true);//重置上拉加载
        getData();
        console.log(numSort)
    })
});
/* 获取地址栏中的参数
    1、地址字符串
    2、name要获取参数名
    3、return 参数名称对应的参数值
*/
/* function getParamsUrl(url, name) {
  var params = url.substr(url.indexOf("?") + 1);
  var param = params.split("&");
  for (let i = 0; i < param.length; i++) {
    const current = param[i].split("=");
    if (current[0] == name) {
      return current[1];
    }
  }
  return null;
} */
function getData() {
    if(!This){
        This = this;
    }
  $.ajax({
    url: "/product/queryProduct",
    type: "get",
    data: {
      page: page++,
      pageSize: 6,
      prName: keyword,
      price: picSort,
      num: numSort
    },
    success: function (response) {
      if (response.data.length > 0) {
        html += template("searchTpl", response);
        $("#resultList").html(html);
        This.endPullupToRefresh(false);
      } else {
        //上拉加载
        This.endPullupToRefresh(true);
      }
    }
  });
}
