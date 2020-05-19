$(function(){
    //初始化区域滚动文件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //获取一级分类数据
    $.ajax({
      url: "/category/queryTopCategory",
      type: "get",
      success: function (response) {
        //模板引擎使用方法
        // console.log(response);
        //将数据和HTML作拼接
        //1、html模板id
        //2、数据
        //怎样拼接
        var html = template('category-first',{
            result : response.rows});
        $("#links").html(html);
        //如果一级分类有数据
        if(response.rows.length){
          //
          $('#links').find('a').eq(0).addClass('active');
          //获取第一个一级分类的
         var id = response.rows[0].id;
         //
        getSencondCategory(id);
        }
      },
    });
    //点击一级分类获取二级分类的数据
    /* 
        1、一级分类添加点击事件
        2、在事件处理函数中湖区到一级分类的ID
        3、调用二级分类的接口获取对应的数据
        4、将数据展示到对应的位置中
        5、如果接口中没有数据要在页面中显示暂无数据
    */
   $('#links').on('click','a',function(){
       //
      var id = $(this).attr('data-id');
      //
      $(this).addClass('active').siblings().removeClass('active');
        //
        getSencondCategory(id);
   })

});
function getSencondCategory(id){
  $.ajax({
    //接口
    url: "/category/querySecondCategory",
    //请求方式
    type: "get",
    //数据
    data: {
      id: id,
    },
    //成功
    success: function (response) {
      var html = template("category-second", response);
      $(".brand-list").html(html);
    },
  });
}
