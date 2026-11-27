import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;
    
    
    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? PokeAPI.baseURL + "/location-area/";
        const cached = this.cache.get<ShallowLocations>(url);
        if (cached !== undefined) {
            return cached;
        }
        const response = await fetch(url);
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

//   async fetchLocation(locationName: string): Promise<Location> {
//     // implement this
//   }
}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string,
    url: string,
  }[],
};

export type Location = {
  // add properties here
};