$(function(){
    $("#login-btn").on('click',function(){
        var username = $('[name = "username"]').val();
        var password = $('[name = "password"]').val();
        if(!username){
            mui.toast("请输入用户名");
            return;
        }
        if (!password) {
          mui.toast("请输入密码");
          return;
        }
        $.ajax({
          url: "/user/login",
          type: "post",
          data: {
              username: username,
              password: password
          },
          beforeSend:function(){
            $('#login-btn').html("正在登录...")
          },
          success: function(res){
            // console.log(res)
            mui.toast("登录成功");
            setTimeout(function(){
                location.href = "user.html"
            },2000)
          }
        });
    })
})