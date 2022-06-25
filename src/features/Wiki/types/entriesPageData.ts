interface IBaseEntry {
  id: number;
  name: string;
  url: string;
  created: Date;
}

interface ICharacterEntry extends IBaseEntry {
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: 'Earth';
    url: 'https://rickandmortyapi.com/api/location/20';
  };
  image?: string;
  episode: string[];
}

interface ILocationEntry extends IBaseEntry {
  type: string;
  dimension: string;
  residents: string[];
}

interface IEpisodeEntry extends IBaseEntry {
  air_date: string;
  episode: string;
  characters: string[];
}

export type TEntry = ICharacterEntry | ILocationEntry | IEpisodeEntry;

export interface IEntriesPageData {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: TEntry[];
}
