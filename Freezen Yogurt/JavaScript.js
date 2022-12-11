       // Tim kiem
function checkFormSearch(){
       var form_search = document.forms["form_search"];
       if (form_search.search_text.value.length>0){
              form_search.submit();
       }
}
function checkKey(event){
       if (event.keyCode==32){
              
              console.log("log");
              checkFormSearch();
       }
}

function showSearch(){
       var url=new URL(window.location);
       var word =url.searchParams.get("words");
       console.log(word)
       document.getElementById("searchDetail").innerHTML="<h1>Bạn vừa tìm kiếm</h1> <b> "+word+"</b>";
}
       // Kiem tra Email
// (Cách 1)
function frmValidate5(frm){ 
       return frm.checkValidity();
}
// (Cách 2)
function checkEmail(email){
       var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
       if (emailReg.test(email.value) == false) {
              alert("Vui lòng nhập đúng email");
              email.focus();
              return false;
       }
       return true;
}
function checkPassword(password){
       if(password.value.length< 8){
              alert("Vui lòng nhập đủ password");
              password.focus();
              return false;
       }
       return true;
}
function checkFormLogin(form){
       if(checkEmail(form.email)==false)
              return false;
       if(checkPassword(form.password)==false)
              return false;
       return true;    
}
function checkFormRegister(form) {
       if (checkEmail(form.email) == false)
              return false;
       if (checkPassword(form.password) == false)
              return false;
       if (checkPassword(form.repassword) == false)
              return false;
       if(form.password.value!=form.repassword.value){
              alert("Mật khẩu không đúng mời bạn nhập lại");
              form.repassword.focus();
              return false;
       }
       return true;
}
function checkFormHotline(form) {
       if (form.name.value.length < 4) {
              alert("Tên không được ít hơn 4 kí tự \nVui lòng nhập lại tên của bạn...");
              form.name.focus();
              return false;
       }
       function removeAscent(str) {
              if (str === null || str === undefined) return str;
              str = str.toLowerCase();
              str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
              str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
              str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
              str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
              str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
              str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
              str = str.replace(/đ/g, "d");
              return str;
       }
       var nameReg = /^[a-zA-Z ]{2,}$/g;
       if (nameReg.test(removeAscent(form.name.value)) == false) {
              alert("Tên không được chứa kí tự đặc biệt\nVui lòng nhập lại tên của bạn...");
              form.name.focus();
              return false;
       }
       var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
       if (checkEmail(form.email) == false)
              return false;
       if (form.massage.value.length< 10){
              alert("Vui lòng không nhập phần nội dung liên hệ ít hơn 10 kí tự");
              form.massage.focus();
              return false;
       }
       return true;
}
       // San pham va gio hang
var itemList ={
       "sp001": {
              "name": "Sữa Chua Vị Kiwi",
              "price": 21000,
              "photo": "images/sanpham/kiwi.jpg"
       },
       "sp002": {
              "name": "Sữa Chua Vị Xoài",
              "price": 22000,
              "photo": "images/sanpham/mango.jpg"
       },
       "sp003": {
              "name": "Sữa Chua Vị Dưa Lưới",
              "price": 23000,
              "photo": "images/sanpham/cantaloupe.jpg"
       },
       "sp004": {
              "name": "Sữa Chua Vị Mâm Xôi",
              "price": 24000,
              "photo": "imagimages/sanpham/blackberry.jpg"
       },
       "sp005": {
              "name": "Sữa Chua Vị Dâu Tây",
              "price": 25000,
              "photo": "images/sanpham/strawberry.jpg"
       },
       "sp006": {
              "name": "Sữa Chua Vị Việt Quốc",
              "price": 26000,
              "photo": "images/sanpham/blueberry.jpg"
       },
       "sp007": {
              "name": "Sữa Chua Vị Bưởi",
              "price": 27000,
              "photo": "images/sanpham/grapes.jpg"
       },
       "sp008": {
              "name": "Sữa Chua Vị Táo Xanh",
              "price": 28000,
              "photo": "images/sanpham/green-apple.jpg"
       },
       "sp009": {
              "name": "Sữa Chua Vị Dứa",
              "price": 29000,
              "photo": "images/sanpham/pineapple.jpg"
       }
}
 function addCart(code){
       var number = parseInt(document.getElementById(code).value);
       console.log(number);
       if (typeof localStorage[code] === 'undefined') {
              window.localStorage.setItem(code, number);
              alert("Bạn đã đặt hàng thành công");
       }
       else{
              if (window.localStorage.getItem(code) > 100 || number > 100) {
                     window.localStorage.setItem(code, 100);
                     alert("Bạn đã đạt giới số lượng sản phẩm và không thể đặt thêm\nMời bạn đặt sản phẩm khác");
              }
              else {
                     var current = parseInt(window.localStorage.getItem(code));
                     window.localStorage.setItem(code, current + number);
                     alert("Bạn đã đặt hàng thành công");


              }
              
       }
 }
 
 
