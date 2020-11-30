window.onload = function () {
    window.scrollTo(0,0);

    if (typeof (Storage) !== "undefined") {
        if (!sessionStorage.getItem('splash-shown') || sessionStorage.getItem('splash-shown') == null) {
            document.querySelector('#splash').style.display = "grid";
            sessionStorage.setItem('splash-shown', true);

            setTimeout(function () {
                document.querySelector('#splash').style.display = "none";
                animate();
            }, 4000);

        } else {
            document.querySelector('#splash').style.display = "none";
            animate();
        }
    } else {
        console.log("Your browser does not support web storage...");
    }
};

function animate() {
    document.querySelector(".mobile.top").style.animation = "slideTop 1s ease-in-out 0s 1";
    document.querySelector(".mobile.bottom").style.animation = "slideBottom 1s ease-in-out 0s 1";
    document.querySelector(".desktop.left").style.animation = "slideLeft 1s ease-in-out 0s 1";
    document.querySelector(".desktop.right").style.animation = "slideRight 1s ease-in-out 0s 1";
    document.querySelector(".content").style.animation = "fadeIn 2s ease-in-out 0s 1";
}

