$(function(){

    /* 
        实现用户点击搜索按钮跳转到搜索页

            1、给搜索按钮添加点击事件
            2、获取用户输入的搜索关键字
            3、判断用户是否输入了搜索关键字
            4、如果用户么有输入阻止跳转
            5、输入了就跳转到页面并把关键字带到目标页面
    */
    $("#searchBtn").on('click',function(){
        var keyword = $(this).siblings('input').val();
        if (keyword){
            
            location.href = "search-result.html?Keyword=" + keyword;
            keyArr.push(keyword);
            localStorage.setItem("keyArr", JSON.stringify(keyArr));

        } else{
            alert("请输入要搜索的商品关键字");
        }
        
            
    });
    /* 
    
    
    
    */

   var keyArr = [];
    // console.log(JSON.parse(localStorage.getItem("keyArr")));
   if (localStorage.getItem('keyArr')) {
    keyArr = JSON.parse(localStorage.getItem("keyArr"));
    var html = template("search-Item", { result: keyArr });//id,第二个参数必须是对象
    $(".search-item").html(html);
    // console.log(keyArr);
   }

   $(".clear").on("click", function () {
       localStorage.clear();
    //    localStorage.remove("keyArr");
       $(".search-item").html("");
   });

   $(".search-item").on('tap',".search-record",function(){
        var id = this.getAttribute("data-id");
        $("#searchTxt").val(id);
       console.log(id)
   });
});