function gotoCart() {
       window.location.href = "donhang.html";
}

function removeCart(code) {
       if (typeof window.localStorage[code] !== "undefined") {
              //xóa sản phẩm khỏi localStorage
              window.localStorage.removeItem(code);
              //Xóa nội dung của phần thân của bảng (<tbody>)
              document.getElementById("cartDetail")
              .getElementsByTagName('tbody')[0].innerHTML = "";
              //Hiển thị lại nội dung chi tiết của đơn hàng
              showCart();
       }
}
function getDiscountRate() {
       var d = new Date();
       var weekday = d.getDay();
       var totalMins = d.getHours() * 60 + d.getMinutes();
       if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660)|| (totalMins >= 780 && totalMins <= 1020)))
       return 0.1;
       return 0;
}
function showCart(){
       var formatter=new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'});
       var container=document.getElementById("cartDetail").getElementsByTagName("tbody")[0];
       container.innerHTML='';
       var sum=0;
       var TotalPrice=0;
       for(let i=0; i<window.localStorage.length; i++){
              if(typeof itemList[localStorage.key(i)]==='undefined')
              continue;
              var tr=document.createElement("tr");
              var photoItem=document.createElement("td");
              var nameItem=document.createElement("td");
              var numberItem=document.createElement("td");
              var priceItem=document.createElement("td");
              var sumItem=document.createElement("td");
              var deleteButton=document.createElement("td");
              
              // lấy mã sp
              var item=itemList[localStorage.key(i)];
              var code=window.localStorage.key(i);
              // console.log(code)
              // lấy số lượng sản phẩm
              var number=localStorage.getItem(localStorage.key(i));
              // tạo ảnh cho sp
              photoItem.style.textAlign="center";
              photoItem.innerHTML="<img src='"+item.photo+"'class='round-figure' width='100px'/>";
              // tạo tên sp
              nameItem.innerHTML=item.name;
              // tạo giá sp
              priceItem.innerHTML = formatter.format(item.price);
              priceItem.style.textAlign="center";
              // tạo số lượng sp
              numberItem.innerHTML=number;
              numberItem.style.textAlign = "center";
              // tạo giá tiền cho sản phẩm
              sum=number*item.price;
              sumItem.innerHTML = formatter.format(sum);
              sumItem.style.textAlign="center";
              
              // tạo nút xóa
              var button=document.createElement("button");
              button.innerHTML='Xóa';
              button.style.color="red";
              button.setAttribute("onclick", "removeCart('"+code+"')");
              // thêm nút button vào thẻ td
              deleteButton.appendChild(button);
              deleteButton.style.textAlign = "center";
              // thêm con vào bảng
              tr.appendChild(photoItem);
              tr.appendChild(nameItem);
              tr.appendChild(numberItem);
              tr.appendChild(priceItem);
              tr.appendChild(sumItem);
              tr.appendChild(deleteButton);
              // thêm dòng vào tbody
              container.appendChild(tr);
              TotalPrice+=sum;
       }
       var spanTotalPirce = document.getElementById('TotalPirce');
       spanTotalPirce.innerHTML=formatter.format(TotalPrice);
}
function showcart(){
       showCart();
}
window.onstorage = () => {
       showCart();
};