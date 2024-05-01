import inquirer from "inquirer";
import chalk from "chalk";
// Print welcome message
console.log(chalk.blue("\n\t Welcome to CodeWithZefi - ATM Machine\n\t"));
// Initialize user balance and pin code
let myBalance = 10000; // Dollar
let myPin = 1088;
let attempts = 3;
while (attempts > 0) {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: chalk.yellow("\nPlease enter your pin code"),
            type: "number",
        },
    ]);
    if (pinAnswer.pin === myPin) {
        console.log(chalk.green("\nPin is Correct, Login Successfully!\n"));
        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                message: chalk.inverse.bold("\nPlease choose the operation you would like to perform:\n"),
                type: "list",
                choices: ["Fast Cash", "Cash Withdrawal", "Balance Inquiry", "Exit"],
            },
        ]);
        if (operationAns.operation === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    message: chalk.yellow("Select amount:"),
                    type: "list",
                    choices: [1000, 3000, 5000, 10000, 15000, 20000],
                },
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} withdrawal Successfully`));
                console.log(chalk.blueBright.bold(`Your remaining balance is: $${myBalance}`));
            }
        }
        else if (operationAns.operation === "Cash Withdrawal") {
            let cashWithdrawalAns = await inquirer.prompt([
                {
                    name: "cashWithdrawal",
                    message: chalk.yellow("Please enter your withdrawal amount:"),
                    type: "number",
                },
            ]);
            if (cashWithdrawalAns.cashWithdrawal > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= cashWithdrawalAns.cashWithdrawal;
                console.log(chalk.green(`${cashWithdrawalAns.cashWithdrawal} withdrawal Successfully`));
                console.log(chalk.blueBright.bold(`Your remaining balance is: $${myBalance}`));
            }
        }
        else if (operationAns.operation === "Balance Inquiry") {
            console.log(chalk.green(`Your account balance is: $${myBalance}`));
        }
        else if (operationAns.operation === "Exit") {
            console.log(chalk.yellow.bold("\nThank you for using the ATM simulator. Goodbye!\n"));
        }
    }
    else {
        attempts--;
        console.log(chalk.red(`Incorrect pin code, ${attempts} attempts remaining. Try again`));
        if (attempts === 0) {
            console.log(chalk.red("\nYou have exceeded the maximum number of attempts. Your card is blocked.\n"));
        }
    }
}
