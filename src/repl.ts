import { createInterface } from "node:readline";

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
        if (!inputArr) {
            rl.prompt();
            return;
        }
        console.log(`Your command was: ${inputArr[0]}`);
        rl.prompt();
    });
}