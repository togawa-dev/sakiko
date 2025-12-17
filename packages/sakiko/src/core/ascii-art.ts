import chalk from "chalk";
import { VERSION } from "../global";

export const asciiArt = chalk.hex("#7799CC")(
    `
           _    _ _          
          | |  (_) |         
 ___  __ _| | ___| | _____   
/ __|/ _\` | |/ / | |/ / _ \\  
\\__ \\ (_| |   <| |   < (_) | 
|___/\\__,_|_|\\_\\_|_|\\_\\___(_)

${chalk.hex("#7799CC")("█") + chalk.hex("#335566")("█") + chalk.hex("#BB9955")("█") + chalk.hex("#AA4477")("█") + chalk.hex("#779977")("█") + chalk.reset(chalk.bold(" Sakiko"), chalk.gray("v" + VERSION))}
${chalk.reset(`A modular chatbot framework project for ${chalk.bold.underline("TypeScript")}`)}

${chalk.gray(`- For more information or documents about the project, see https://togawa-dev.github.io/docs/`)}
${chalk.gray(`- @togawa-dev 2025 | MIT License`)}
    `
);
