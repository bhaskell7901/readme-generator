# README Generator

Welcome to README Generator!  An App that let you generator your own prefilled README file for a given project.


## Table of Contents

1. [Technology Used](#technology-used)
1. [Overview and Strategies](#overview-and-strategies)
1. [Bonus Features](#bonus-features)
1. [Learning Points](#learning-points)
1. [Author Info](#author-info)
1. [License](#license)


## Technology Used 

| Technology | Resource URL | 
| ------------- | ------------- | 
| Node.js | [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/) |
| JS | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Git | [https://git-scm.com/](https://git-scm.com/) |
| inquirer | [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer) |
| inquirer-recursive | [https://www.npmjs.com/package/inquirer-recursive](https://www.npmjs.com/package/inquirer-recursive) |


## Overview and Strategies

A general overview of the application flow is:
1. Start the program
1. Run through the command line questionaire
1. Get the Generated README file
1. Use it in your GitHub repo

The project was implemented using JavaScript and Node.js to allow a user to output a README file using command prompt input with basic input.  Input is validated as much as possible.  Where there is generic input, I test for the lenght of the input to confirm useful information is being added.  Where validating more easily formatted input, such as email addresses, and GitHub logins, Regular Expressions and APIs are used to validate the inputs.

For email addresses, regular expressions to test for email formatting make sure the inpute from the user adheres to standard formatting.  For GitHub users, the GitHub User Public API was used.  This ensures the data being entered is valid.


## Bonus Features

* Added GitHub validation for login input information
* Added validation for email input using regex
* Added validation for input that is less than X characters, promoting complete input
* Added direct links to License text where it was avialble with License shields
* Added looping questions to add multiple contributors


## Usage

This app is inteded to be used when you create a new reop/project and want tot create a quick README that follows a recommended README structure.  Just run the ```index.js```` file and see what happens.

## Learning Points 

I learned a big more about [Axios](https://axios-http.com/) this time around.  It's a really nice API that can be used on the server side and the client side, which makes it a really nice API to implement.  Having only used it for the client side of things prviously, it was nice to add it to my project and have it perform the same as before.

I also leearned a lot about callbacks that implemented from other APIs.  I learned how to implement an ```async``` callback within ```inquirer``` to initiate a webcall and have the callback let ```inquirer``` continue forward without interruption.


## Author Info

### Brandon Haskell

* [LinkedIn](https://www.linkedin.com/in/BrandonDHaskell)
* [Github](https://github.com/bhaskell7901)


## License

MIT License