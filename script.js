import Employee from "./employee.js";

const persons = [];
let ageArr = [];
let salaryArr = [];
const divStats = document.getElementById("stats");
const divList = document.getElementById("list");
const ageStats = document.createElement("p");
const salaryStats = document.createElement("p");
const orderedList = document.createElement('ol');
divList.append(orderedList);


addPerson.onclick = () => add();
calcStats.onclick = () => calculateStats();
hideStats.onclick = () => remove();
editSalary.onclick = () => changeSalary();
removeEmployee.onclick = () => deleteEmployee();

function add() {
    const id = document.getElementById("personId").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = document.getElementById("ageId").value;
    const salary = document.getElementById("salaryId").value;
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id === id) {
            personId.setAttribute('class', 'invalidInput');
            alert("A person with the specified ID is already exist");
            setTimeout(removeInvalidForm,  1000, personId);
            return;
        }
    }
    if (id !== '' && age >= 0 && salary >= 0) {
        const newEmployee = new Employee(id, firstName, lastName, age, salary);
        persons.push(newEmployee);
        printArray();
        if (divStats.contains(ageStats) || divStats.contains(salaryStats)) calculateStats();
    }  else {
        if (age < 0) {
            ageId.setAttribute('class', 'invalidInput');
            setTimeout(removeInvalidForm,  1000, ageId);
        }
        if  (salary < 0) {
            salaryId.setAttribute('class', 'invalidInput');
            setTimeout(removeInvalidForm,  1000, salaryId);
        }
        if  (id === '') {
            personId.setAttribute('class', 'invalidInput');
            setTimeout(removeInvalidForm,  1000, personId);
        }
    }
}
function printArray() {
    if (persons.length >= 0) {
        while (orderedList.firstChild) {
            orderedList.removeChild(orderedList.lastChild);
        }
    }
    for (let i = 0; i < persons.length; i++) {
        const listItem = document.createElement("li");
        orderedList.append(listItem);
        listItem.append((`Person ID: ${persons[i].id} Person name: ${persons[i].firstName} Person last name: ${persons[i].lastName} Person's age:
        ${persons[i].age} Salary: ${persons[i].salary}`));

}}
function calculateStats() {
    if (persons.length > 0) {
        if (persons.length > 0) {
            salaryArr = [];
            ageArr = [];
        }
        for (let i = 0; i < persons.length; i++) {
            ageArr.push(persons[i].age);
            salaryArr.push(persons[i].salary);
        }
        const averageAge = ageArr.reduce((accumulator, currentValue) => accumulator + currentValue) / ageArr.length;
        const averageSalary = salaryArr.reduce((accumulator, currentValue) => accumulator + currentValue) / salaryArr.length;

        let minValue = ageArr[0];
        let maxValue = ageArr[0];
        for (let i = 0; i < ageArr.length; i++) {
            if (ageArr[i] < minValue) minValue = ageArr[i];
            if (ageArr[i] > maxValue) maxValue = ageArr[i];
        }
        ageStats.textContent = `Average age = ${averageAge.toFixed(1)}  Minimum age = ${minValue}  Maximum age ${maxValue}`;
        minValue = salaryArr[0];
        maxValue = salaryArr[0];
        for (let i = 0; i < salaryArr.length; i++) {
            if (salaryArr[i] < minValue) minValue = salaryArr[i];
            if (salaryArr[i] > maxValue) maxValue = salaryArr[i];
        }
        salaryStats.textContent = `Average salary = ${averageSalary.toFixed(2)}  Minimum salary = ${minValue}  Maximum salary ${maxValue}`;
        while (!divStats.contains(ageStats) || !divStats.contains(salaryStats)) {
            divStats.append(ageStats);
            divStats.append(salaryStats);
        }
    } else emptyAlert();
}
function remove(){
    if (persons.length > 0) {
        ageStats.remove();
        salaryStats.remove();
    } else emptyAlert();
}
function changeSalary() {
    if (persons.length > 0) {
        const idInput = prompt("Enter ID:");
        const indexOfElement = (persons.map(object => object.id).indexOf(idInput));
        if (indexOfElement === -1) {
            alert("A person with the specified ID doesn't exist");
        } else {
            persons[indexOfElement].setNewSalary(prompt("Enter salary amount:"));
            persons.splice(indexOfElement, 1, persons[indexOfElement]);
        }
        printArray();
        if (divStats.contains(ageStats) || divStats.contains(salaryStats)) calculateStats();
    } else emptyAlert();
}
function deleteEmployee() {
    if (persons.length > 0) {
        const idInput = prompt("Enter ID:");
        const indexOfElement = (persons.map(object => object.id).indexOf(idInput));
        if (indexOfElement === -1) {
            alert("A person with the specified ID doesn't exist");
        } else {
            persons.splice(indexOfElement, 1);
        }
        printArray();
        if (divStats.contains(ageStats) || divStats.contains(salaryStats)) calculateStats();
    } else emptyAlert();
}
function emptyAlert(){
    alert("Please, add an employee first");
}
function removeInvalidForm(element){
    element.removeAttribute('class', 'invalidInput');
}
