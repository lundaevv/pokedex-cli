import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { CLICommand } from "./command.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
  };
}

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on("line", (input) => {
        const inputArr = cleanInput(input);
        const commandName = inputArr[0];
        if (!commandName) {
            rl.prompt();
            return;
        }
        const commands = getCommands();
        const cmd = commands[commandName];
        if (!cmd) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }
        try {
            cmd.callback(commands);
        } catch (err) {
            console.log(err);
        }
        rl.prompt();
    });
}