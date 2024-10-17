import inquirer from 'inquirer';
import fs from 'fs';

// Function to generate the README content
const generateReadme = (response, licenseBadge) => `
# ${response.title}

${licenseBadge}

## Description

${response.description}

## Table of Contents (Optional)

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${response.installation}

## Usage

${response.usage}

## License

${response.license}

## Contributing

${response.contribution}

## Tests

${response.testSteps}

## Questions

GitHub: [${response.github}](https://github.com/${response.github})
Email: ${response.email}
`;

// Prompt the user and write the README file
inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the title of your Project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Provide a description of your project.',
            name: 'description'
        },
        {
            type: 'input',
            message: 'What are your project installation instructions?',
            name: 'installation'
        },
        {
            type: 'input',
            message: 'Please explain your project usage information.',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'What are the project contribution guidelines?',
            name: 'contribution'
        },
        {
            type: 'input',
            message: 'Please explain the project test instructions.',
            name: 'testSteps'
        },
        {
            type: 'list',
            message: 'Which license are you using?',
            name: 'license',
            choices: ["MIT", "other1", "other2", "other3"]
        },
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'github'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email'
        }
    ])
    .then((response) => {
        // Determine the license badge
        let licenseBadge;
        if (response.license === "MIT") {
            licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        } else if (response.license === "other1") {
            licenseBadge = "otherURL1";
        } else if (response.license === "other2") {
            licenseBadge = "otherURL2";
        } else if (response.license === "other3") {
            licenseBadge = "otherURL3";
        }

        // Generate the README content
        const readmeContent = generateReadme(response, licenseBadge);

        // Write the README file
        fs.writeFile('README.md', readmeContent, (err) => 
            err ? console.error(err) : console.log('README created!')
        );
    });