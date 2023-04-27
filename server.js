const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const dBase = require('./db/connection');

dBase.connect(err => {
    if(err) throw err;
    console.log('Database connected');

});
