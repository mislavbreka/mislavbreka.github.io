
var text = document.getElementById("change")
var input = document.getElementById("input")

function keyPress(e) {
    if (e.keyCode == 13) {
        writeLine()
    }
    
}

function writeLine(){
    text.innerHTML=""
    var i = 0
    var clear = setInterval(function(){
        text.innerHTML = text.innerHTML + input.value.charAt(i);
        text.innerHTML = text.innerHTML.toUpperCase();
        if(i>input.value.length){
            clearInterval(clear)
            input.value=""
        }
        i++
        }, 50)
}