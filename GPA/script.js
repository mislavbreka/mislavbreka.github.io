let count = 1;

const addCourse = (num) => {
    if (courseExists(num + 1)) {
        return;
    }
    let oldCourse = getCourse(count).cloneNode(true);
    let newCourse = setCourseNum(oldCourse, ++count);
    appendCourse(count-1, newCourse)
}

const courseExists = (num) => {
    if (document.getElementById(`course-${num}`) == null) {
        return false;
    }
    return true;
}

const getCourse = (num) => {
    return document.getElementById(`course-${num}`);
}

const setCourseNum = (course, num) => {
    course.id = `course-${num}`;
    course.childNodes[1].textContent = `Course ${num}`;
    course.childNodes[3].childNodes[3].value = ``;
    course.childNodes[3].childNodes[1].setAttribute('for', `grade-${num}`);
    course.childNodes[3].childNodes[3].setAttribute('id', `grade-${num}`);
    course.childNodes[3].childNodes[3].setAttribute('oninput', `addCourse(${num})`);
    course.childNodes[5].childNodes[3].value = ``;
    course.childNodes[5].childNodes[1].setAttribute('for', `grade-${num}`);
    course.childNodes[5].childNodes[3].setAttribute('id', `credit-${num}`);
    course.childNodes[5].childNodes[3].setAttribute('oninput', `addCourse(${num})`);
    return course;
}

const appendCourse = (id, course) => {
    document.getElementById(`course-${id}`).after(course);
}

function calcGPA() {
    deleteErrors();
    let sumPoints = 0;
    let sumCredits = 0;

    for (let counter = 1; courseExists(counter + 1); counter++) {
        let currentPoints = 0;
        let currentCourse = getCourse(counter);

        currentCourse.childNodes[3].childNodes[3].value = currentCourse.childNodes[3].childNodes[3].value.toUpperCase();

        let gradeString = currentCourse.childNodes[3].childNodes[3].value.replace(/\s/g, '');
        let grade = gradeString.charAt(0);

        let creditString = currentCourse.childNodes[5].childNodes[3].value.replace(/\s/g, '');
        let credit = parseInt(creditString);

        let symbol = '';

        for (let i = 0; i<gradeString.length; i++) {
            if(gradeString.charAt(i)=='+'||gradeString.charAt(i)=='-'){
                symbol = gradeString.charAt(i);
                break;
            }
        }

        if ( isNaN(creditString) || ( 0 > credit || credit > 4)) {
            addError(`Wrong Credit for <em>Course ${counter}</em> - Expected: <em>1 2 3</em> or <em>4</em> , and got: <em>${creditString}</em>.`);
            currentCourse.childNodes[5].childNodes[3].value = "";
        } else if (creditString == "") {
            addError(`Credit for <em>Course ${counter}</em> is empty - Expected: <em>1 2 3</em> or <em>4</em>.`);
        }

        if (gradeString.replace('+', '').replace('-', '').length>1 && getSpecialPoints(symbol)!=0){
            currentCourse.childNodes[3].childNodes[3].value = `${grade}${symbol}`;
        }else if (gradeString.replace('+', '').replace('-', '').length>1) {
            currentCourse.childNodes[3].childNodes[3].value = `${grade}`;
        }

        let points = gradeToPoints(grade);

        if (points!=-1){
            currentPoints += points;
        }else if (grade != ""){
            addError(`Wrong Grade for <em>Course ${counter}</em> - Expected: <em>A B C D</em> or <em>F</em> , and got: <em> ${gradeString}</em>.`);
            currentCourse.childNodes[3].childNodes[3].value = "";
        } else {
            addError(`Grade for <em>Course ${counter}</em> is empty - Expected: <em>A B C D</em> or <em>F</em>.`);
        }

        if (grade != "A" && grade != 'F') {
            currentPoints += getSpecialPoints(symbol);
        } else if (grade == 'A' && symbol == '-') {
            currentPoints += getSpecialPoints(symbol);
        }

        if ((0 <= credit && credit <= 4) && points != -1) {
            sumPoints += currentPoints * credit;
            sumCredits += credit;
        }
    }

    let GPA = Math.round(sumPoints / sumCredits * 1000) / 1000;

    if (!isNaN(GPA)) {
        document.getElementById('result').innerHTML = GPA;
    } else {
        document.getElementById('result').innerHTML = "0.00";
    }
}

let gradeToPoints = (grade) => {
    switch (grade) {
        case 'A':
            return 4;
        case 'B':
            return 3;
        case 'C':
            return 2;
        case 'D':
            return 1;
        case 'F':
            return 0;
        default:
            return -1;
    }
}

const getSpecialPoints = (symbol) => {
    if (symbol == '+') {
        return 0.3;
    } else if (symbol == '-') {
        return -0.3;
    }
    return 0;
}

function addError(message) {
    if (checkErrors()) {
        document.getElementById('error').innerHTML = `<a><em>Errors: </em></a>`;
    }
    document.getElementById('error').innerHTML += `<li>${message}</li>`;
}

function deleteErrors() {
    document.getElementById('error').innerHTML = ``;
}

function checkErrors() {
    if (document.getElementById('error').innerHTML == ``) {
        return true;
    }
    return false;
}