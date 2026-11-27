import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const page = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);
    for (const location of page.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = page.next;
    state.prevLocationsURL = page.previous;
}

export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const page = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    for (const location of page.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = page.next;
    state.prevLocationsURL = page.previous;
}