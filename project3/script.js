window.onload = function () {

    if (typeof (Storage) !== "undefined") {
        if (!sessionStorage.getItem('splashShown') || sessionStorage.getItem('splashShown') === null) {
            document.querySelector('#splash').style.display = "grid";
            sessionStorage.setItem('splashShown', true);

            setTimeout(function () {
                document.querySelector('#splash').style.display = "none";
            }, 4000);

        } else {
            document.querySelector('#splash').style.display = "none";
        }
    } else {
        console.log("Your browser does not support web storage...");
    }
};