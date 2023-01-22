// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = generateMarkdown.getQuestions();

inquirer.registerPrompt('recursive', require('inquirer-recursive'));

// Create a function to write README file
function writeToFile(fileName, data) {}

// Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then( (answers) => {
            console.log(answers);

        })
        .catch( (err) => {
            if (err.isTtyError) {
                console.log("The prompt couldn't be rendered in this environment");
                console.log(err);
            } else {
                console.log("Something seriously went wrong:");
                console.log(err);
            }
        })
        .then( () => {
            return;
        });
}

// Function call to initialize app
init();
