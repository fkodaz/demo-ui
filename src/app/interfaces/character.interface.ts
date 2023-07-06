export interface ICharacter {
  _id?: string;
  Name: string;
  Books: number[];
  TvSeries: string[];
  IsFemale: boolean;
  Died: string;
  PlayedBy?: string[];
}
