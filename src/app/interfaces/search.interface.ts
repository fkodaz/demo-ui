import {ICharacter} from "./character.interface";

export interface ISearchResult {
  results: ICharacter[];
  totalSize: number;
}

