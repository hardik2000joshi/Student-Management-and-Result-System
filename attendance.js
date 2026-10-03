// Load Students

let students = JSON.parse(localStorage.getItem("students")) || [];

// Load Attendance

let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

// Roll Number Dropdown

let rollNo = document.getElementById("rollNo");

students.forEach((student) => {

    rollNo.innerHTML += `

    <option value="${student.rollNo}">

        ${student.rollNo}

    </option>

    `;

});

// Auto Fill Student Name

rollNo.addEventListener("change", function () {

    let selectedRollNo = this.value;

    let student = students.find((student) => {

        return student.rollNo === selectedRollNo;

    });

    if (student) {

        document.getElementById("studentName").value = student.name;

    }

});

// Save Attendance

document.getElementById("attendanceForm").addEventListener("submit", function (e) {

    e.preventDefault();

     let rollNo = document.getElementById("rollNo").value;

    let name = document.getElementById("studentName").value;

    let date = document.getElementById("attendanceDate").value;

    let status = document.getElementById("status").value;


    // Check if attendance already exists

    let exists = attendance.some((record) => {

        return record.rollNo === rollNo &&
               record.date === date;

    });


    if (exists) {

        alert("Attendance for this student on the selected date already exists.");

        return;

    }


    let attendanceRecord = {

        rollNo,

        name,

        date,

        status

    };

   

    attendance.push(attendanceRecord);

    localStorage.setItem("attendance", JSON.stringify(attendance));

    alert("Attendance Saved Successfully");

    document.getElementById("attendanceForm").reset();

    document.getElementById("studentName").value = "";

    displayAttendance();

});

// Display Attendance

function displayAttendance() {

    let table = document.getElementById("attendanceTable");

    table.innerHTML = "";

    attendance.forEach((record) => {

        table.innerHTML += `

        <tr>

            <td>${record.rollNo}</td>

            <td>${record.name}</td>

            <td>${record.date}</td>

            <td>${record.status}</td>

            <td>

                <button onclick="deleteAttendance('${record.rollNo}','${record.date}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// Delete Attendance

function deleteAttendance(rollNo, date) {

    if (confirm("Delete attendance record?")) {

        attendance = attendance.filter((record) => {

            return !(record.rollNo === rollNo && record.date === date);

        });

        localStorage.setItem("attendance", JSON.stringify(attendance));

        displayAttendance();

    }

}

// Initial Load

displayAttendance();