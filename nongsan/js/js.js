/*San Pham*/
var itemList={ "sp01":{"name":"Cây Táo","price":40000,"photo":"./anh/sanpham/tao.jpg"},
    "sp02":{"name":"Cây Quýt","price":20000,"photo":"./anh/sanpham/quyt.jpg"},
    "sp03":{"name":"Cây Nho","price":70000,"photo":"./anh/sanpham/nho.jpg"},
    "sp04":{"name":"Cây Lúa","price":25000,"photo":"./anh/sanpham/gao.jpg"},
    "sp05":{"name":"Cây Ngô","price":30000,"photo":"./anh/sanpham/ngô.jpg"},
    "sp06":{"name":"Các loại rau thơm","price":15000,"photo":"./anh/sanpham/rau_thom.jpg"},
};

//Thêm giỏ hàng
function addCart(barcode){
    var number = parseInt(document.getElementById(barcode).value);
    if(number == 0) alert('Số sản phẩm tối thiểu là 1!');
    else{
        if(typeof localStorage[barcode] === "undefined"){
            if(number > 100) alert('Chỉ được đặt mỗi loại tối đa 100 sản phẩm!');
            else{
                window.localStorage.setItem(barcode, number);
                alert(`Đã đưa ${number} sản phẩm ${itemList[barcode].name} vào giỏ hàng!`);
            }
        }
        else{
            var current = parseInt(window.localStorage.getItem(barcode));
            if(number+current > 100){
                window.localStorage.setItem(barcode, 100);
                alert('Chỉ được đặt mỗi loại tối đa 100 sản phẩm!');
                alert(`Đã đưa 100 sản phẩm ${itemList[barcode].name} vào giỏ hàng!`);
            }
            else{
                window.localStorage.setItem(barcode, current+number);
                alert(`Đã đưa ${number+current} sản phẩm ${itemList[barcode].name} vào giỏ hàng!`);
            }
        }
    }
}

window.onload = () => {
    showCart();
}


//Cập nhật giỏ hàng
function showCart(){
    var TotalPreTax = 0; //Tổng tiền trước thuế

    //Tạo biến định dạng đơn vị tiền
    formatMoney = new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'});

    //Reset lại bảng dữ liệu mỗi khi in bảng mới
    document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";

    //Lấy các key sản phẩm lưu trong storage
    for(let i=0; i<localStorage.length; i++){
        key = localStorage.key(i);
        item = itemList[key];
        photo = item.photo;
        nameItem = item.name;
        price = item.price;
        orderNumber = localStorage.getItem(key);

        //Tạo các cột giá trị
        var tr = document.createElement('tr');
        var cellImg = document.createElement('td'); tr.appendChild(cellImg);
        var cellName = document.createElement('td'); tr.appendChild(cellName);
        var cellNum = document.createElement('td'); tr.appendChild(cellNum);
        var cellPrice = document.createElement('td'); tr.appendChild(cellPrice);
        var cellTotal = document.createElement('td'); tr.appendChild(cellTotal);
        var cellDel = document.createElement('td'); tr.appendChild(cellDel);
        tr.setAttribute('id', `${key}`);

        TotalPreTax += orderNumber*price;

        //Chèn sản phẩm thêm vào
        document.getElementById("cartDetail").getElementsByTagName('tbody')[0].appendChild(tr);
        cellImg.innerHTML = "<img src='" + photo + "' class='round-figure' width='100px' />";
        cellName.innerHTML = nameItem;
        cellNum.innerHTML = orderNumber;
        cellPrice.innerHTML = formatMoney.format(price);
        cellTotal.innerHTML = formatMoney.format(orderNumber*price);
        cellDel.innerHTML = `<button onclick='removeCart("${key}");'<i class='fa fa-trash'></i></button>`;
    }
    document.getElementById('totalPreTax').innerHTML = formatMoney.format(TotalPreTax);

    //Tính khuyến mãi
    var discountRate = getDiscountRate();
    document.getElementById('discountRate').innerHTML = discountRate;
    var discount = discountRate*TotalPreTax;
    document.getElementById('discount').innerHTML = formatMoney.format(discount);

    //Xuất thuế
    var tax = 0.1*(TotalPreTax - discount)
    document.getElementById('tax').innerHTML = formatMoney.format(tax);

    //Tổng tiền
    var totalBill = TotalPreTax - discount + tax;
    document.getElementById('totalBill').innerHTML = formatMoney.format(totalBill);
}

