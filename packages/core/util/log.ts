import chalk from "chalk";

export const log = {
  debug: (...args: any) =>
    console.log(chalk.bgBlueBright(`modele >> debug`), ...args),
  warn: (...args: any) =>
    console.log(chalk.bgYellowBright(`modele >> warn`), ...args),
  error: (...args: any) =>
    console.log(chalk.bgRedBright(`modele >> error`), ...args),
};
