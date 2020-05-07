window.onscroll = function () { scrollRotate() };
function scrollRotate() {
    var navimg = document.getElementById("navimg");
    navimg.style.transform = "rotate(" + (window.pageYOffset / 4) + "deg)"
}