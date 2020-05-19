$(function () {
  var num = 1;
  var id = getParamsUrl(location.href, "id");
  var size = 0;
  $.ajax({
    url: "/product/queryProductDetail",
    type: "get",
    data: {
      id: id,
    },
    success: function (res) {
      var html = template("detailTpl", res);
      $("#productInfo").html(html);
      //获得slider插件对象
      var gallery = mui(".mui-slider");
      gallery.slider({
        interval: 0, //自动轮播周期，若为0则不自动播放，默认为0；
      });
    },
  });
  $(".product-box").on("tap", ".num-l", function () {
    num = $("#num").val();
    num--;
    if (num <= 0) {
      num = 1;
    }
    $("#num").val(num);
  });
  $(".product-box").on("tap", ".num-r", function () {
    num = $("#num").val();
    num++;
    var kucun = Number($(".kucun").text());
    if (num >= kucun) {
      num = kucun;
    }
    $("#num").val(num);
  });
  $(".product-box").on("tap", ".prduct-size span", function () {
    $(this).addClass("active").siblings("span").removeClass("active");
    size = Number($(this).text());
  });
  $('#addCart').on('tap',function(){
      if(!size){
          alert('请选择尺码');
          return;
        }
        console.log(size)

    $.ajax({
      url: "/cart/addCart",
      type: "post",
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function(res){
          if(res.success){
              mui.toast('添加成功');
              setTimeout(function(){
                location.href = "cart.html";
              },2000)
          }
          console.log(res)
      }
    });
  })
});
