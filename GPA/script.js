let count = 1;

function addNode() {
    let curentCourse = document.getElementById('course-' + count);
    let newCourse = curentCourse.cloneNode(true);

    newCourse.id = 'course-' + (count + 1);
    newCourse.childNodes[1].textContent = 'Course ' + (count + 1);

    newCourse.childNodes[3].childNodes[3].value = '';
    newCourse.childNodes[3].childNodes[1].setAttribute('for', 'grade-' + (count + 1));
    newCourse.childNodes[3].childNodes[3].setAttribute('id', 'grade-' + (count + 1));
    newCourse.childNodes[3].childNodes[3].setAttribute('oninput', 'addNextNode(' + (count + 1) + ')');

    newCourse.childNodes[5].childNodes[3].value = '';
    newCourse.childNodes[5].childNodes[1].setAttribute('for', 'grade-' + (count + 1));
    newCourse.childNodes[5].childNodes[3].setAttribute('id', 'credit-' + (count + 1));
    newCourse.childNodes[5].childNodes[3].setAttribute('oninput', 'addNextNode(' + (count + 1) + ')');

    document.getElementById('course-' + count).after(newCourse);

    count++;
}

function addNextNode(courseNum) {
    if (!checkIfExists(courseNum)) {
        addNode()
    }
}

function checkIfExists(courseNum) {
    if (document.getElementById('course-' + (courseNum + 1)) == null) {
        return false;
    }
    return true;
}

function checkValue(symbol){
    if (symbol=='+'){
        return 0.3;
    }else if(symbol=='-'){
        return -0.3;
    }
    return 0;
}

function addError(message){
    if (document.getElementById('error').innerHTML==""){
        document.getElementById('error').innerHTML = "<a><em>Errors: </em></a>"
    }
    document.getElementById('error').innerHTML += "<li>" + message + "</li>";
}

function delError(){
    document.getElementById('error').innerHTML = "";
}

function calculateGPA() {
    delError();

    let sumGrades = 0;
    let sumCredits = 0;

    for (let counter = 0 ; checkIfExists(counter) ; counter++) {

        let currentGrade = 0;

        let currentCourse = document.getElementById('course-' + (counter + 1));
        let gradeString = currentCourse.childNodes[3].childNodes[3].value.replace(/\s/g, '');
        let credit = parseInt(currentCourse.childNodes[5].childNodes[3].value.replace(/\s/g, ''));

        let grade = gradeString.charAt(0);
        let symbol = gradeString.charAt(1);

        switch (grade) {
            case 'A': case 'a':
                currentGrade = 4;
                if(symbol=='-'){
                    currentGrade += checkValue(symbol);
                }
                break;
            case 'B': case 'b':
                currentGrade = 3;
                currentGrade += checkValue(symbol);
                break;
            case 'C': case 'c':
                currentGrade = 2;
                currentGrade += checkValue(symbol);
                break;
            case 'D': case 'd':
                currentGrade = 1;
                currentGrade += checkValue(symbol);
                break;
            case 'F': case 'f':
                currentGrade = 0;
                break;
            default:
                if (grade!=""){
                    addError("Wrong Grade for Course " + (counter+1) + " - Expected: <em>A, B, C, D</em> or <em>F</em>, and got: <em> " + gradeString +"</em>.");
                    currentCourse.childNodes[3].childNodes[3].value = "";
                }
                if ( !isNaN(credit) && !(0<credit && credit<5) ){
                    addError("Wrong Credit for Course " + (counter+1) + " - Expected: <em>1, 2, 3,</em> or <em>4</em>, and got: <em> " + credit +"</em>.");
                    currentCourse.childNodes[5].childNodes[3].value = "";
                }
                continue;
        }

        if ( 0<credit && credit<5 ){
            sumGrades += currentGrade * credit;
            sumCredits += credit;
        } else {
            if ( !isNaN(credit) ){
                addError("Wrong Credit for Course " + (counter+1) + " - Expected: <em>1, 2, 3,</em> or <em>4</em>, and got: <em> " + credit +" </em>.");
            }
            currentCourse.childNodes[5].childNodes[3].value = "";
        }
    }

    let GPA = sumGrades/sumCredits;
    if ( isNaN(GPA) ) {
        addError("GPA could not be calculated... :(");
    } else {
        document.getElementById('result').innerHTML = Math.round(GPA * 100) / 100;
    }
}