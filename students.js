// Local Storage Array

let students = JSON.parse(localStorage.getItem("students")) || [];

let editRollNo = null;

// Load Students

displayStudents();

// Save Student

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let rollNo = document.getElementById("rollNo").value.trim();
  let name = document.getElementById("name").value.trim();
  let course = document.getElementById("course").value;
  let semester = document.getElementById("semester").value;
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();

   // Validation
    if (
        rollNo === "" ||
        name === "" ||
        course === "" ||
        semester === "" ||
        email === "" ||
        phone === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

     // Check duplicate Roll Number
    let exists = students.some((student) =>
        student.rollNo === rollNo
    );

    if (exists && editRollNo === null) {
        alert("Roll Number already exists.");
        return;
    }

  let student = {
    rollNo,
    name,
    course,
    semester,
    email,
    phone,
  };

   // Update Student
    if (editRollNo !== null) {
        let index = students.findIndex((student) => {
          student.rollNo === editRollNo
        });
    }

  // Add Student
    else {
        students.push(student);
    }

  localStorage.setItem("students", JSON.stringify(students));

  document.getElementById("studentForm").reset();

  displayStudents();
});

// Display Students

function displayStudents() {
  let table = document.getElementById("studentTable");

  table.innerHTML = "";

  students.forEach((student) => {
    table.innerHTML += `

        <tr>

            <td>${student.rollNo}</td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>${student.semester}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>

                <button onclick="editStudent('${student.rollNo}')">

                Edit

                </button>

                <button onclick="deleteStudent('${student.rollNo}')">

                Delete

                </button>

            </td>

        </tr>

        `;
  });
}

// Edit Student

function editStudent(rollNo) {
let student = students.find((student) => {
        return student.rollNo === rollNo;
    });

  document.getElementById("rollNo").value = student.rollNo;

  document.getElementById("name").value = student.name;

  document.getElementById("course").value = student.course;

  document.getElementById("semester").value = student.semester;

  document.getElementById("email").value = student.email;

  document.getElementById("phone").value = student.phone;

  editRollNo = rollNo;
}

// Delete Student

function deleteStudent(rollNo) {

    if (confirm("Are you sure you want to delete this student?")) {

        students = students.filter((student) => {
          return student.rollNo !== rollNo;
        });

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

        alert("Student deleted successfully.");
    }
}

// Search Student

document.getElementById("search").addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  let rows = document.querySelectorAll("#studentTable tr");

  rows.forEach((row) => {
    row.style.display = row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});
