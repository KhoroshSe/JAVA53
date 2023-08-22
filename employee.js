import Person from "./person.js";
export default class Employee extends Person {
    constructor(id, firstName, lastName, age, salary) {
        super(firstName, lastName, age);
        this.salary = +salary;
        this.id = id;
    }

    setNewSalary (value) {
        if (value >= this.salary) {
            this.salary = +value;
        } else {
            alert("You aren't allowed to decrease salary");
        }
    }
}
