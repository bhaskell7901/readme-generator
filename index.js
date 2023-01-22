// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = generateMarkdown.getQuestions();

const answerObj = {
    projectTitle: 'My Pet Project',
    projectDesc: "It's very descriptive.",
    installationDesc: 'It easy to install',
    usageDesc: "It's very user friendly.",
    license: "Boost Software License 1.0",
    testDesc: "It's not testable.",
    qEmail: "gmaila@gmail.com",
    qOwner: "bhaskell7901",
    contributors: [
        { contribName: 'Theodore Roosevelt', gitHubLogin: 'teddy' },
        { contribName: 'Franklin D. Roosevelt', gitHubLogin: 'franklin' },
        { contribName: 'Abraham Lincoln', gitHubLogin: 'lincoln' }
    ]
}

// must include to allow looping in questionaire
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

// Create a function to write README file
function writeToFile(fileName, data) {}

// Create a function to initialize app
function init() {
    // inquirer
    //     .prompt(questions)
    //     .then( (answers) => {
    //         console.log(answers);

    //     })
    //     .catch( (err) => {
    //         if (err.isTtyError) {
    //             console.log("The prompt couldn't be rendered in this environment");
    //             console.log(err);
    //         } else {
    //             console.log("Something seriously went wrong:");
    //             console.log(err);
    //         }
    //     })
    //     .then( () => {
    //         return;
    //     });
    console.log(generateMarkdown.generateMarkdown(answerObj));
    
}


// Function call to initialize app
init();
