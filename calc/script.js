var tag = document.getElementById("logo");
tag.classList.add("logo");
var tag = document.getElementById("showcase");
tag.classList.add("showcase");
var tag = document.getElementById("content");
tag.classList.add("content");

var toggle = 1;
function toggleRGBHEX(){
	console.log(toggle);
	if(toggle<3)toggle++;
	else toggle = 1;
	if(toggle===1){
		document.querySelector(".rgbshow").className='rgbshow';
		document.querySelector(".hexshow").className='hexshow hidetxt';
	}
	if(toggle===2){
		document.querySelector(".rgbshow").className='rgbshow hidetxt';
		document.querySelector(".hexshow").className='hexshow';
	}
	if(toggle===3){
		document.querySelector(".rgbshow").className='rgbshow';
		document.querySelector(".hexshow").className='hexshow';
	}
}

document.querySelector(".section").addEventListener('click', function () {
	toggleRGBHEX();
})

setInterval(changeRGB, 5);

const TypeWriter = function(txtElement, words, wait = 3000){
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function(){
	//current index
	const current = this.wordIndex % this.words.length;
	//get full text of current word
	const fullTxt = this.words[current];
	//check if deleting
	if(this.isDeleting){
		// Remove char, if previous char is ' ', then remove two
		if(fullTxt[this.txt.length-1]===' ')this.txt = fullTxt.substring(0, this.txt.length - 2);
		else this.txt = fullTxt.substring(0, this.txt.length - 1);
	}else{
		// Add char, if next char is ' ', then add two
		if(fullTxt[this.txt.length+1]===' ')this.txt = fullTxt.substring(0, this.txt.length + 2);
		else this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	//insert txt into element
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
	

	// Initial type speed
	let typeSpeed = 200;
	if(this.isDeleting){
		typeSpeed /= 3;
	}

	// If word is complete
	if(!this.isDeleting && this.txt === fullTxt){
		// make pause at end
		typeSpeed = this.wait;
		// set delete to true
		this.isDeleting = true;
	} else if(this.isDeleting && this.txt === ''){
		this.isDeleting = false;
		// Move to the next word
		this.wordIndex++;
		// Pause before start typing
		typeSpeed = 300;

	}

	setTimeout(() => this.type(), typeSpeed);
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init(){
	const txtElement = document.querySelector('.typewrite');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	new TypeWriter(txtElement, words, wait);
}

function smoothScroll(target, duration) {
	var target = document.querySelector(target);
	var targetPosition = target.getBoundingClientRect().top;
	var startPosition = window.pageYOffset;
	var distance = targetPosition - startPosition;
	var startTime = null;
	console.log(startPosition);

	function animation(currentTime) {
		if (startTime === null) startTime = currentTime;
		var timeElapsed = currentTime - startTime;
		var run = ease(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation)
	}

	function ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t * t * t + b;
		t -= 2;
		return -c / 2 * (t * t * t * t - 2) + b;
	};

	requestAnimationFrame(animation);
}

var scrollbtn = document.querySelector(".btnscroll");
scrollbtn.addEventListener('click', function () {
	smoothScroll(".description", 500);
})

/* COLORS */
var rgb = [255, 255, 255]
var sec1 = document.querySelector("#sec1");
var rgbshow = document.querySelector(".rgbshow");
var hexshow = document.querySelector(".hexshow");
var RGBcount = 0;
var RGBcurrent = 0;
var increase = false;
var RGBprevious;



function changeRGB() {
	function getRandomRGB(){
		RGBcurrent = Math.floor(Math.random() * 3);
	}
	if (RGBcount === 255){
		RGBcount = 0;
		RGBprevious = RGBcurrent;
		console.log(RGBcurrent);
	}
	if (rgb[RGBcurrent] === 255 && increase || rgb[RGBcurrent] === 0 && !increase) {
		while(RGBcurrent===RGBprevious){
			getRandomRGB();
		}
	}
	RGBcount += 1;
	if (rgb[RGBcurrent] === 0) increase = true;
	else if (rgb[RGBcurrent] === 255) increase = false;
	if (increase) rgb[RGBcurrent] += 1;
	else rgb[RGBcurrent] -= 1;
	if (rgb[0] === 0 && rgb[1] === 0 && rgb[2] < 255 || rgb[0] === 0 && rgb[1] < 255 && rgb[2] === 0 || rgb[0] < 255 && rgb[1] === 0 && rgb[2] === 0) {
		sec1.style.color = "rgba(255,255,255,0.8)";
	} else {
		sec1.style.color = "rgba(0,0,0,0.8)"
	}
	//console.log(rgb);
	sec1.style.backgroundColor = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
	rgbshow.innerHTML = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
	hexshow.innerHTML = returnHEX(rgb);
	scrollbtn.style.borderColor = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", 0.9)";
	FPSshow.innerHTML = Math.round(gameLoop()) + ' FPS';
}



function returnHEX(rgb){
	var HEXstring = [0,0,0];
	for(var i = 0; i<3; i++){
		HEXstring[i] = rgb[i].toString(16);
		if(HEXstring[i].length===1)HEXstring[i]='0'+HEXstring[i];
	}
	return 'HEX #'+HEXstring[0]+HEXstring[1]+HEXstring[2];
}

var lastLoop = new Date();
var FPSshow = document.querySelector(".fps");
function gameLoop() { 
    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    return fps;
}


function dropDown(x){
	console.log("#box"+x);
	var temp = document.querySelector("#box"+x);
	if(temp.className === 'box'){
		temp.className = 'box minify';
		document.querySelector("#txt"+x).className = 'displaytxt';
	}
	else
	{
		temp.className = 'box';
		document.querySelector("#txt"+x).className = 'hidetxt';
	} 
	for(var i = 1; i<=6; i++){
	if(x!=i){
		document.querySelector("#box"+i).className = 'box';
		document.querySelector("#txt"+i).className = 'hidetxt';
	}
}
}