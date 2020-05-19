$(function () {
  $("#register").on("click", function () {
    var username = $("[name = 'username']").val();
    var mobile = $('[name = "mobile"]').val();
    var password = $('[name = "password"]').val();
    var againPassword = $('[name = "againPassword"]').val();
    var vCode = $('[name = "vCode"]').val();
    if (!username) {
      mui.toast("请输入用户名");
      return;
    }
    if (mobile.length < 11) {
      mui.toast("请输入合法手机号");
      return;
    }
    if (password != againPassword) {
      mui.toast("两次输入密码不一致");
      return;
    }
    if (!vCode) {
      mui.toast("请输入验证码");
      return;
    }
    $.ajax({
      url: "/user/register",
      type: "post",
      data: {
        username: username,
        password: password,
        mobile: mobile,
        vCode: vCode
      },
      success: function(data){
          mui.toast("注册成功");
          setTimeout(function(){
              location.href = "login.html"
          },2000)
      }
    });
  });

  $("#getvCode").on("click", function () {
    //获取验证码

    $.ajax({
      url: "/user/vCode",
      type: "get",

      success: function (res) {
        console.log(res.vCode);
      },
    });
  });
});
