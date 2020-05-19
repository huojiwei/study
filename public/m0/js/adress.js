;$(function(){
    var adress = null;
    $.ajax({
      url: "/address/queryAddress",
      type: "get",
      success: function (res) {
        adress = res;
        var html = template("adressTpl", { result: res });
        $("#adsList").html(html);
      console.log(res);

      },
    });
    $("#adsList").on("tap",'.edit', function () {
        console.log(1)
        var id = this.getAttribute("data-id");
        for (let i = 0; i < adress.length; i++) {
            if(id == adress[i].id){
                localStorage.setItem("editAddress", JSON.stringify(adress[i]));
                break;
            }
        }
        location.href = "addAdress.html?isEdit=1"

    });
    $("#adsList").on("tap", '.del', function () {
        var id = this.getAttribute('data-id');
        var li = this.parentNode.parentNode;
      mui.confirm("确认要删除吗？", function (message) {
          if (message.index) {
              $.ajax({
                url: "/address/deleteAddress",
                type: 'post',
                data:  {
                    id: id
                },
                success: function(rel){
                    if(rel.success){
                        console.log(rel)
                        location.reload();
                    }
                }
              });
          }else{
              mui.swipeoutClose(li);
          }
      });
    });
});