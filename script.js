function getSize() {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return [myWidth, myHeight];
}

function getLimit() {
    let webpageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    let browserHeight = getSize()[1];
    return webpageHeight - browserHeight;
}

function calcPercentage() {
    let percentage = parseInt(window.scrollY / getLimit() * 100);
    return percentage;
}

document.onscroll = function () {
    document.querySelector("#loader").firstElementChild.style.width = `${calcPercentage()}%`;
    console.log(getPosition() + "%");
}

function getPosition() {
    let sectionsHeight = getSectionsHeight();
    let browserHeight = getSize()[1];
    let scrollPosition = window.scrollY;
    let section = getSection(scrollPosition, sectionsHeight);
    let percentageOfSection = parseInt(((scrollPosition - (browserHeight * section)) / browserHeight) * 100);
    console.log(section);
    let sectionName = getSectionName(section);
    setSectionLabel(sectionName);
    return percentageOfSection;
}

function getSectionName(num) {
    switch (num) {
        case 0:
            return "introduction";
        case 1:
            return "education";
        case 2:
            return "experience";
        case 3:
            return "contact";
        default:
            return "oops"
    }
}

function setSectionLabel(name){
    document.querySelector("#label").innerHTML = name;
}

function getSectionsHeight(){
    let sections = document.querySelectorAll("section");
    let heights = [];

    sections.forEach(function(item, _) {
        heights.push(item.clientHeight)
    });

    return heights;
}

function getSection(position, sectionsHeight){
    let section = 0;
    let sectionToTop = sectionsHeight[0];
    while (true) {
        if(sectionToTop >= position) {
            return section;
        }
        if (section>sectionsHeight.length) {
            return -1;
        }
        sectionToTop += sectionsHeight[section+1];
        section++;
    }
}


particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 120,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#016ee9"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#016ee9"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#016ee9",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 12,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

$('.js-tilt').tilt({
    maxTilt:        20,
    perspective:    2000,   // Transform perspective, the lower the more extreme the tilt gets.
    easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
})