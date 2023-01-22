module.exports = {
  generateMarkdown,
  getQuestions
}

const axios = require('axios');               // for GitHub login validation
const inputMinLength = 10;                    // min text length input for questions
const noLicenseText = "No License Included";   // specifies not to include a license


// Map of License name to license site (if found) for making
// badges clickable
const licensesMap = new Map();
    licensesMap.set("Academic Free License v3.0", "");
    licensesMap.set("Apache license 2.0", "https://opensource.org/licenses/Apache-2.0");
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
    licensesMap.set(noLicenseText, "");

// get the names as a list for inquirer questionaire
const licenses = getLicenseNames(); 


// Create an array of question's for user input
const questions = [
  {   // Title input
      type: "input",
      message: "What is your project name?",
      name: "projectTitle",
      validate: (input) => {
        if(input.length < inputMinLength) return "Please enter a meaningful description.";
        else return true;
      }
  }
  ,{   // Description input
      type: "input",
      message: "Describe your project:",
      name: "projectDesc",
      validate: (input) => {
        if(input.length < inputMinLength) return "Please enter a meaningful description.";
        else return true;
      }
  }
  ,{   // Insatllation input
      type: "input",
      message: "How do you install this software?",
      name: "installationDesc",
      validate: (input) => {
        if(input.length < inputMinLength) return "Please enter a meaningful description.";
        else return true;
      }
  }
  ,{   // Usage input
      type: "input",
      message: "How do you use this software?",
      name: "usageDesc",
      validate: (input) => {
        if(input.length < inputMinLength) return "Please enter a meaningful description.";
        else return true;
      }
  }
  ,{   // License options
      type: "rawlist",
      message: "Select a license or enter a different one:",
      name: "license",
      default: 1,
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
              return " <-- Please enter a valid email";
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

function getContributing(data){
  const gHubUrlPreface = "https://github.com/";
  var str = "";

  str = `* ${getGitHubMkdwnBioPageUrl(data.qOwner)}`;

  if( data.contributors.length > 0 ){
    for( var i = 0; i < data.contributors.length; ++i ){
      str += `\n* ${getGitHubMkdwnBioPageUrl(data.contributors[i].gitHubLogin)}`;
    }
  }
  return str;
}

function getGitHubMkdwnBioPageUrl(gitHubLogin){
  return `[${gitHubLogin}](${encodeURI("https://github.com/" + gitHubLogin)})`;
}

// Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if(license === noLicenseText) return "";

  if(licensesMap.get(license) === "" ){
    console.log(`![${license}](${renderLicenseLink(license)})`);
    return `![${license}](${renderLicenseLink(license)})`;
  } else {
    return `[![${license}](${renderLicenseLink(license)})](${licensesMap.get(license)})`;
  }
}

// Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if(license === noLicenseText) return "";
  else return encodeURI(`https://img.shields.io/static/v1?label=License&message=${license}&color=success`);
}

// Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(license === noLicenseText) return "";
  else return `\n## License\n\n${renderLicenseBadge(license)}\n\n${license}\n\n`;
}

function renderMailToMarkdownLink(emailAddr, projectName){
  if(emailAddr){
    return `[${emailAddr}](${encodeURI('mailto:' + emailAddr + '?subject="' + projectName + ' Questions"')})`;
  }
}


// Create a function to generate markdown for README
function generateMarkdown(data) {
  const badge = renderLicenseBadge(data.license);

  return `# ${data.projectTitle}

## Description
${(badge === "") ? "" : badge + '\n\n'}${data.projectDesc}


## Table of Contents

1. [Description](#description)
1. [Installation](#installation)
1. [Usage](#usage)
${(badge === "")?"":'1. [License](#license)\n'}1. [Contributing](#contributing)
1. [Tests](#tests)
1. [Questions](#questions)


## Installation

${data.installationDesc}


## Usage

${data.usageDesc}

${(badge === "") ? "" : renderLicenseSection(data.license)}
## Contributing
${getContributing(data)}


## Tests

${data.testDesc}


## Questions
Get to know be better on GitHub --> ${getGitHubMkdwnBioPageUrl(data.qOwner)}

If you have more questions, please email: ${renderMailToMarkdownLink(data.qEmail, data.projectTitle)}
`;
}
