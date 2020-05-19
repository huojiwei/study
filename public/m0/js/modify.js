$(function(){
    $("#confirmPass").on('tap',function(){
        var oldPassword = $('[name = "oldPassword"]').val();
        var newPassword = $('[name = "newPassword"]').val();
        var reNewPassword = $('[name = "reNewPassword"]').val();
        var vCode = $('[name = "vCode"]').val();
        if (!oldPassword){
            mui.toast("请输入原密码")
            return;
        } 
        if (!newPassword){
            mui.toast("请输入新密码");
            return;
        }
          if (newPassword != reNewPassword) {
            mui.toast("两次输入密码不一致");
            return;
          } 
        if (!vCode) {
          mui.toast("请输入认证码");
          return;
        } 
        $.ajax({
          url: "/user/updatePassword",
          type: "post",
          data: {
            oldPassword: oldPassword,
            newPassword: newPassword,
            vCode: vCode,
          },
          success: function(res){
              mui.toast("修改成功")
              setTimeout(function(){
                  location.href = "login.html"
              },2000)
            console.log(res);
          }
        });
    });
    $("#getvCode").on('tap',function(){
        $.ajax({
          url: "/user/vCodeForUpdatePassword",
          type: "get",
          success: function (res) {
            console.log(res.vCode);
          },
        });
    });
})