import inquirer from "inquirer";
import fs from "fs";

// Function to generate the README content
const generateReadme = (response, licenseBadge) => `
# ${response.title}

${licenseBadge}

## Description

${response.description}

## Table of Contents

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

This application is covered under the ${response.license} license.

## Contributing

${response.contribution}

## Tests

${response.testSteps}

## Questions

- Walkthrough Video: 
- GitHub: [${response.github}](https://github.com/${response.github})
- You can reach me with additional questions at ${response.email}.
`;

// Prompt the user and write the README file
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the title of your Project?",
      name: "title",
    },
    {
      type: "input",
      message: "Provide a description of your project.",
      name: "description",
    },
    {
      type: "input",
      message: "What are your project installation instructions?",
      name: "installation",
    },
    {
      type: "input",
      message: "Please explain your project usage information.",
      name: "usage",
    },
    {
      type: "input",
      message: "What are the project contribution guidelines?",
      name: "contribution",
    },
    {
      type: "input",
      message: "Please explain the project test instructions.",
      name: "testSteps",
    },
    {
      type: "list",
      message: "Which license are you using?",
      name: "license",
      choices: ["MIT", "ISC", "Mozilla", "IBM"],
    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "github",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
  ])
  .then((response) => {
    // Determine the license badge
    let licenseBadge;
    if (response.license === "MIT") {
      licenseBadge =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (response.license === "ISC") {
      licenseBadge =
        "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
    } else if (response.license === "Mozilla") {
      licenseBadge =
        "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    } else if (response.license === "IBM") {
      licenseBadge =
        "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)";
    }

    // Generate the README content
    const readmeContent = generateReadme(response, licenseBadge);

    // Write the README file
    fs.writeFile("SAMPLE.md", readmeContent, (err) =>
      err ? console.error(err) : console.log("README created!")
    );
  });
