$(function(){
    var city = '';
    var isEdit = Number(getParamsUrl(location.href, "isEdit"));
    if (isEdit) {
      if(localStorage.getItem('editAddress')){
        var adress = JSON.parse(localStorage.getItem("editAddress"));
        var html = template("adressTpl", adress);
        $("#adressIfo").html(html);
      }
    }else{
      var html = template("adressTpl", {});
      $("#adressIfo").html(html);
    }
    $('#city').on('tap',function(){

        var picker = new mui.PopPicker({ layer: 3 });
        picker.setData(cityData); 
        picker.show(function (getSelectedItems) {
        city =
          getSelectedItems[0].text +
          getSelectedItems[1].text +
          getSelectedItems[2].text;
          $('#city').val(city);
        }); 
    });
         
    $("#addAdressBtn").on('tap',function(){
        var username = $('.username').val();
        var postCode = $(".zip").val();
        var detail = $(".ads-info").val();
      var data = {
        address: city,
        addressDetail: detail,
        recipients: username,
        postcode: postCode
      };
        if(isEdit){
         var url = "/address/updateAddress";
          data.id = adress.id;
        }else{
         var url = "/address/addAddress";
        }
        $.ajax({
          url: url,
          type: "post",
          data: data,
          success: function (res) {
              if (res.success) {
                if(isEdit){
                  mui.toast("修改成功");
                }else{
                  mui.toast('添加成功');
                }
                  setTimeout(function(){
                      location.href = 'adress.html'
                  },2000)
              }
          },
        });
    });
});
