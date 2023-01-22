// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = generateMarkdown.getQuestions();

// must include to allow looping in questionaire
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

// Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile('./readme-files/' + fileName, generateMarkdown.generateMarkdown(data), (err) => {
        if(err){
            console.log(err);
        }
    });
}

// Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then( (answers) => {
            writeToFile("README-" + answers.projectTitle.split(' ').join("-") + ".md", answers);
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
