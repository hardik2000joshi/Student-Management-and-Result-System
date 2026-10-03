
// Load Marks from Local Storage
let marks = JSON.parse(localStorage.getItem("marks")) || [];

// Display Results
displayResults();

function displayResults() {

    let table = document.getElementById("resultTable");

    table.innerHTML = "";

    marks.forEach((record) => {

        let total =
            Number(record.subject1) +
            Number(record.subject2) +
            Number(record.subject3) +
            Number(record.subject4) +
            Number(record.subject5);

        let percentage = total / 5;

        let grade = "";

        if (percentage >= 90) {

            grade = "A+";

        }

        else if (percentage >= 80) {

            grade = "A";

        }

        else if (percentage >= 70) {

            grade = "B";

        }

        else if (percentage >= 60) {

            grade = "C";

        }

        else if (percentage >= 50) {

            grade = "D";
        }

        else if(percentage >= 40){
            grade = "E";
        }

        else {

            grade = "F";

        }

        let result = percentage >= 40 ? "Pass" : "Fail";

        table.innerHTML += `

            <tr>

                <td>${record.rollNo}</td>

                <td>${record.name}</td>

                <td>${total}</td>

                <td>${percentage.toFixed(2)}%</td>

                <td>${grade}</td>

                <td>${result}</td>

            </tr>

        `;

    });

}