//Xóa sản phẩm khỏi giỏ hàng
function removeCart(barcode){
    if(typeof window.localStorage[barcode] !== "undefined"){
        window.localStorage.removeItem(barcode);
        // document.getElementById("cartDetail").getElementsByTagName('tbody')[0].removeChild(document.getElementById(barcode));
        document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
        // window.location.reload();
        showCart();
    }
}

//Lấy mức khuyến mãi
function getDiscountRate(){
    var d = new Date();
    var weekday = d.getDay();
    var totalMins = d.getHours()*60 + d.getMinutes();

    //Lấy 3 ngày đầu tuần và trong thời gian 7h-11h và 13h-17h
    if(weekday>=1 && weekday<=3 && ((totalMins>=420 && totalMins<=660) || (totalMins>=780 && totalMins<=1020)))
        return 0.1;
    return 0;
}

//Tự động cập nhật số lượng đặt hàng
window.onstorage = () => {
    showCart();
}
//Xác nhận đặt hàng
function tobuy(){
    var TotalPreTax = 0;
    formatMoney = new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'});

    for(let i=0; i<localStorage.length; i++){
        key = localStorage.key(i);
        item = itemList[key];
        price = item.price;
        orderNumber = localStorage.getItem(key);
        TotalPreTax += orderNumber*price;
    }
    var discountRate = getDiscountRate();
    var discount = discountRate*TotalPreTax;
    var tax = 0.1*(TotalPreTax - discount);
    var totalBill = TotalPreTax - discount + tax;
    var TotalBill = formatMoney.format(totalBill);
    if(totalBill == 0) {
        alert('Giỏ hàng rỗng \nXin mời thêm sản phẩm!');
    }
    else
        alert(`Tổng đơn hàng là ${TotalBill} cho tất cả các sản phẩm trong giỏ hàng!`);
}
/*Tim kiem */
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

/*dang ky*/
function frmValidate() {
    var frm = document.forms['regfr'];
    var hoten = frm.hoten;
    var ns = frm.ns;
    var mail = frm.mail;
    var mk = frm.mk;
    var pre_mk = frm.pre_mk;

    var today = new Date();
    var t1 = new Date(ns.value);
    var ns1 = today.getFullYear() - t1.getFullYear();

    if (ns1 <= 18 || isNaN(ns1)) {
        alert("Ngày sinh không được rỗng và đủ 18 tuổi trở lên!");
        ns.focus();
        return false;
    }

    //mail đúng định dạng
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(mail.value)) {
        alert("Hãy nhập đúng định dạng Mail!");
        mail.focus();
        return false;
    }
    //kiểm tra độ mạnh mk
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (strongRegex.test(mk.value) == false) {
        alert("Mật khẩu phải có ký tự in HOA, thường, ký tự đặc biệt và số!");
        mk.focus();
        return false;
    }
    //Nhập lại Mật khẩu:
    //kiểm tra đúng với trường mật khẩu đã nhập trước đó
    if (mk.value != pre_mk.value) {
        alert("mật khẩu không trùng khớp vui lòng nhập lại mật khẩu");
        pre_mk.focus();
        return false;
    }
    alert("Đăng ký thành công!");
    return true;
}
// dang nhap

var account='{"nhanvien":[{"username":"admin","password":"Abc@1234"}]}';
var obj= JSON.parse(account);
function frmvalidate(){
    var frm = document.forms['login']
    var user = frm.user;
    var pw = frm.pw;

    if((user.value == obj.nhanvien[0].username) && (pw.value == obj.nhanvien[0].password))
        alert('Đăng nhập thành công');
    else
        alert('Sai username hoặc password');
}


//trang chu
let slideIndex = 0;
showSlides();

// nut tiep theo/ ve truoc
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000); // doi anh moi 4 giay
}


//lien he
function lienhe() {
    var frm = document.forms['lh'];
    var hoten = frm.hoten;
    var mail = frm.mail;

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(mail.value)) {
        alert("Hãy nhập đúng định dạng Mail!");
        mail.focus();
        return false;
    }
    alert('Thành Công');
    return true;
}