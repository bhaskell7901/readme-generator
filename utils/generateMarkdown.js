module.exports = {
  generateMarkdown,
  getQuestions
}

const axios = require('axios');  // for GitHub login validation

// Map of License name to license site (if found) for making
// badges clickable
const licensesMap = new Map();
    licensesMap.set("Academic Free License v3.0", "");
    licensesMap.set("Apache license 2.0", "https://opensource.org/licenses/Apache-2.0)");
    licensesMap.set("Artistic license 2.0", "https://opensource.org/licenses/Artistic-2.0");
    licensesMap.set("Boost Software License 1.0", "https://www.boost.org/LICENSE_1_0.txt");
    licensesMap.set("BSD 2-clause \"Simplified\" license", "https://opensource.org/licenses/BSD-2-Clause");
    licensesMap.set("BSD 3-clause New license", "");
    licensesMap.set("BSD 3-clause Revised license", "");
    licensesMap.set("BSD 3-clause Clear license", "");
    licensesMap.set("Creative Commons license family", "");
    licensesMap.set("Creative Commons Zero v1.0 Universal", "http://creativecommons.org/publicdomain/zero/1.0/");
    licensesMap.set("Creative Commons Attribution 4.0", "https://creativecommons.org/licenses/by/4.0/");
    licensesMap.set("Creative Commons Attribution Share Alike 4.0", "https://creativecommons.org/licenses/by-sa/4.0/");
    licensesMap.set("Do What The F*ck You Want To Public License", "http://www.wtfpl.net/about/");
    licensesMap.set("Educational Community License v2.0", "");
    licensesMap.set("Eclipse Public License 1.0", "https://opensource.org/licenses/EPL-1.0");
    licensesMap.set("Eclipse Public License 2.0", "");
    licensesMap.set("European Union Public License 1.1", "");
    licensesMap.set("GNU Affero General Public License v3.0", "https://www.gnu.org/licenses/agpl-3.0");
    licensesMap.set("GNU General Public License family", "");
    licensesMap.set("GNU General Public License v2.0", "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html");
    licensesMap.set("GNU General Public License v3.0", "https://www.gnu.org/licenses/gpl-3.0");
    licensesMap.set("GNU Lesser General Public License family", "");
    licensesMap.set("GNU Lesser General Public License v2.1", "");
    licensesMap.set("GNU Lesser General Public License v3.0", "https://www.gnu.org/licenses/lgpl-3.0");
    licensesMap.set("ISC", "https://opensource.org/licenses/ISC");
    licensesMap.set("LaTeX Project Public License v1.3c", "");
    licensesMap.set("Microsoft Public License", "");
    licensesMap.set("MIT", "https://opensource.org/licenses/MIT");
    licensesMap.set("Mozilla Public License 2.0", "https://opensource.org/licenses/MPL-2.0");
    licensesMap.set("Open Software License 3.0", "");
    licensesMap.set("PostgreSQL License", "");
    licensesMap.set("SIL Open Font License 1.1", "https://opensource.org/licenses/OFL-1.1");
    licensesMap.set("University of Illinois/NCSA Open Source License", "");
    licensesMap.set("The Unlicense", "");
    licensesMap.set("zLib License", "https://opensource.org/licenses/Zlib");

  // get the names as a list for inquirer questionaire
const licenses = getLicenseNames(); 

// Create an array of question's for user input
const questions = [
  {   // Title input
      type: "input",
      message: "What is your project name?",
      name: "projectTitle"
  }
  ,{   // Description input
      type: "input",
      message: "Describe your project:",
      name: "projectDesc"
  }
  ,{   // Insatllation input
      type: "input",
      message: "How do you install this software?",
      name: "installationDesc"
  }
  ,{   // Usage input
      type: "input",
      message: "How do you use this software?",
      name: "usageDesc"
  }
  ,{   // License options
      type: "list",
      message: "What license will you use?",
      name: "license",
      pageSize: 12,
      choices: [...licenses]

  }
  ,{   // Tests input
      type: "input",
      message: "What test instructions are avialble?",
      name: "testDesc"
  }
  ,{   // Question input
      type: "input",
      message: "Enter an email address to handle questions",
      name: "qEmail",
      default: () => {},
      validate: (qEmail) => {
          var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(qEmail);
          if (validEmail) return true;
          else {
              return " <-- Pleae enter a valid email";
          }
      }
  }
  ,{   // Question input
      type: "input",
      message: "Who is owning questions for this software (GitHub login)?",
      name: "qOwner",
      default: () => {},
      validate: function (qOwner) {
          var done = this.async();  // desingating a callback function for inquirer

          axios.get("https://api.github.com/users/" + qOwner)
              .then( (response) =>  {
                  if( response ) {
                      done(true);
                      return;
                  }
              })
              .catch( function (err) {
                  done(" <-- Not a registered GitHub login. Please add a registered login.");
                  return;
              });
      }
  }
  ,{   // Contributors
      type: "recursive",
      message: "Add contributors?",
      name: "contributors",
      default: () => {},
      prompts: [
          {
              type: "input",
              message: "Name?",
              name: "contribName"
          },
          {
              type: "input",
              message: "GitHub login?",
              name: "gitHubLogin",
              default: () => {},
              validate: function (gitHubLogin) {
                  var done = this.async();  // desingating a callback function for inquirer

                  axios.get("https://api.github.com/users/" + gitHubLogin)
                  .then( (response) =>  {
                      if( response ) {
                          done(true);
                          return;
                      }
                  })
                  .catch( function (err) {
                      console.log("Validate err");
                      done(" <-- Not a registered GitHub login. Please add a registered login.");
                      return;
                  });
              
              }
                  // Attempting to use filter to get the input and modify it before
                  // returning it to inquirer, this would reduce the GitHub API
                  // calls if 'login' and 'name' could be concatenated in the answer
              // filter: function(input, answer){
              //     var done = this.async();  // desingating a callback function for inquirer

              //     axios.get("https://api.github.com/users/" + input)
              //     .then( (response) =>  {
              //         if( response ) {
              //             console.log(answer);
              //             answer['gitHubLogin'] = input + "-->" + response.data.name;
              //             done( answer );
              //             return;
              //         }
              //     })
              //     .catch( function (err) {
              //         console.log("Filter err");
              //         done(" <-- Not a registered GitHub login. Please add a registered login.");
              //         return;
              //     });
              //     // console.log(answer);
              //     // return input;
              // }
          }
      ]
  }
];

function getQuestions(){
  return questions;
}

function getLicenseNames(){
  return licensesMap.keys();
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {

}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.projectTitle}

${data.projectDesc}


## Table of Contents

1. [Installation](#installation)
1. [Usage](#Usage)
1. [License](#License)
1. [Contributions](#Contributions)
1. [Tests](#Tests)
1. [Questions](#Questions)


## Installation

${data.installationDesc}


## Usage

${data.usageDesc}


## License

${data.license}


## Contributions



## Tests

${data.testDesc}


## Questions

${data.qEmail}
`;
}
