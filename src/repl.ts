import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL(state: State): void {
  const { readline, commands } = state;

  readline.prompt();
  readline.on("line", async (input) => {
    const inputArr = cleanInput(input);
    const commandName = inputArr[0];

    if (!commandName) {
      readline.prompt();
      return;
    }

    const cmd = commands[commandName];
    if (!cmd) {
      console.log("Unknown command");
      readline.prompt();
      return;
    }

    try {
      await cmd.callback(state);
    } catch (err) {
      console.log(err);
    }

    readline.prompt();
  });
}