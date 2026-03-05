/*
1. Improved function for summing jump lengths.
Code smells fixed:
- Unnecessary variable
- Unclear naming
*/

function getTotalJumpLength(jumps: number[]): number {
  return jumps.reduce((total, jump) => total + jump, 0);
}

/*
2. Simplified student status logic.
Removed nested ternary and unnecessary mutation of object state.
*/

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  const passed = student.name === "Sebastian" && student.handedInOnTime;
  return passed ? "VG" : "IG";
}

/*
3. Improved variable names and structure.
Removed magic numbers and unclear variable naming.
*/

class Temperature {
  constructor(
    public city: string,
    public date: Date,
    public value: number
  ) {}
}

function averageWeeklyTemperature(records: Temperature[]): number {
  const ONE_WEEK = 604800000;

  let totalTemperature = 0;

  for (const record of records) {
    if (
      record.city === "Stockholm" &&
      record.date.getTime() > Date.now() - ONE_WEEK
    ) {
      totalTemperature += record.value;
    }
  }

  return totalTemperature / 7;
}

/*
4. Improved DOM structure and readability.
Separated DOM creation logic.
*/

function showProduct(
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
) {
  const container = document.createElement("div");

  const title = document.createElement("h4");
  title.textContent = name;

  const imageTag = document.createElement("img");
  imageTag.src = image;

  const priceTag = document.createElement("strong");
  priceTag.textContent = price.toString();

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(priceTag);

  parent.appendChild(container);
}

/*
5. Removed duplicated code and improved structure.
*/

function createStudentElement(student: Student): HTMLElement {
  const container = document.createElement("div");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = student.handedInOnTime;

  container.appendChild(checkbox);

  return container;
}

function presentStudents(students: Student[]) {
  const passedList = document.querySelector("ul#passedstudents");
  const failedList = document.querySelector("ul#failedstudents");

  for (const student of students) {
    const studentElement = createStudentElement(student);

    if (student.handedInOnTime) {
      passedList?.appendChild(studentElement);
    } else {
      failedList?.appendChild(studentElement);
    }
  }
}

/*
6. Improved string concatenation using array join.
*/

function concatenateStrings(): string {
  return ["Lorem", "ipsum", "dolor", "sit", "amet"].join(", ");
}

/*
7. Improved scalability using object instead of multiple parameters.
*/

interface User {
  name: string;
  birthday: Date;
  email: string;
  password: string;
}

function calculateAge(birthday: Date): number {
  const ageDiff = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function createUser(user: User) {
  const age = calculateAge(user.birthday);

  if (age < 20) {
    return "Du är under 20 år";
  }

  // Logic for creating a user
  console.log("User created:", user.name);
}