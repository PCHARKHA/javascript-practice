let students = [
    { name: "Aman", marks: 45, age: 20 },
    { name: "Riya", marks: 85, age: 21 },
    { name: "Vikram", marks: 70, age: 22 }
  ];

// accessing
console.log(students[0].name); // Aman
console.log(students[1].marks); // 85

// updating
students[0].marks = 50; // updating marks for Aman
console.log(students[0].marks); // 50

// adding a new student
students.push({ name: "Sneha", marks: 90, age: 23 });
console.log(students);

//ForEach (Display Data)
students.forEach((student) => {
    console.log(`${student.name} scored ${student.marks} marks.`);
});

//filter (Get students with marks greater than 60)
let highScorers = students.filter((student) => student.marks > 60);
console.log(highScorers);

//map (Get an array of student names)
let studentNames = students.map((student) => student.name);
console.log(studentNames);

//reduce (Calculate total marks)
let totalMarks = students.reduce((total, student) => total + student.marks, 0);