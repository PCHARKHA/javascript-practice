let students =[
    {ID:1,name:"Amit",marks:85},
    {ID:2,name:"Neha",marks:42},
    {ID:3,name:"Ravi",marks:67},
    {ID:4,name:"Priya",marks:95},
]
function displayStudents() {
        let tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = "";
    
        students.forEach((student) => {
            let tableRow = `
                <tr>
                    <td>${student.ID}</td>
                    <td>${student.name}</td>
                    <td>${student.marks}</td>
                </tr>
            `;
            tableBody.innerHTML += tableRow;
        });
    }

displayStudents();
function addStudent(){
    let nameip=document.getElementById("name").value;
    let marksip=Number(document.getElementById("marks").value);
    if (nameip === "" || marksip === "") {
        alert("Please fill all fields");
        return;
    }
    let newStudent={
        ID:students.length+1,
        name:nameip,
        marks:marksip
    }
    students.push(newStudent);
    document.getElementById("name").value = "";
    document.getElementById("marks").value = "";
    displayStudents();
}

function deleteStudent(){
    let idip=Number(document.getElementById("id").value);
    // using filter since filter returns a new array and does not modify the original array (non-destructive)
    // but it is stored in the same named array of students, so it will update the students array with the new filtered array
    students=students.filter((student)=>student.ID!==idip);
    displayStudents();
}

function searchStudent(){
    function searchStudent() {
        let nameInput = document.getElementById("searchName").value;
    
        let matchedStudents = students.filter((student) =>
            student.name.toLowerCase().includes(nameInput.toLowerCase())
        );
    
        let resultDiv = document.getElementById("searchResult");
        if (matchedStudents.length > 0) {
            let resultHTML = "";
    
            matchedStudents.forEach((student) => {
                resultHTML += `
                    <p>
                        ID: ${student.ID},
                        Name: ${student.name},
                        Marks: ${student.marks}
                    </p>
                `;
            });
    
            resultDiv.innerHTML = resultHTML;
        }
        else {
            resultDiv.innerHTML = "<p>Student not found in the records.</p>";
        }
    }
}

function showPassed(){
    let passedStudents = students.filter((student)=>student.marks>=50);
    let resultDiv=document.getElementById("passedResult");
    if (passedStudents.length>0){
        let resultHTML="";
        passedStudents.forEach((student)=>{
            resultHTML+=`
                <p>ID: ${student.ID}, Name: ${student.name}, Marks: ${student.marks}</p>
            `;
        });
        resultDiv.innerHTML=resultHTML;
    }
    else{
        resultDiv.innerHTML="<p>No students have passed.</p>";
    }
}

function sortMarksAsc(){
    students.sort((a,b)=>a.marks-b.marks);
    displayStudents();
}

function sortMarksDesc(){
    students.sort((a,b)=>b.marks-a.marks);
    displayStudents();
}

function showStatistics(){
    let totalStudents=students.length;
    let averageMarks=students.reduce((sum,student)=>sum+student.marks,0)/totalStudents;
    let highestMarks=Math.max(...students.map(student=>student.marks));
    let lowestMarks=Math.min(...students.map(student=>student.marks));

    let resultDiv=document.getElementById("statisticsResult");
    resultDiv.innerHTML=`
        <p>Total Students: ${totalStudents}</p>
        <p>Average Marks: ${averageMarks.toFixed(2)}</p>
        <p>Highest Marks: ${highestMarks}</p>
        <p>Lowest Marks: ${lowestMarks}</p>
    `;
}

function highlightToppers(){
    let maxMarks = students.filter(student=>student.marks >=90);
    let resultDiv=document.getElementById("toppersResult");
   
    if (maxMarks.length>0){
        let resultHTML="";
        maxMarks.forEach((student)=>{
            resultHTML+=`
                <p>ID: ${student.ID}, Name: ${student.name}, Marks: ${student.marks}</p>
            `;
        });
        resultDiv.innerHTML=resultHTML;
    }
    else{
        resultDiv.innerHTML="<p>No students found.</p>";
    }
}