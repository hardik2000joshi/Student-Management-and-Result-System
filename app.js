// Current Date

const today = new Date();

document.getElementById("currentDate").innerHTML =
today.toDateString();


// Load Students

let students =
JSON.parse(localStorage.getItem("students")) || [];


// Dashboard Cards

document.getElementById("totalStudents").innerHTML =
students.length;


// Recent Students Table

let table =
document.getElementById("studentTable");

table.innerHTML="";

students.slice(-5).reverse().forEach(student=>{

table.innerHTML+=`

<tr>

<td>${student.rollNo}</td>

<td>${student.name}</td>

<td>${student.course}</td>

<td>${student.semester}</td>

</tr>

`;

});


// Attendance Data

let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

let present =
attendance.filter(item=>item.status==="Present");

document.getElementById("presentStudents").innerHTML =
present.length;


// Marks Data

let marks =
JSON.parse(localStorage.getItem("marks")) || [];

let passed=0;

let totalPercentage=0;


marks.forEach((student)=>{

let total =
        Number(student.subject1) +
        Number(student.subject2) +
        Number(student.subject3) +
        Number(student.subject4) +
        Number(student.subject5);

        let percentage = total / 5;
totalPercentage += percentage;

 if(percentage >= 40){
 passed++;
}
});

document.getElementById("passedStudents").innerHTML =
passed;

if(marks.length>0){

document.getElementById("averageMarks").innerHTML =
(totalPercentage/marks.length).toFixed(2)+"%";

}
else{

document.getElementById("averageMarks").innerHTML="0%";

}