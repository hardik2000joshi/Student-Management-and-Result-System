
// Load Data from Local Storage

let students = JSON.parse(localStorage.getItem("students")) || [];

let marks = JSON.parse(localStorage.getItem("marks")) || [];

let editRollNo = null;


// ===============================
// Load Roll Number Dropdown
// ===============================

let rollNo = document.getElementById("rollNo");

students.forEach((student) => {

    rollNo.innerHTML += `

        <option value="${student.rollNo}">

            ${student.rollNo} - ${student.name}

        </option>

    `;

});


// ===============================
// Display Student Name
// ===============================

rollNo.addEventListener("change", function () {

    let selectedRollNo = this.value;

    let student = students.find((student) => {

        return student.rollNo === selectedRollNo;

    });

    if (student) {

        document.getElementById("studentName").value = student.name;

    }

});


// ===============================
// Save Marks
// ===============================

document.getElementById("marksForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let rollNo = document.getElementById("rollNo").value;

    let name = document.getElementById("studentName").value;

    let subject1 = Number(document.getElementById("subject1").value);

    let subject2 = Number(document.getElementById("subject2").value);

    let subject3 = Number(document.getElementById("subject3").value);

    let subject4 = Number(document.getElementById("subject4").value);

    let subject5 = Number(document.getElementById("subject5").value);


    // Validation

    if (

        subject1 > 100 || subject2 > 100 ||

        subject3 > 100 || subject4 > 100 ||

        subject5 > 100 ||

        subject1 < 0 || subject2 < 0 ||

        subject3 < 0 || subject4 < 0 ||

        subject5 < 0

    ) {

        alert("Marks should be between 0 and 100.");

        return;

    }


    let markRecord = {

        rollNo,

        name,

        subject1,

        subject2,

        subject3,

        subject4,

        subject5

    };


    // Update Marks

    if (editRollNo !== null) {

        let index = marks.findIndex((record) => {

            return record.rollNo === editRollNo;

        });

        marks[index] = markRecord;

        editRollNo = null;

    }

    // Add Marks

    else {

        let exists = marks.some((record) => {

            return record.rollNo === rollNo;

        });

        if (exists) {

            alert("Marks already entered for this student.");

            return;

        }

        marks.push(markRecord);

    }


    localStorage.setItem("marks", JSON.stringify(marks));

    alert("Marks Saved Successfully.");

    document.getElementById("marksForm").reset();

    document.getElementById("studentName").value = "";

    displayMarks();

});


// ===============================
// Display Marks
// ===============================

function displayMarks() {

    let table = document.getElementById("marksTable");

    table.innerHTML = "";

    marks.forEach((record) => {

        table.innerHTML += `

            <tr>

                <td>${record.rollNo}</td>

                <td>${record.name}</td>

                <td>${record.subject1}</td>

                <td>${record.subject2}</td>

                <td>${record.subject3}</td>

                <td>${record.subject4}</td>

                <td>${record.subject5}</td>

                <td>

                    <button onclick="editMarks('${record.rollNo}')">

                        Edit

                    </button>

                    <button onclick="deleteMarks('${record.rollNo}')">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


// ===============================
// Edit Marks
// ===============================

function editMarks(rollNo) {

    let record = marks.find((record) => {

        return record.rollNo === rollNo;

    });

    document.getElementById("rollNo").value = record.rollNo;

    document.getElementById("studentName").value = record.name;

    document.getElementById("subject1").value = record.subject1;

    document.getElementById("subject2").value = record.subject2;

    document.getElementById("subject3").value = record.subject3;

    document.getElementById("subject4").value = record.subject4;

    document.getElementById("subject5").value = record.subject5;

    editRollNo = rollNo;

}


// ===============================
// Delete Marks
// ===============================

function deleteMarks(rollNo) {

    if (confirm("Delete this student's marks?")) {

        marks = marks.filter((record) => {

            return record.rollNo !== rollNo;

        });

        localStorage.setItem("marks", JSON.stringify(marks));

        displayMarks();

        alert("Marks Deleted Successfully.");

    }

}


// ===============================
// Initial Load
// ===============================

displayMarks();