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

function calculateGPA() {

    let sumGrades = 0;
    let sumCredits = 0;
    let currentGrade = 0;

    for (let counter = 0 ; checkIfExists(counter) ; counter++) {

        let currentCourse = document.getElementById('course-' + (counter + 1));
        let grade = currentCourse.childNodes[3].childNodes[3].value.replace(/\s/g, '').charAt(0);
        let credit = parseInt(currentCourse.childNodes[5].childNodes[3].value.replace(/\s/g, ''));

        switch (grade) {
            case 'A': case 'a':
                currentGrade = 4;
                break;
            case 'B': case 'b':
                currentGrade = 3;
                break;
            case 'C': case 'c':
                currentGrade = 2;
                break;
            case 'D': case 'd':
                currentGrade = 1;
                break;
            case 'F': case 'f':
                currentGrade = 0;
                break;
            default:
                currentCourse.childNodes[3].childNodes[3].value = "";
                break;
        }

        if ( 0<credit && credit<5 ){
            sumGrades += currentGrade * credit;
            sumCredits += credit;
        } else {
            currentCourse.childNodes[5].childNodes[3].value = "";
        }
    }

    let GPA = sumGrades/sumCredits;
    if ( isNaN(GPA) ) {
        document.getElementById('result').innerHTML = "<a class=\"error\">Error: please check Your input!</a>";
    } else {
        document.getElementById('result').innerHTML = Math.round(GPA * 100) / 100;
    }
}