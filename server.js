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
    choices: ['View All Employees','Add An Employee','Update An Employee Role','View All Roles','Add Role', 'View All Department','Add Department', 'Leave']
}]);

}
// var test = function(){
// inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'What is your name?'
//     },
//     {
//       type: 'list',
//       name: 'color',
//       message: 'What is your favorite color?',
//       choices: ['Red', 'Green', 'Blue']
//     }
//   ])
//   .then((answers) => {
//     console.log(`Hello ${answers.name}, your favorite color is ${answers.color}.`);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }