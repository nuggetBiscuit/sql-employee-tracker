const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');



const db = require('./db/connections');

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
    tracker();
    // test();
});

var tracker = function() {
inquirer.prompt({
    // Begin Command Line
    type: 'list',
    name: 'prompt',
    message: 'What would you like to do?',
    choices: ['View All Employees','View All Department', 'View All Roles','Add An Employee', 'Add Role','Add Department','Update An Employee Role', 'Leave']
})
.then((answers) => {
  if (answers.prompt === 'View All Employees'){
    db.query(`SELECT * FROM employee`, (err, result) =>{
      if(err) throw err;
      console.log("Viewing all the Employees:");
      console.table(result);
      tracker();
    });
  }
  else if(answers.prompt === 'View All Department'){
    db.query(`SELECT * FROM  department`, (err, result) =>{
      if(err) throw err;
      console.log("Viewing all the Departments:");
      console.table(result);
      tracker();
    });
  }
  else if(answers.prompt === 'View All Roles'){
    db.query(`SELECT * FROM  roles`, (err, result) =>{
      if(err) throw err;
      console.log("Viewing all the roles:");
      console.table(result);
      tracker();
    });
  }
  else if(answers.prompt === 'Add An Employee'){
    db.query(`SELECT * FROM  employee, roles`,  (err, result) =>{
      if(err) throw err;
      inquirer.prompt([
        {
          // first name
          type: 'input',
          name: 'firstName',
          message: 'Employee first name:',
          validate: firstNameIn => {
            if (firstNameIn){
              return true;
            }
            else{
              console.log('Write a first name please');
              return false;
            }
          }
        },
        {
        // last name
        type: 'input',
        name: 'surname',
        message: 'Write a surname',
        validate: surnameIn =>{
          if (surnameIn){
            return true;
          }
          else{
            console.log('Add a surname');
            return false;
          }
        }
        },
        {
          // Role
          type: 'list',
          name: 'role',
          message: 'Pick a role from list',
          choices: () =>{
            var array = [];
            for (var i = 0; i < result.length; i++) {
                array.push(result[i].title);
            }
            var newArray = [...new Set(array)];
            return newArray;
          }
          },
          {
            // Adding Employee Manager
            type: 'input',
            name: 'manager',
            message: 'Manager name:',
            validate: managerInput => {
                if (managerInput) {
                    return true;
                } else {
                    console.log('Add A Manager!');
                    return false;
                }
            }
          }
          // 
      ]).then((answers) => {
        // Comparing the result and storing it into the variable
        for (var i = 0; i < result.length; i++) {
            if (result[i].title === answers.role) {
                var role = result[i];
            }
        }

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.surname, role.id, answers.manager.id], (err, result) => {
            if (err) throw err;
            console.log(`Added ${answers.firstName} ${answers.surname} to the database.`)
            tracker();
        });
      })
    });
    
  }else if (answers.prompt === 'Add Role') {

    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;

        inquirer.prompt([
            {
                // Adding A Role
                type: 'input',
                name: 'role',
                message: 'Role:',
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log('Add A Role!');
                        return false;
                    }
                }
            },
            {
                // Adding the Salary
                type: 'input',
                name: 'salary',
                message: 'Salary:',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('Add A Salary!');
                        return false;
                    }
                }
            },
            {
                // Department
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: () => {
                    var array = [];
                    for (var i = 0; i < result.length; i++) {
                        array.push(result[i].name);
                    }
                    return array;
                }
            }
        ]).then((answers) => {
            // Comparing the result and storing it into the variable
            for (var i = 0; i < result.length; i++) {
                if (result[i].name === answers.department) {
                    var department = result[i];
                }
            }

            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                if (err) throw err;
                console.log(`Added ${answers.role} to the database.`)
                tracker();
            });
        })
    });
  
  }
  else if (answers.prompt === 'Update An Employee Role') {
    // Calling the database to acquire the roles and managers
    db.query(`SELECT * FROM employee, role`, (err, result) => {
        if (err) throw err;

        inquirer.prompt([
            {
                // Choose an Employee to Update
                type: 'list',
                name: 'employee',
                message: 'Which employees role do you want to update?',
                choices: () => {
                    var array = [];
                    for (var i = 0; i < result.length; i++) {
                        array.push(result[i].last_name);
                    }
                    var employeeArray = [...new Set(array)];
                    return employeeArray;
                }
            },
            {
                // Updating the New Role
                type: 'list',
                name: 'role',
                message: 'What is their new role?',
                choices: () => {
                    var array = [];
                    for (var i = 0; i < result.length; i++) {
                        array.push(result[i].title);
                    }
                    var newArray = [...new Set(array)];
                    return newArray;
                }
            }
        ]).then((answers) => {
            // Comparing the result and storing it into the variable
            for (var i = 0; i < result.length; i++) {
                if (result[i].last_name === answers.employee) {
                    var name = result[i];
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (result[i].title === answers.role) {
                    var role = result[i];
                }
            }

            db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                if (err) throw err;
                console.log(`Updated ${answers.employee} role to the database.`)
                tracker();
            });
        })
    });



} else if (answers.prompt === 'Log Out') {
    db.end();
    console.log("Good-Bye!");
}
})
};

