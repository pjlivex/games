import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type GameId = string;
export interface Game {
    id: GameId;
    title: string;
    thumbnail: string;
    tags: Array<string>;
    description: string;
    playCount: bigint;
    isFeatured: boolean;
    category: string;
    rating: number;
    isNew: boolean;
    embedUrl: string;
}
export interface backendInterface {
    getAllGames(): Promise<Array<Game>>;
    getCategories(): Promise<Array<string>>;
    getFeaturedGames(): Promise<Array<Game>>;
    getGameById(id: string): Promise<Game | null>;
    getGamesByCategory(category: string): Promise<Array<Game>>;
    getNewGames(): Promise<Array<Game>>;
    searchGames(searchTerm: string): Promise<Array<Game>>;
}
